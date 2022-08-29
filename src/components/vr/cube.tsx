/*
 * @Author: linqibin
 * @Date: 2022-08-29 17:18:02
 * @LastEditors: linqibin
 * @LastEditTime: 2022-08-29 17:27:12
 * @Description: 
 * 
 * Copyright (c) 2022 by 研发中心/金地楼宇, All Rights Reserved. 
 */
import { useEffect } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const VR_Cube: React.FC<{
    textures: string[]
}> = ({textures}) => {
    useEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const geometry = new BoxGeometry(1, 1, 1)
        geometry.scale(-1, 1, 1)
        const loader = new TextureLoader()
        const materials = textures.map(texture => new MeshBasicMaterial({map: loader.load(texture)}))
        const mesh = new Mesh(geometry, materials)
        const scene = new Scene()
        scene.add(mesh)
        const camera = new PerspectiveCamera(90, canvas.width/canvas.height, 0.01, 100)
        camera.position.z = 0.01
        const renderer = new WebGLRenderer({canvas})

        const controls = new OrbitControls(camera, canvas)

        render()

        function render() {
            renderer.render(scene, camera)
            controls.update()
            requestAnimationFrame(render)
        }
    }, [])
    return (
        <canvas id="canvas"></canvas>
    )
}
export default VR_Cube