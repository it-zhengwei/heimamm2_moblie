<template>
  <div class="modification">
    <navBar
      :title="title"
      class="top"
      @onClickLeft="onClickLeft"
      @onClickRight="onClickRight"
      value="保存"
    ></navBar>
    <van-field
      v-if="key !== 'avatar'"
      v-model="value"
      class="inp"
      size="large"
      center
    />
    <div v-else class="uploader">
      <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" />
    </div>
  </div>
</template>

<script>
// 导入api
import { editUserInfo, upload } from '@/api/userInfo.js'
// 导入map辅助函数
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      title: '',
      value: '续命咖啡',
      key: '',
      // 标题对象
      titleObj: {
        nickname: '名字',
        intro: '个人简介',
        avatar: '头像',
        position: '职位'
      },
      // 上传完预览的图片
      fileList: [{ url: '', status: '', message: '' }],
      // 图片id
      avatarId: ''
    }
  },
  created () {
    // 保存携带过来的参数
    this.key = this.$route.query.key
    // 根据携带的参数获取对应的标题
    this.title = '修改' + this.titleObj[this.key]
    // 判断当前字段是否是avatar
    if (this.key !== 'avatar') {
      // 获取当前字段的信息
      this.value = this.userInfo[this.key]
    } else {
      this.fileList[0].url = this.userInfo[this.key]
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['EIDTPARTUSERINFO']),
    // 保存按钮功能
    onClickRight () {
      // 如果用户没有修改图片 提示用户修改
      if (this.avatarId === '' && this.key === 'avatar') {
        this.$toast.fail('请修改图片')
        return
      }
      // 提示加载
      this.$toast.loading({
        message: '加载中...',
        ducation: 0
      })
      // 声明一个空对象
      const nullObj = {}
      if (this.key !== 'avatar') {
        // 把当前字段和修改的值保存进去
        nullObj[this.key] = this.value
      } else {
        nullObj[this.key] = this.avatarId
      }
      // 发送请求
      editUserInfo(nullObj).then(res => {
        if (this.key !== 'avatar') {
          // 保存到vuex
          this.EIDTPARTUSERINFO({ key: this.key, value: res.data[this.key] })
        } else {
          res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
          // 保存到vuex
          this.EIDTPARTUSERINFO({ key: this.key, value: res.data.avatar })
        }
        // 提示用户
        this.$toast.success('修改成功')
        // 跳转到上一页
        this.$router.go(-1)
      })
    },
    // 导航栏左边返回按钮
    onClickLeft () {
      this.$router.go(-1)
    },
    // 上传图片执行的回调函数
    afterRead (file) {
      this.fileList[0].status = 'uploading'
      this.fileList[0].message = '上传中'
      // 创建FormData对象
      const data = new FormData()
      // 追加参数
      data.append('files', file.file)
      // 发送请求
      upload(data).then(res => {
        this.fileList[0].status = 'done'
        this.fileList[0].message = '上传成功'
        // 获取id
        this.avatarId = res.data[0].id
      })
    }
  }
}
</script>

<style lang="less">
.modification {
  padding: 0 15px;
  .top {
    .iconbtn_nav_back {
      font-size: 40px;
    }
    .van-nav-bar__title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 400;

      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
    }

    margin: 0 -15px;
    height: 44px;
    margin-bottom: 20px;
  }
  .inp {
    height: 34px;
    border-radius: 20px;
    background: #f7f4f5;
  }
  .uploader {
    text-align: center;
  }
}
</style>
