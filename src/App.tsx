/*
 * @Author: linqibin
 * @Date: 2022-08-26 16:42:29
 * @LastEditors: linqibin
 * @LastEditTime: 2023-01-06 11:25:59
 * @Description:
 *
 * Copyright (c) 2022 by 研发中心/金地楼宇, All Rights Reserved.
 */
import { useEffect } from "react";
// import Cube from './components/cube'
// import Texture from './components/texture'
// import Galaxy from './components/galaxy'
// import Room from './components/room'
import Bridge from "./components/bridge";
import Model from "./components/model";
// import { Button } from 'antd'
// import { ProLayout } from '@ant-design/pro-components'
// import ProLayout from '@ant-design/pro-layout'
import "./App.css";
// import '@ant-design/pro-components/dist/components.less'
// import 'antd/dist/antd.css'

// console.log(ProLayout);

function App() {
  useEffect(() => {
    console.log(123);
  }, [])
  return (
    // <Cube/>
    // <Texture/>
    // <Galaxy/>
    // <Room/>
    // <Bridge/>
    <Model gltf="LittlestTokyo.glb"/>
  )
}

export default App;
