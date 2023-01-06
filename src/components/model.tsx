/*
 * @Author: linqibin
 * @Date: 2023-01-03 17:25:55
 * @LastEditors: linqibin
 * @LastEditTime: 2023-01-06 15:53:09
 * @Description:
 *
 * Copyright (c) 2023 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { useEffect, useRef } from "react";
import {
  AmbientLight,
  AnimationMixer,
  Clock,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const Model: React.FC<{ gltf: string }> = ({ gltf }) => {
  const mixer = useRef<AnimationMixer>()
  const clock = useRef(new Clock())

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const camera = new PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      0.01,
      1000
    );
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, canvas);
    // controls.enableZoom = false;
    // controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = 0.25;

    const scene = new Scene();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/gltf/");

    const loader = new GLTFLoader();
    // loader.setDRACOLoader(dracoLoader);
    loader.load(
      "https://gw.alipayobjects.com/os/bmw-prod/3ca0a546-92d8-4ba0-a89c-017c218d5bea.gltf",
      (gltf) => {
        console.log(gltf.scene);
        const animations = gltf.animations;
        console.log(animations);
        if (animations && animations.length) {
          mixer.current = new AnimationMixer(gltf.scene);
          const animation = animations[1];
          const action = mixer.current.clipAction(animation);
          action.timeScale = 1;
          action.play();
        }
        gltf.scene.scale.set(0.1, 0.1, 0.1)
        gltf.scene.rotation.y = Math.PI;
        scene.add(gltf.scene);
      }
    );
    // loader.load(`/src/assets/gltf/${gltf}`, ({ scene: gltfScene }) => {
    //   console.log(...gltfScene.children);

    //   gltfScene.position.set(0, -1, 0);
    //   // gltfScene.scale.set(0.5, 0.5, 0.5)
    //   scene.add(gltfScene);
    // });

    const light = new AmbientLight(0xffffff, 1.5);
    scene.add(light);

    const renderer = new WebGLRenderer({ canvas });

    function render() {
      renderer.render(scene, camera);
      controls.update();
      if (mixer.current) {
        const delta = clock.current.getDelta()
        mixer.current.update(delta)
      }
      requestAnimationFrame(render);
    }
    render();
  }, []);
  return <canvas id="canvas"></canvas>;
};
export default Model;
