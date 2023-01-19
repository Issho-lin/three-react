/*
 * @Author: linqibin
 * @Date: 2023-01-19 16:30:07
 * @LastEditors: linqibin
 * @LastEditTime: 2023-01-19 17:20:58
 * @Description:
 *
 * Copyright (c) 2023 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { useEffect } from "react";
import {
  Camera,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  RGBAFormat,
  Scene,
  SphereBufferGeometry,
  VideoTexture,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import videoSource from "../../assets/video/cloud.mp4";

class Engine {
  private video: HTMLVideoElement | null = null;
  private geometry: SphereBufferGeometry | null = null;
  private scene: Scene | null = null;
  private controls: OrbitControls | null = null;
  private renderer: WebGLRenderer | null = null;
  private camera: PerspectiveCamera | null = null;

  initCanvas(selector: string) {
    const canvas = document.querySelector(selector) as HTMLCanvasElement;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    return canvas;
  }

  initGeometry() {
    this.geometry = new SphereBufferGeometry(300, 90, 90);
    this.geometry.scale(-1, 1, 1);
    return this.geometry;
  }

  initCamera(aspect: number) {
    this.camera = new PerspectiveCamera(75, aspect, 1, 1000);
    this.camera.position.set(1, 0, 0);
    return this.camera;
  }
  initVideo(src: string) {
    this.video = document.createElement("video");
    this.video.preload = "auto";
    this.video.crossOrigin = "anonymous";
    this.video.src = src;
    this.video.muted = true;
    this.video.autoplay = true;
    this.video.loop = true
    return this.video;
  }
  initScene() {
    this.scene = new Scene();
    return this.scene;
  }
  initMaterial() {
    if (!this.video) {
      return;
    }
    const texture = new VideoTexture(this.video);
    texture.minFilter = LinearFilter;
    texture.format = RGBAFormat;
    const material = new MeshBasicMaterial({ map: texture });
    if (!this.geometry) {
      return;
    }
    const mesh = new Mesh(this.geometry, material);
    mesh.position.set(0, 0, 0);
    this.scene?.add(mesh);
  }
  initControls(camera: Camera, canvas: HTMLElement) {
    this.controls = new OrbitControls(camera, canvas);
    this.controls.rotateSpeed = 0.05;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    return this.controls;
  }
  initRenderer(canvas: HTMLCanvasElement | OffscreenCanvas) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true });
    // renderer.setClearColor("#ffe793", 0.5);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.outputEncoding = sRGBEncoding;
    return this.renderer;
  }
  render() {
    if (this.scene && this.camera) {
      this.renderer?.render(this.scene, this.camera);
    }
    this.controls?.update();
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

const VR_Video: React.FC = () => {
  useEffect(() => {
    const engine = new Engine();
    const canvas = engine.initCanvas("#canvas");
    const camera = engine.initCamera(canvas.width / canvas.height);
    const video = engine.initVideo(videoSource);
    video.play()
    engine.initGeometry();
    engine.initScene();
    engine.initMaterial();
    engine.initControls(camera, canvas);
    engine.initRenderer(canvas);
    engine.render();

    window.addEventListener("resize", engine.onResize);

    return () => {
      window.removeEventListener("resize", engine.onResize);
    };
  }, []);
  return <canvas id="canvas"></canvas>;
};
export default VR_Video;
