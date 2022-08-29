/*
 * @Author: linqibin
 * @Date: 2022-08-29 09:33:39
 * @LastEditors: linqibin
 * @LastEditTime: 2022-08-29 15:02:30
 * @Description:
 *
 * Copyright (c) 2022 by 研发中心/金地楼宇, All Rights Reserved.
 */
import { useEffect } from "react";
import * as THREE from "three";
import logo from "../assets/logo.jpg";

const Texture: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const geometry = new THREE.BoxGeometry(8, 8, 8);
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshPhongMaterial({
      flatShading: true,
      map: loader.load(logo),
    });
    const mesh = new THREE.Mesh(geometry, material);

    const scene = new THREE.Scene();
    scene.add(mesh);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 2, 10);
    scene.add(light);
    const camera = new THREE.PerspectiveCamera(
      90,
      canvas.width / canvas.height,
      0.1,
      100
    );
    camera.position.z = 20;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.render(scene, camera);
    function render(time: number) {
      time *= 0.001 / 2;
      mesh.rotation.x = time;
      mesh.rotation.y = time;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, []);
  return <canvas id="canvas"></canvas>;
};
export default Texture;
