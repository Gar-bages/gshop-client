// 使用mockjs来mock数据接口

import Mock from 'mockjs'
import data from './data.json'  //内部自动把JSON对象解析成js对象

//提供goods接口
Mock.mock('/goods',{code:0,data:data.goods})
//提供ratings接口
Mock.mock('/ratings',{code:0,data:data.ratings})
//提供info接口
Mock.mock('/info',{code:0,data:data.info})

//不需要编码向外暴露东西
console.log('mock',111);
