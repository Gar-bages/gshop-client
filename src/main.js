
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import 'static/css/reset.css'
import './mock/mockServer' //mockServer.js 会被打包执行一次
import CartControl from './components/CartControl/CartControl.vue'

Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component('CartControl',CartControl)

new Vue({
  el: '#app',
  // components: {
  //   App
  // },
  // template: '<App/>',
  render: h => h(App), //返回值 <App/> 将渲染到el中
  router,
  store
})
