import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'


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
  }
]

