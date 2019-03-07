
import Vue from 'vue'
import App from './App'
import {Button} from 'mint-ui'
import router from './router/index'
import store from './store'
import 'static/css/reset.css'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import CartControl from './components/CartControl/CartControl.vue'
import Split from './components/Split/Split.vue'
import './mock/mockServer' //mockServer.js 会被打包执行一次
import './filters'
import VueLazyLoad from 'vue-lazyload'
import loading from './common/imgs/loading.gif'

Vue.component(Button.name,Button) //mt-button
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component('CartControl',CartControl)
Vue.component('Split',Split)

Vue.store = store

Vue.use(VueLazyLoad,{
  loading
})

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
