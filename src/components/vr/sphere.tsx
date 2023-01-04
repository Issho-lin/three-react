/*
 * @Author: linqibin
 * @Date: 2022-08-29 17:43:41
 * @LastEditors: linqibin
 * @LastEditTime: 2022-09-01 10:37:24
 * @Description:
 *
 * Copyright (c) 2022 by 研发中心/金地楼宇, All Rights Reserved.
 */
import { useEffect } from "react";
import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const VR_Sphere: React.FC<{
  texture: string;
}> = ({ texture }) => {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const geometry = new SphereGeometry(1);
    geometry.scale(-1, 1, 1);
    const loader = new TextureLoader();
    const material = new MeshBasicMaterial({ map: loader.load(texture) });
    const mesh = new Mesh(geometry, material);
    const scene = new Scene();
    scene.add(mesh);

    const camera = new PerspectiveCamera(
      90,
      canvas.width / canvas.height,
      0.01,
      100
    );
    camera.position.z = 0.01;

    const renderer = new WebGLRenderer({ canvas });
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, canvas);
    // controls.enableZoom = false;
    // controls.enablePan = false;
    // controls.enableDamping = true;
    // controls.rotateSpeed = -0.25;

    function render() {
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(render);
    }

    render();
  }, []);
  return <canvas id="canvas"></canvas>;
};
export default VR_Sphere;
