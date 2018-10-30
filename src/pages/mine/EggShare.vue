<template>
  <div class="page">
    <div class="blank"></div>
    <img class="icon-success" src="../../assets/images/img_setegg_success.png" />
    <div class="egg-info">送你一个{{info.reType | getReType}}{{info.zoneType | getType}}彩蛋</div>
    <!-- <div v-if="!!info.expDay" class="egg-info">有效期还剩<span class="orange">{{info.expDay}}</span>天</div> -->
    <div v-if="!!expDay" class="egg-info">有效期还剩<span class="orange">{{expDay}}</span>天</div>
    <div class="egg-desc">请到指定门店位置领取打开</div>
    <div class="btn" @click="toShopDetail">查看门店信息</div>
  </div>
</template>
<script type="text/javascript">
import api from "@/fetch/api.js";
import * as _ from "@/util/tool.js";
export default {
  data() {
    return {
      info: {},
      id: null,
      expDay: '',
    };
  },
  filters: {
    getType(key) {
      if (key == null || key == undefined) {
        return "";
      }
      switch (key) {
        case 1:
          return "图文";
          break;
        case 2:
          return "语音";
          break;
        case 3:
          return "视频";
          break;
        default:
          return "";
          break;
      }
    },
    getReType(key) {
      if (key == null || key == undefined) {
        return "";
      }
      switch (key) {
        case 1:
          return "、优惠券";
          break;
        case 2:
          return "、碎片";
          break;
        case 3:
          return "、代金券";
          break;
        case 4:
          return "、红包";
          break;
        default:
          return "";
          break;
      }
    }
  },
  mounted() {
    let { id, shopId, expDay = '' } = this.$route.query;
    this.id = id;
    this.shopId = shopId;
    this.expDay = expDay;
    this.getInfo();
  },
  methods: {
    getInfo() {
      const wx = this.$wechat;
      var self = this;
      api.user.getEggDetail({ id: this.id }).then(res => {
        let { data = {} } = res;
        this.info = data;
        wx.onMenuShareTimeline({
            title: '送你一个彩蛋惊喜', // 分享标题
            link: `http://cs.juanzisc.com/collection/shopDetail?shopId=${self.shopId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://cs.juanzisc.com/img_share_caidan.png", // 分享图标
            success: function () {
            // 用户点击了分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: '送你一个彩蛋惊喜', // 分享标题
            desc: '快到彩蛋位置领取打开，看看我给你放了什么吧！', // 分享描述
            link: `http://cs.juanzisc.com/collection/shopDetail?shopId=${self.shopId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://cs.juanzisc.com/img_share_caidan.png", // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户点击了分享后执行的回调函数
                // _.alert("分享成功");
            }
        });
        return;
        wx.updateAppMessageShareData({
          title: "送你一个彩蛋惊喜", // 分享标题
          desc: "快到彩蛋位置领取打开，看看我给你放了什么吧！", // 分享描述
          link: `http://cs.juanzisc.com/collection/shopDetail?shopId=${self.shopId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "http://cs.juanzisc.com/img_share_caidan.png", // 分享图标
          success: function() {
            _.alert("分享成功");
          }
        });
        wx.updateTimelineShareData({
          title: "送你一个彩蛋惊喜", // 分享标题
          link: `http://cs.juanzisc.com/collection/shopDetail?shopId=${self.shopId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "http://cs.juanzisc.com/img_share_caidan.png", // 分享图标
          success: function() {
            _.alert("分享成功");
          }
        });
      });
    },
    toShopDetail() {
      this.$router.push({
        path: "/collection/shopDetail",
        query: {
          shopId: this.shopId
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #fff;
}

.blank {
  width: 100%;
  height: 120px;
  background: #fff;
}

.btn {
  margin: 20.6px auto 0 auto;
  width: 270px;
  height: 68px;
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 68px;
  background: #f05720;
  border-radius: 34px;
}

.egg-desc {
  margin-top: 120px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #818b8f;
  letter-spacing: 0;
  text-align: center;
  line-height: 36.4px;
}

.icon-success {
  display: block;
  margin: 0 auto 30px auto;
  width: 284px;
  height: 194px;
}

.egg-info {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #2e3141;
  letter-spacing: 0;
  text-align: center;
  line-height: 48px;
  .orange {
    color: #f05720;
  }
}
</style>
