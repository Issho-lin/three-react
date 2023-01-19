/*
 * @Author: linqibin
 * @Date: 2023-01-03 17:25:55
 * @LastEditors: linqibin
 * @LastEditTime: 2023-01-19 15:16:14
 * @Description:
 *
 * Copyright (c) 2023 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { useEffect, useRef } from "react";
import {
  AmbientLight,
  AnimationMixer,
  Camera,
  Clock,
  Color,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import Stats from "three/examples/jsm/libs/stats.module";

class Engine {
  private camera: PerspectiveCamera | null = null;
  private renderer: WebGLRenderer | null = null;
  private scene: Scene | null = null;
  private controls: OrbitControls | null = null;
  private mixer: AnimationMixer | null = null;
  private clock = new Clock();

  initCanvas(selector: string) {
    const canvas = document.querySelector(selector) as HTMLCanvasElement;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    return canvas;
  }
  initCamera(aspect: number) {
    const camera = new PerspectiveCamera(
      45,
      // canvas.width / canvas.height,
      aspect,
      0.01,
      1000
    );
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);
    this.camera = camera;
    return camera;
  }
  initControls(camera: Camera, canvas: HTMLElement) {
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enableDamping = true;
    // controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = 0.25;
    this.controls = controls;
    return controls;
  }
  initStats() {
    // @ts-ignore
    const stats = new Stats();
    document.body.appendChild(stats.dom);
  }
  initRenderer(canvas: HTMLCanvasElement | OffscreenCanvas) {
    const renderer = new WebGLRenderer({ canvas, antialias: true });
    // renderer.setClearColor("#ffe793", 0.5);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = sRGBEncoding;
    this.renderer = renderer;
    return renderer;
  }
  initScene(renderer: WebGLRenderer) {
    const scene = new Scene();
    scene.background = new Color(0xbfe3dd);
    const pmremGenerator = new PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    this.scene = scene;
    return scene;
  }
  initLight() {
    const light = new AmbientLight(0xffffff, 1);
    this.scene?.add(light);
    return light;
  }
  loadModel(path: string) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/gltf/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      // "https://gw.alipayobjects.com/os/bmw-prod/3ca0a546-92d8-4ba0-a89c-017c218d5bea.gltf",
      path,
      (gltf) => {
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0, -1, 0);
        this.scene?.add(gltf.scene);

        const animations = gltf.animations;
        console.log(animations);

        if (animations && animations.length) {
          this.mixer = new AnimationMixer(gltf.scene);
          const animation = animations[1];
          const action = this.mixer.clipAction(animation);
          action.timeScale = 1;
          action.play();
        }
      }
    );
  }
  render() {
    if (this.scene && this.camera) {
      this.renderer?.render(this.scene, this.camera);
    }
    this.controls?.update();
    const delta = this.clock.getDelta();
    this.mixer?.update(delta);
    requestAnimationFrame(() => this.render());
  }
  onResize = () => {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  };
}

const Model: React.FC<{ gltf: string }> = ({ gltf }) => {
  useEffect(() => {
    const engine = new Engine();

    const canvas = engine.initCanvas("#canvas");
    const camera = engine.initCamera(canvas.width / canvas.height);
    engine.initControls(camera, canvas);
    // engine.initStats()
    const renderer = engine.initRenderer(canvas);
    engine.initScene(renderer);

    engine.loadModel(`/src/assets/gltf/${gltf}`)
    // engine.loadModel(
    //   "https://gw.alipayobjects.com/os/bmw-prod/3ca0a546-92d8-4ba0-a89c-017c218d5bea.gltf"
    // );

    engine.render();

    window.addEventListener("resize", engine.onResize);

    return () => {
      window.removeEventListener("resize", engine.onResize);
    };
  }, []);
  return <canvas id="canvas"></canvas>;
};
export default Model;
