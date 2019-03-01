
import Vue from 'vue'
import {RECEIVE_GOODS,RECEIVE_RATINGS,RECEIVE_INFO,ADD_FOOD_COUNT,REDUCE_FOOD_COUNT,CLEAR_CART} from '../mutation-types'
import {reqGoods,reqRatings,reqInfo} from '../../api'

const state = {
  goods:[],  //商品分类列表
  ratings:[],  //商家评价列表
  info:{},  //商家信息
  cartFoods:[],  //购物车中所有的食物
}
const mutations = {
  [RECEIVE_GOODS] (state,goods) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state,ratings) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state,info) {
    state.info = info
  },
  [ADD_FOOD_COUNT] (state,food) {
    if(food.count){ //food一开始没有count这个属性 所以在undefined上 ++ 会报错
      food.count ++
    }else { //没有count 第一次增加的时候
      //给food添加一个新的count属性 值为1  新属性没有数据绑定
      //Vue.set( target, key, value )  key属性名 永远都是字符串类型
      //向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性
      Vue.set( food, 'count', 1 )
      //每个食物添加进一次购物车就可以
      state.cartFoods.push(food)
    }
  },
  [REDUCE_FOOD_COUNT] (state,food) {
    if(food.count>0){ //这样不会出现负值
      food.count --
    }
    if(food.count === 0) {
      //当一个食物的数量等于0时 就把它从购物车移除
      const index = state.cartFoods.indexOf(food)
      state.cartFoods.splice(index,1)
    }
  },
  [CLEAR_CART] (state) {
    //把在购物车的food的count值变为0
    state.cartFoods.forEach(food => food.count=0)
    //清空所有食物
    state.cartFoods = []
  }

}
const actions = {
  //mock
  //异步获取goods
  async getShopGoods ({commit},callback){
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS,goods)
      //更新状态后立即调用回调函数
      typeof callback === 'function' && callback()
    }
  },
  //异步获取ratings
  async getShopRatings ({commit}){
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS,ratings)
    }
  },
  //异步获取info
  async getShopInfo ({commit}){
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO,info)
    }
  },
  //更新食物数量
  updateFoodCount ({commit},{isAdd,food}) {
    if (isAdd) { //加
      commit(ADD_FOOD_COUNT,food)
    } else { //减
      commit(REDUCE_FOOD_COUNT,food)
    }
  },
  //清空食物
  clearCart ({commit}) {
    commit(CLEAR_CART)
  }
}
const getters = {
  //购物车中食物总数量
  totalCount (state) {
    //遍历购物车里的所有食物的数量进行累加
    return state.cartFoods.reduce((preTotal,item) => preTotal + item.count,0)
  },
  //购物车中食物总价格
  totalPrice (state) {
    //遍历购物车里的所有食物的价格进行累加
    return state.cartFoods.reduce((prePrice,item) => prePrice + item.count*item.price,0)
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
