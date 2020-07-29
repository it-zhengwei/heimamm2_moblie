<template>
  <div class="my">
    <div class="top">
      <div class="header">
        <div class="left">
          <h1>{{ userInfo.nickname }}</h1>
          <p>{{ userInfo.intro }}</p>
        </div>
        <div class="right">
          <img :src="userInfo.avatar" alt="" />
        </div>
      </div>
      <ul class="data">
        <li>
          <h1>{{ userInfo.submitNum }}</h1>
          <p>累计答题</p>
        </li>
        <li>
          <h1>{{ userInfo.collectQuestions.length }}</h1>
          <p>收藏题目</p>
        </li>
        <li>
          <h1>{{ userInfo.errorNum }}</h1>
          <p>我的错题</p>
        </li>
        <li>
          <h1>{{ accuracy }}%</h1>
          <p>正确率</p>
        </li>
      </ul>
      <div class="position">
        <cell
          title="我的岗位"
          :value="userInfo.position"
          icon="iconicon_mine_gangwei"
        ></cell>
      </div>
    </div>
    <div class="center">
      <h3>面经数据</h3>
      <ul>
        <li>
          <div>
            昨日阅读<span>{{ userInfo.shareData.read.yesterday }}</span>
          </div>
          <h1>{{ userInfo.shareData.read.total }}</h1>
          <p>阅读总数</p>
        </li>
        <li>
          <div>
            昨日获取<span>{{ userInfo.shareData.star.yesterday }}</span>
          </div>
          <h1>{{ userInfo.shareData.star.total }}</h1>
          <p>获赞总数</p>
        </li>
        <li>
          <div>
            昨日阅读<span>{{ userInfo.shareData.comment.yesterday }}</span>
          </div>
          <h1>{{ userInfo.shareData.comment.total }}</h1>
          <p>评论总数</p>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <cell
        title="我的面经分享"
        value="21"
        icon="iconicon_mine_mianjing"
      ></cell>
      <cell
        title="我的消息"
        :value="userInfo.systemMessages"
        icon="iconicon_mine_xiaoxi"
      ></cell>
      <cell
        title="收藏的题库"
        :value="userInfo.collectQuestions.length"
        icon="iconicon_mine_tikushoucang"
      ></cell>
      <cell
        title="收藏的企业"
        value="32"
        icon="iconicon_mine_qiyeshoucang"
      ></cell>
      <cell
        title="我的错题"
        :value="userInfo.errorQuestions.length"
        icon="iconicon_mine_cuoti"
      ></cell>
      <cell
        title="收藏的面试经验"
        :value="userInfo.starArticles.length"
        icon="iconbtn_shoucang_nor"
      ></cell>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 导入自己封装的组件库的组件

export default {
  // 计算属性
  computed: {
    ...mapState(['userInfo']),
    // 计算正确率
    accuracy () {
      return (
        ((this.userInfo.submitNum - this.userInfo.errorNum) /
          this.userInfo.submitNum) *
        100
      ).toFixed(1)
    }
  }
}
</script>

<style lang="less">
.my {
  padding: 0 15px;
  .top {
    position: relative;
    margin: 0 -15px;
    padding: 0 15px;
    padding-top: 31px;

    margin-bottom: 27px;
    height: 216px;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 21px;
      .left {
        h1 {
          font-size: 21px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          margin-bottom: 6px;
        }
        p {
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .right {
        width: 50px;
        height: 50px;
        margin-right: 22px;
        border: 3px solid rgba(255, 255, 255, 0.38);
        border-radius: 50%;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
    }
    .data {
      text-align: center;
      display: flex;
      justify-content: space-around;
      align-items: center;
      h1 {
        font-size: 21px;
        font-family: DINAlternate, DINAlternate-Bold;
        font-weight: 700;
        color: #ffffff;
        margin: 0;
        margin-bottom: 6px;
      }
      p {
        opacity: 0.7;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .position {
      position: absolute;
      width: 345px;
      bottom: -15px;
      height: 55px;
      border: 1px solid transparent;
      border-radius: 8px;
      overflow: hidden;
      .van-cell {
        i {
          &:first-child {
            font-size: 20px;
            margin-right: 13px;
          }
        }
        &::after {
          border: 0;
        }
      }

      .van-cell__title {
        span {
          font-size: 15px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;

          color: #181a39;
        }
      }
      .van-cell__value {
        span {
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;

          color: #5b5d75;
        }
      }
    }
  }
  .center {
    height: 143px;
    background: #ffffff;
    border-radius: 8px;
    padding: 19px 15px;
    margin-bottom: 10px;
    h3 {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #181a39;
      margin-top: 0;
      margin-bottom: 18px;
    }
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        text-align: center;
        div {
          font-size: 10px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #b4b4bd;
          margin-bottom: 10px;
          span {
            color: #00b8d4;
          }
        }
        h1 {
          font-size: 21px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          margin-bottom: 6px;
          color: #181a39;
        }
        p {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #545671;
        }
      }
    }
  }
  .bottom {
    height: 330px;
    border: 2px solid #fff;
    overflow: hidden;
    border-radius: 8px;
    .van-cell {
      i {
        &:first-child {
          font-size: 20px;
          margin-right: 13px;
        }
      }
      &::after {
        border: 0;
      }
    }

    .van-cell__title {
      span {
        font-size: 15px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;

        color: #181a39;
      }
    }
    .van-cell__value {
      span {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;

        color: #5b5d75;
      }
    }
  }
}
</style>
