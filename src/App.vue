<template>
  <div>
    <router-view/>
    <FooterGuide v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {reqGoods} from './api'

export default {
  async mounted () {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getUser')
    this.$store.dispatch('getShopGoods')
    // const result = await reqGoods()
    // console.log('result',result);
  },
  // async mounted() {
  //   const result = await reqAdderss('116.36867','40.10037')
  //   console.log('result',result)
    // const result2 = await reqCategorys()
    // console.log('result2',result2)
    // const result3 = await reqAdderss({116.36867 , 40.10038})
    // console.log('result3',result3)
  // },
  components: {
    FooterGuide
  }
}
</script>

<style>


</style>
