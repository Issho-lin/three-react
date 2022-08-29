/*
 * @Author: linqibin
 * @Date: 2022-08-29 14:38:23
 * @LastEditors: linqibin
 * @LastEditTime: 2022-08-29 17:55:58
 * @Description:
 *
 * Copyright (c) 2022 by 研发中心/金地楼宇, All Rights Reserved.
 */
import VR_Sphere from "./vr/sphere";
import paster from "../assets/room.jpg";

console.log(paster);

const Room: React.FC = () => {
  return <VR_Sphere texture={paster}/>;
};
export default Room;
