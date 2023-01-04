/*
 * @Author: linqibin
 * @Date: 2023-01-03 17:25:55
 * @LastEditors: linqibin
 * @LastEditTime: 2023-01-04 11:18:51
 * @Description:
 *
 * Copyright (c) 2023 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { useEffect } from "react";
import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Model: React.FC<{ gltf: string }> = ({ gltf }) => {
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

    const scene = new Scene();

    const loader = new GLTFLoader();
    // loader.load('https://ycyy-cdn.oss-cn-beijing.aliyuncs.com/machineRoom.gltf', (gltf) => {
    //     console.log(gltf.scene)
    //     scene.add(gltf.scene)
    // })
    loader.load(`/src/assets/gltf/${gltf}`, ({ scene: gltfScene }) => {
      console.log(...gltfScene.children);

      gltfScene.position.set(0, -1, 0);
      // gltfScene.scale.set(0.5, 0.5, 0.5)
      scene.add(gltfScene);
    });

    const light = new AmbientLight(0xffffff, 1);
    scene.add(light);

    const renderer = new WebGLRenderer({ canvas });

    function render() {
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(render);
    }
    render();
  }, []);
  return <canvas id="canvas"></canvas>;
};
export default Model;
