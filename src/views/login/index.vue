<template>
  <div class="login">
    <div class="navBar">
      <navBar></navBar>
    </div>
    <h1>您好,请登录</h1>
    <van-form ref="form" @submit="onSubmit" class="form">
      <van-field
        v-model="phone"
        name="phone"
        type="tel"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '输入格式错误'
          }
        ]"
      >
        <template #left-icon>
          <i class="iconfont iconbianzu1"></i>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="digit"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #left-icon>
          <i class="iconfont iconyanzhengma"></i>
        </template>
        <template #button>
          <span class="code" @click="getCode">{{ btnText }}</span>
        </template>
      </van-field>
      <p class="xieyi">
        登录即同意
        <span>《用户使用协议》</span>
        和
        <span>《隐私协议》</span>
      </p>
      <div style="margin: 16px;">
        <van-button
          class="btn"
          size="large"
          round
          text="确定"
          native-type="submit"
        >
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入保存token
import { setToken } from '@/utils/local.js'
// 导入接口
import { getCode, login } from '@/api/login.js'
export default {
  data () {
    return {
      phone: '',
      code: '',
      btnText: '获取验证码',
      num: 0
    }
  },
  methods: {
    // 全局验证成功就执行的函数
    onSubmit () {
      // 登录请求
      login({ mobile: this.phone, code: this.code }).then(res => {
        // 保存token
        setToken(res.data.jwt)
        // 把基地址拼接到图片地址
        res.data.user.avatar = process.env.VUE_APP_URL + res.data.user.avatar
        // 把用户数据给vuex
        this.$store.commit('USERINFO', res.data.user)
        // 修改登录状态值
        this.$store.commit('ISLOGIN', true)
        if (this.$route.query.target) {
          // 如果是记录有目标页面登录就跳转到目标页面
          this.$router.push(this.$route.query.target)
        } else {
          // 如果没有目标页面就跳转到发现页
          this.$router.push('/find')
        }

        this.$toast.success('登录成功')
      })
    },
    // 获取验证码
    getCode () {
      // 判断是否在进行验证
      if (this.num !== 0) {
        return
      }

      // 验证手机号
      this.$refs.form.validate('phone').then(() => {
        // 加载提示
        this.$toast.loading({
          message: '加载中...',
          ducation: 0
        })
        // 改变num的值为总秒数
        this.num = 60
        // 改变按钮的值
        this.btnText = `${this.num}S后重新获取`
        const timeId = setInterval(() => {
          this.num--
          this.btnText = `${this.num}S后重新获取`
          if (this.num === 0) {
            this.btnText = '获取验证码'
            // 清除定时器
            clearInterval(timeId)
          }
        }, 1000)
        // 发送验证码请求
        getCode({ mobile: this.phone }).then(res => {
          // window.console.log(res)
          // 提示用户
          this.$toast.success(res.data)
        })
      })
    }
  }
}
</script>

<style lang="less">
.login {
  height: 680px;
  background-color: #fff;
  padding: 0 15px;
  .navBar {
    margin-bottom: 50px;
  }
  h1 {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
    margin-bottom: 63px;
  }
  .form {
    .iconfont {
      font-size: 16px;
      margin-right: 21px;
    }
    .btn {
      background-color: @main-color;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: center;
      color: #ffffff;
    }
    .code {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;

      color: #00b8d4;
    }
    .xieyi {
      margin-top: 21px;
      margin-bottom: 40px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #181a39;

      span {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;

        color: #00b8d4;
      }
    }
  }
}
</style>
