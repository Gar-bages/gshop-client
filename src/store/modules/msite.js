import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS} from '../mutation-types'
import {reqAdderss,reqCategorys,reqShops} from '../../api'
const state = {
  longitude: 116.36867,
  latitude: 40.10038,
  address:{}, //Msite顶部地址
  categorys:[], // 商品列表
  shops:[], //店铺信息
}
const mutations = {
  [RECEIVE_ADDRESS] (state,address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state,categroys) {
    state.categorys = categroys
  },
  [RECEIVE_SHOPS] (state,shops) {
    state.shops = shops
  },
}
const actions = {
  //异步得到地址信息
  async getAddress ({commit,state}) {
    const {longitude,latitude} = state
    //发送ajax请求
    const result = await reqAdderss(longitude,latitude)
    // console.log('result',result);
    //成功后调用mutations里对应的方法
    if(result.code ===0) {
      commit(RECEIVE_ADDRESS,result.data)
    }
  },
  //异步得到商品列表
  async getCategorys ({commit}) {
    const result = await reqCategorys()
    if(result.code ===0) {
      commit(RECEIVE_CATEGORYS,result.data)
    }
  },
  //异步得到商铺列表
  async getShops ({commit,state}) {
    const {longitude,latitude} = state
    //发送ajax请求
    const result = await reqShops({longitude,latitude})
    //成功后调用mutations里对应的方法
    if(result.code ===0) {
      commit(RECEIVE_SHOPS,result.data)
    }
  },
}
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
