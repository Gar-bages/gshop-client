
import {RECEIVE_USER,RESET_USER} from '../mutation-types'
import {reqUser,reqLogout} from '../../api'

const state = {
  user:{},  //登录用户
}
const mutations = {
  [RECEIVE_USER] (state,user) {
    state.user = user
  },
  [RESET_USER] (state) {
    state.user = {}
  },
}
const actions = {
  //同步保存user
  saveUser ({commit},user) {
    commit(RECEIVE_USER,user)
  },

  //异步获取user
  async getUser({commit}){
    const result = await reqUser()
    if(result.code===0) {
      const user = result.data
      commit(RECEIVE_USER,user)
    }
  },

  //退出登录
  async logout ({commit}){
    const result = await reqLogout()
    if(result.code===0) {
      commit(RESET_USER)
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
