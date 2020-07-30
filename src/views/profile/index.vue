<template>
  <div class="profile">
    <navBar @onClickLeft="onClickLeft" title="我的资料" class="navBar"></navBar>
    <cell title="头像" class="photo" @click="editUserInfo('avatar')">
      <template>
        <img :src="userInfo.avatar" alt="" />
      </template>
    </cell>
    <van-cell-group class="cellList">
      <cell
        title="昵称"
        :value="userInfo.nickname"
        @click="editUserInfo('nickname')"
      ></cell>
      <cell title="性别" :value="getGender" @click="genderPopup"></cell>
      <cell
        title="地区"
        :value="areaList.city_list[userInfo.area]"
        @click="areaPopup"
      ></cell>
      <cell
        title="个人简介"
        :value="userInfo.intro"
        @click="editUserInfo('intro')"
      ></cell>
    </van-cell-group>

    <!-- 性别弹出框 -->
    <van-popup v-model="showGender" position="bottom" @closed="onCancel">
      <van-picker
        ref="picker"
        title="修改性别"
        show-toolbar
        :columns="genderList"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="userInfo.gender"
      />
    </van-popup>

    <!-- 省市区弹出框 -->
    <van-popup v-model="showArea" position="bottom" @closed="cancelArea">
      <van-area
        ref="area"
        title="修改地区"
        :area-list="areaList"
        :value="userInfo.area"
        :columns-num="2"
        :columns-placeholder="['请选择', '请选择']"
        @confirm="confirmArea"
        @cancel="cancelArea"
      />
    </van-popup>
  </div>
</template>

<script>
// 导入api
import { editUserInfo } from '@/api/userInfo.js'
// 导入省市区数据
import area from '@/utils/area.js'
// 导入map辅助函数
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 控制省市区是否显示
      showArea: false,
      // 省市区数据
      areaList: area,
      // 控制性别弹出框是否显示
      showGender: false,
      // 性别数组
      genderList: ['未知', '男', '女']
    }
  },
  name: 'profile',

  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['getGender'])
  },
  methods: {
    // 跳转到修改页面
    editUserInfo (key) {
      // 携带相对应的字段过去
      this.$router.push('/modification?key=' + key)
    },
    // 省市区确认按钮
    confirmArea (data) {
      // 提示用户加载
      this.$toast.loading({
        message: '修改中...',
        ducation: 0
      })
      // 发送请求
      editUserInfo({ area: data[1].code }).then(() => {
        // 提示用户
        this.$toast.success('修改成功')
        // 保存到vuex
        this.EIDTPARTUSERINFO({ key: 'area', value: data[1].code })
        // 关闭弹框
        this.showArea = false
      })
    },
    // 省市区取消按钮
    cancelArea () {
      // 重置
      this.$refs.area.reset(this.userInfo.area)
      // 关闭弹框
      this.showArea = false
    },
    // 省市区弹出框
    areaPopup () {
      this.showArea = true
    },
    // 展开vuex的mutation的方法
    ...mapMutations(['EIDTPARTUSERINFO']),
    // 返回上一页
    onClickLeft () {
      this.$router.go(-1)
    },
    // 性别弹出框
    genderPopup () {
      this.showGender = true
    },
    // 性别确定功能
    onConfirm (value, index) {
      // 提示加载
      this.$toast.loading({
        message: '修改中...',
        ducation: 0
      })
      // 发送请求
      editUserInfo({ gender: index }).then(res => {
        // 提示用户
        this.$toast.success('修改成功')
        // 保存修改的数据到vuex
        this.EIDTPARTUSERINFO({ key: 'gender', value: index })
        // 关闭弹框
        this.showGender = false
      })
    },
    // 性别取消功能
    onCancel () {
      // 重置
      this.$refs.picker.setColumnIndex(0, this.userInfo.gender)
      // 关闭弹框
      this.showGender = false
    }
  }
}
</script>

<style lang="less">
.profile {
  padding: 0 15px;
  .navBar {
    height: 44px;
    margin-bottom: 18px;
    .van-nav-bar {
      margin: 0 -15px;

      padding: 0 15px;
    }
    .van-nav-bar__title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;

      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
    }
  }
  .photo {
    height: 60px;
    margin-bottom: 10px;
    border-radius: 8px;
    overflow: hidden;
    align-items: center;
    img {
      height: 44px;
      width: 44px;
      border-radius: 50%;
      margin-top: 10px;
    }
  }
  .cellList {
    border-radius: 8px;
    overflow: hidden;
    .van-cell {
      align-items: center;
      &:last-child {
        .van-cell__value {
          flex: 2;
        }
      }
    }
  }
}
</style>
