<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li class="menu-item" v-for="(good,index) in goods" :key="index"
              :class="{current:index === currentIndex}" @click="clickLeftItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" @click="showFood(food)">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/> <!--组件需要food 而它取不到遍历里边的food 所以在data里创建一个空的-->
  </div>

</template>
<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'

  export default {
    components: {
      Food,
      ShopCart
    },
    mounted () {
      this.$store.dispatch('getShopGoods',() => {
        this.$nextTick(() => {
          //界面显示后才能滑动和显示li的top值
          this._initScroll()
          this._initTops()
        })
      })
      // await this.$store.dispatch('getShopGoods') //dispatch内部返回一个promise对象 promise内部在更新完界面后才调用resolve()
      // new BScroll('.menu-wrapper',{})
      // new BScroll('.foods-wrapper',{})
    },
    data () {
      return {
        scrollY: 0, // 右侧列表在Y轴滑动坐标  --> 初始值是0, 在右侧滑动过程中不断变化
        tops: [], // 右侧所有分类列表li的top组成的数组  --> 初始值[], 在列表显示之后确定其值, 后面不再变化
        food:{}  //要显示那个的food
      }
    },
    computed: {
      ...mapState({
        goods:state => state.shop.goods
      }),
      //当前下标
      currentIndex () {
        const {scrollY,tops} = this
        /*
           下标：0  1  2  3   4
        tops = [0, 5, 8, 10, 16]
                        8     10
        scrollY = 9   [top, nextTop)   top所对应的index就是currentIndex
         */
        //得到当前分类最新下标
        const index = tops.findIndex((top,index) => scrollY >= top && scrollY < tops[index+1])
        //如果下标变化, 让左侧列表滑动当前分类处
        //下标也有可能不变
        if(this.index != index && this.leftScroll){ //this.leftScroll这个方法在列表数据显示之后才调用 currentIndex在初始化就调用了一次 所以要做一个限制
          //满足条件进来说明下标变化把之前分类的下标存起来
          this.index = index
          //找到index对应的分类项li
          const li = this.$refs.leftUl.children[index]
          //让左侧分类列表滑动到指定li  scrollToElement 滚动到指定的目标元素
          this.leftScroll.scrollToElement(li,500)
        }
        return index
      }
    },
    methods: {
      //一般写事件的方法  为了区分加下划线
      //初始化滚动对象
      _initScroll () {
        // 在列表数据显示之后创建对象
        this.leftScroll = new BScroll('.menu-wrapper',{
          click: true, //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件
        })
        this.rightScroll = new BScroll('.foods-wrapper',{
          probeType:1, //默认值为0 即不派发 scroll 事件 为1时 非实时（屏幕滑动超过一定时间后）派发scroll 事件
          //probeType:2  为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件
          //probeType:3  为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum(惯性) 滚动动画运行过程中实时派发 scroll 事件
        })
        //绑定对右侧滑动的监听  scroll 滚动的实时坐标
        this.rightScroll.on('scroll',({x,y}) => {
          this.scrollY = Math.abs(y)
        })
        //绑定对右侧滑动结束的监听  scrollEnd 滚动结束的位置坐标
        this.rightScroll.on('scrollEnd',({x,y}) => {
          this.scrollY = Math.abs(y)
        })
      },
      //初始化所有右侧li的top值
      _initTops () {
        //获取右侧所有li 返回伪数组
        const lis = this.$refs.rightUl.children
        const tops = []
        let top = 0
        tops.push(top)
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        //更新tops的状态数据
        this.tops = tops
        console.log('tops',tops);
      },
      //点击左侧列表 让右侧滑动到对应位置
      clickLeftItem (index) {
        //得到左侧列表对应的右侧列表的top值
        const top = this.tops[index]
        //更新scrollY最终滑动的距离
        this.scrollY = top
        //右侧滑动top值的距离  scrollTo(x,y,time) 滚动到指定的位置
        this.rightScroll.scrollTo(0,-top,500)
      },
      //显示对应图片大图
      showFood (food) {
        //点击图片更新状态
        this.food = food //遍历中的food赋值给data里的food
        //调用显示图片的方法
        this.$refs.food.toggle()
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px

</style>
