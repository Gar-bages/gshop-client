<template>
</template>
<script>
  export default {
    //在当前组件对象被创建前调用, 不能直接访问this(不是组件对象)
    // 但可以通过next(component => {}), 在回调函数中访问组件对象
    beforeRouteEnter (to,from,next) {
      next(component => {
        component.intervalId = setInterval(() => {
          console.log('事情');
        },1000)
      })
    },
    beforeRouteLeave (to,from,next) {
      clearInterval(this.intervalId)
      next()
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
