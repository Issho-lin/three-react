/*
 * @Author: linqibin
 * @Date: 2022-08-29 16:33:16
 * @LastEditors: linqibin
 * @LastEditTime: 2022-08-29 17:37:24
 * @Description: 
 * 
 * Copyright (c) 2022 by 研发中心/金地楼宇, All Rights Reserved. 
 */
import VR_Cube from './vr/cube';
import front from '../assets/snow/pz.jpg'
import back from '../assets/snow/nz.jpg'
import left from '../assets/snow/px.jpg'
import right from '../assets/snow/nx.jpg'
import top from '../assets/snow/py.jpg'
import bottom from '../assets/snow/ny.jpg'

const Bridge: React.FC = () => {
    return (
        <VR_Cube textures={[left, right, top, bottom, front, back]}/>
    )
}
export default Bridge