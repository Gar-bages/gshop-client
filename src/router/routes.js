// import Msite from '../pages/Msite/Msite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'

/*
路由懒加载:
  1. 使用import函数: 被引入的模块单独打包(生成一个单独的打包文件)
  2. 配置的component是: 返回import()得到的模块的函数, 只有当请求对应的path, 才会执行此函数, 从后台获取对应的包

好处:
  减小首屏需要加载的js 让首屏更快显示 提高用户体验
 */

const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import A from '../pages/test/A.vue'
import B from '../pages/test/B.vue'
import B1 from '../pages/test/B1.vue'
import B2 from '../pages/test/B2.vue'

export default [
  {
    path:'/msite',
    component:Msite,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/search',
    component:Search,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/order',
    component:Order,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/shop',
    component:Shop,
    children:[
      {
        path:'/shop/goods',
        component:ShopGoods
      },
      {
        path:'/shop/info',
        component:ShopInfo
      },
      {
        path:'/shop/ratings',
        component:ShopRatings
      },
      {
        path:'',
        redirect:'/shop/goods'
      }
    ]

  },
  {
    path:'/',
    redirect:'/msite'
  },
  {
    path:'/a',
    component:A,
  },
  {
    path:'/b',
    component:B,
    children: [
      {
        path:'/b/b1',
        component:B1,
      },
      {
        path:'/b/b2',
        component:B2,
      },
    ]
  },

]

