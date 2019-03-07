import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes
})

const paths = ['/a','/b']
router.beforeEach((to,from,next) => {
  //要跳到某个组件的路由地址
  const path = to.path
  //在数组中找不等于-1说明找到了
  if(paths.indexOf(path)!==-1) {
    //如果没有登录 强制让它去登录
    if(!Vue.store.state.user.user._id){
      return next('/login')
    }else {
      next()
    }
  }else {
    next()
  }
})

export default router
