<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!isRightPhone || computeTime>0" class="get_verification" :class="{right_phone_number: isRightPhone}" @click.prevent="sendCode">{{computeTime>0 ? `已发送${computeTime}s` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <!--isShowPwd为true就显示密码-->
                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <!--点击打开按钮代表显示密码 按钮就会往右平移-->
                <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd=!isShowPwd">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? '...' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img ref="captcha" class="get_verification" src="http://localhost:5000/captcha" alt="captcha" @click="updateCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
  import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api'

  export default {
    data () {
      return {
        loginWay: true,  //登录方式 true短信 false密码
        phone: '', //初始化显示手机号
        computeTime: 0, //倒计时剩余时间 0代表没有计时
        code: '', //一次性短信验证码
        name: '', //用户名初始值
        pwd: '',  //密码初始值
        captcha: '', //一次性图片验证码
        isShowPwd: false  //是否显示密码
      }
    },
    computed:{
      isRightPhone () {
        return /^1\d{10}$/.test(this.phone)  //正则检查手机号是否正确
      }
    },
    methods: {
      //点击获取验证码调用
      async sendCode () {
        //从30秒开始倒计时
        this.computeTime = 30
        const IntervalId = setInterval(() => {
          //短信验证码失败会停止计时 再走这就会变 -1
          this.computeTime --
          if(this.computeTime <= 0) {
            this.computeTime = 0
            clearInterval(IntervalId)
          }
        },1000)
        //向手机号发送短信验证码
        const result = await reqSendCode(this.phone)   // {code: 0}  {code: 1: msg: ''}
        if(result.code===0) {//成功
          alert('验证码发送成功')
        }else { //失败
          alert(result.msg)
          //停止计时
          this.computeTime = 0
        }
      },
      async login () {
        const {loginWay,isRightPhone,phone,code,name,pwd,captcha} = this
        let result
        if(loginWay){ //短信方式验证
          if(!isRightPhone) {
            alert('请输入正确的电话号码')
            return
          }else if(!/^\d{6}$/.test(code)) {
            alert('需输入六位验证码')
            return
          }
          // 短信登录
          result = await reqSmsLogin(phone,code)
          //停止计时
          this.computeTime = 0
        }else {//密码方式验证
          if(!name.trim()) {
            alert('必须输入用户名')
            return
          }else if(!pwd.trim()) {
            alert('必须输入密码')
            return
          }else if(!captcha.trim()) {
            alert('必须输入验证码')
            return
          }
          //密码登录
          result = await reqPwdLogin({name,pwd,captcha})
        }
        if(result.code===0) {//登录成功
          const user = result.data
          //把user保存到vuex中
          this.$store.dispatch('saveUser',user)
          //点击登录跳转到个人中心界面
          this.$router.replace('./profile')
        }else {//登录失败
          alert(result.msg)
        }
      },

      updateCaptcha () {
        this.$refs.captcha.src = 'http://localhost:5000/captcha?time=' + Date.now()
      }
    },
    beforeRouteEnter (to,from,next) {
      next(com => {
        //如果已经登录 不用变化
        if(com.$store.state.user.user._id) {
          next('./profile')
        }else {
          //否则跳到登录页面
          next()
        }
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
