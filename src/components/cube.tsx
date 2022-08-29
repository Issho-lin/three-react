/*
 * @Author: linqibin
 * @Date: 2022-08-26 16:42:29
 * @LastEditors: linqibin
 * @LastEditTime: 2022-08-29 10:15:08
 * @Description:
 *
 * Copyright (c) 2022 by 研发中心/金地楼宇, All Rights Reserved.
 */
import { useEffect } from "react";
import * as THREE from "three";

function Cube() {
  useEffect(() => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    // const geometry = new THREE.BoxGeometry(8, 8, 8, 4, 4, 4)
    // const geometry = new THREE.ConeGeometry(6, 8, 16)
    const geometry = new THREE.DodecahedronGeometry(7, 2);
    const material = new THREE.MeshPhongMaterial({ color: "yellow" });
    material.flatShading = true;
    const mesh = new THREE.Mesh(geometry, material);
    const scene = new THREE.Scene();
    scene.add(mesh);
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      100
    );
    camera.position.z = 20;
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-10, 10, 20);
    scene.add(light);
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.render(scene, camera);

    function render(time: number) {
      time *= 0.001;

      mesh.rotation.x = 10;
      mesh.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, []);
  return <canvas id="canvas"></canvas>;
}

export default Cube;
