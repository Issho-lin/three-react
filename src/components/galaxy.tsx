/*
 * @Author: linqibin
 * @Date: 2022-08-29 10:00:12
 * @LastEditors: linqibin
 * @LastEditTime: 2022-08-29 10:55:42
 * @Description:
 *
 * Copyright (c) 2022 by 研发中心/金地楼宇, All Rights Reserved.
 */
import { useEffect } from "react";
import {
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";

const Galaxy: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scene = new Scene();
    // scene.add(sunMesh);
    const light = new PointLight(0xffffff, 3)
    scene.add(light)
    const camera = new PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      100
    );
    camera.position.y = 50;
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    const objects: any[] = []
    const sphereGeometry = new SphereGeometry(1, 12, 12)
    // const sunGeometry = new SphereGeometry(5, 6, 6);
    const sunMaterial = new MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    // meshs.push(sunMesh)
    // const earthGeometry = new SphereGeometry(1, 6, 6);
    const earthMaterial = new MeshPhongMaterial({emissive: 0x112244, color: 0x2233ff})
    const earthMesh = new Mesh(sphereGeometry, earthMaterial)
    // earthMesh.position.x = 10
    // meshs.push(earthMesh)
    // sunMesh.add(earthMesh)
    const moonMaterial = new MeshPhongMaterial({emissive: 0x222222, color: 0x888888})
    const moonMesh = new Mesh(sphereGeometry, moonMaterial)
    moonMesh.scale.set(0.5, 0.5, 0.5)

    const sunOrbit = new Object3D()
    sunOrbit.add(sunMesh)
    scene.add(sunOrbit)
    objects.push(sunOrbit)
    const earthOrbit = new Object3D()
    earthOrbit.position.x = 10
    sunOrbit.add(earthOrbit)
    earthOrbit.add(earthMesh)
    objects.push(earthOrbit)
    moonMesh.position.x = 2
    earthOrbit.add(moonMesh)
    objects.push(moonMesh)

    const renderer = new WebGLRenderer({ canvas });
    renderer.render(scene, camera);
    function render(time: number) {
        time *= 0.001;
        objects.forEach(obj => {
            obj.rotation.y = time
        })
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }, []);
  return <canvas id="canvas"></canvas>;
};
export default Galaxy;
