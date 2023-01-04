/*
 * @Author: linqibin
 * @Date: 2022-08-29 16:33:16
 * @LastEditors: linqibin
 * @LastEditTime: 2023-01-03 15:41:22
 * @Description: 
 * 
 * Copyright (c) 2022 by 研发中心/金地楼宇, All Rights Reserved. 
 */
import VR_Cube from './vr/cube';
import front from '../assets/bridge/pz.jpg'
import back from '../assets/bridge/nz.jpg'
import left from '../assets/bridge/px.jpg'
import right from '../assets/bridge/nx.jpg'
import top from '../assets/bridge/py.jpg'
import bottom from '../assets/bridge/ny.jpg'

const Bridge: React.FC = () => {
    return (
        <VR_Cube textures={[left, right, top, bottom, front, back]}/>
    )
}
export default Bridge