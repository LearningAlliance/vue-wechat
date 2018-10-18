<template>
  <div class="page" ref="page">
    <div ref="box" :class="['box', {'hidden': hideBox}]">
      <div class="info">
        <div class="avatar-box">
          <!-- <img ref="avatar" class="avatar" :src="require('../../assets/images/icon_user_default.png')" crossOrigin="anonymous" /> -->
          <img ref="avatar" class="avatar" :src="userInfo.userHead || require('../../assets/images/icon_user_default.png')" crossOrigin="anonymous" />
          <!-- <img ref="avatar" class="avatar" src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLoJTSB95niaeia0icfVUGTss1J0C2mWiaqhTfGc7DkWg6GAIktNvEtJjuRQJPv5yX8q6fia5HJgN9XNibQ/132" crossOrigin="anonymous" /> -->
        </div>
        <div class="user-name">
          好友 <span class="underline">{{userInfo.userNick | formatName}}</span> 向你推荐
        </div>
      </div>
      <div class="box-2">
        <div class="area">
          <div class="shop-info">
            <div class="shop-logo">
              <!-- <img ref="logo" :src="require('../../assets/images/icon_shop_default.png')" crossOrigin="anonymous"/> -->
              <img ref="logo" :src="shopInfo.shopLogo || require('../../assets/images/icon_shop_default.png')" crossOrigin="anonymous" />
              <!-- <img ref="logo" :src="userInfo.userHead || require('../../assets/images/icon_shop_default.png')" crossOrigin="anonymous" /> -->
            </div>
            <div class="shop-content">
              <div class="shop-name">{{shopInfo.shopName}}</div>
              <div class="shop-area">{{shopInfo.tradingArea}}</div>
            </div>
          </div>
          <div class="coupon-info clearfix">
            <div class="coupon-left">
              <div class="coupon-title" v-if="!!shopInfo.collectCoupon">
                <span class="currency">￥</span>{{shopInfo.collectCoupon.couponPrice}}
              </div>
              <div class="coupon-title" v-if="!shopInfo.collectCoupon">
                <span class="currency"></span>敬请
              </div>
              <div class="coupon-desc" v-if="!!shopInfo.collectCoupon">满{{shopInfo.collectCoupon.couponLimit}}可用</div>
              <div class="coupon-desc" v-if="!shopInfo.collectCoupon">期待</div>
            </div>
            <div class="coupon-right">
              <div class="coupon-title-2">店铺会员最高可享</div>
              <div class="coupon-desc-2" v-if="vipInfo.hasOwnProperty('allmerLevelConfig')">全场{{discountInfo}}折</div>
              <div class="coupon-desc-2" v-if="!vipInfo.hasOwnProperty('allmerLevelConfig')">暂无</div>
            </div>
          </div>
          <div class="code-box">
            <div id="qrcode" class="code" ref="qrcode"></div>
          </div>
          <div class="code-desc">扫码收藏该店可免费领取大额代金券！</div>
          <div class="save-btn" @click="save">长按保存到手机</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import QRCode from 'qrcodejs2'
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import html2canvas from 'html2canvas';
export default {
  computed: {
    ...mapGetters([
      'userInfo',
    ])
  },
  mounted() {
    let parentUserId = localStorage.getItem('uid') || null;
    this.parentUserId = parentUserId;
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    // this.qrySharePath();
    // this.getShopDetail();
    // _.alert('queue start');
    // this.queue([this.qrySharePath, this.qrCode, this.getShopDetail, this.doHtml2Canvas])
    this.queue([this.qrySharePath, this.qrCode, this.getShopDetail, this.qryMerLevel])
      .then((res) => {
        this.$nextTick(() => {
          this.doHtml2Canvas();
        })
        console.log('success');
      }).catch((err) => {
        _.alert('queue', err);
      })
  },
  filters: {
    formatName(key) {
      if (!key) {
        return '';
      }
      if (key.length <= 4) {
        return key;
      } else {
        return key.substring(0, 4) + '...';
      }
    }
  },
  data() {
    return {
      parentUserId: null, // 分享人的id
      shopId: null,
      url: null,
      hideBox: false,
      shopInfo: {},
      vipInfo: {},
    }
  },
  methods: {
    save() {
      // _.alert('11111');
      // this.doHtml2Canvas();
    },
    // 查询商家详情
    getShopDetail() {
      return new Promise((resolve) => {
        api.collection.merShop({
          shopId: this.shopId,
        }).then((res) => {
          this.shopInfo = res.data[0];
          // this.$nextTick(() => {
          resolve();
          // });
        }).catch((err) => {});
      });
    },
    qrySharePath() {
      return new Promise((resolve, reject) => {
        if (!this.shopId) {
          reject('shopId is null');
        }
        api.earning.qrySharePath({
          shopId: this.shopId
        }).then((res) => {
          let { url = null, shopId, userId } = res.data;
          this.url = `http://cs.juanzisc.com/collection/shopDetail?shopId=${shopId}&parentUserId=${this.parentUserId}`;
          resolve();
        }).catch((err) => {});
      })
    },
    // 商铺会员等级信息
    qryMerLevel() {
      return new Promise((resolve, reject) => {
        api.collection.qryMerLevel({
          shopId: this.shopId,
        }).then((res) => {
          this.vipInfo = res.data[0];
          this.discountInfo = (this.vipInfo.hasOwnProperty('allmerLevelConfig') && this.vipInfo.allmerLevelConfig.length > 0) ? this.vipInfo.allmerLevelConfig[this.vipInfo.allmerLevelConfig.length - 1].levelRate : 10;
          resolve();
        }).catch((err) => {});
      })
    },
    qrCode() {
      return new Promise((resolve) => {
        let { clientWidth, clientHeight } = this.$refs.qrcode;
        this.qrcode = new QRCode(this.$refs.qrcode, {
          text: this.url,
          width: clientWidth,
          height: clientHeight,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
        console.log('qrCode');
        resolve();
      });

      // var self = this;
      // this.queue([self.doHtml2Canvas])
      //   .then((res) => {
      //     console.log('success');
      //   });
    },
    doHtml2Canvas() {
      var self = this;
      // return new Promise((resolve) => {
      self.img2base64(self.$refs.avatar.src).then((res) => {
        self.$refs.avatar.src = res;
        // _.alert('doHtml2Canvas');
        return self.img2base64(self.$refs.logo.src);
      }).then((res) => {
        self.$refs.logo.src = res;
        return self.html2canvas();
      }).then((canvas) => {
        self.canvas2Images(canvas);
        // _.alert('success');
        // resolve();
      });
      // });
    },
    html2canvas() {
      var self = this;
      return new Promise((resolve) => {
        html2canvas(this.$refs.page, {
          useCORS: true,
        }).then(function(canvas) {
          self.hideBox = true;
          canvas.id = 'canvas';
          self.$refs.page.appendChild(canvas);
          resolve(canvas);
        }).catch((err) => {
          console.log(err);
        });
      })
    },
    canvas2Images(canvas) {
      try {
        // _.alert('canvas2Images');
        var image = new Image();
        // var canvas = document.getElementById('canvas');
        image.setAttribute('crossOrigin', 'anonymous');
        // image.crossOrigin = 'anonymous';
        image.src = canvas.toDataURL("image/png");
        image.style.width = '100%';
        image.style.height = '100%';
        image.style.zIndex = 9999;
        // image.style.borderColor = '#fff';
        // image.style.borderWidth = '50px';
        // image.style.borderStyle = 'solid';
        canvas.style.display = 'none';
        this.$refs.page.appendChild(image);
      } catch (e) {
        // console.log('canvas2Images', e);
        // _.alert('canvas2Images');
      }
    },
    async queue(arr) {
      let res = null
      for (let promise of arr) {
        res = await promise(res)
      }
      return await res
    },
    img2base64(url) {
      return new Promise(resolve => {
        var img = new Image();
        img.onload = function() {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const cxt = c.getContext('2d');
          cxt.drawImage(img, 0, 0);
          // 得到图片的base64编码数据
          resolve(c.toDataURL('image/png'));
        };
        img.crossOrigin = 'anonymous';
        img.src = url;
      });
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%; // overflow: hidden;
}

.underline {
  text-decoration: underline;
}

.box {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: url('../../assets/images/bg_share_1.png');
  &.hidden {
    display: none;
  }
  .box-2 {
    width: 670px;
    height: 940px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/bg_share_2.png');
    margin: 0 auto;
    position: relative;
    .area {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 630px;
      height: 900px;
      .code-box {
        margin: 0 auto;
        margin-top: 100px;
        width: 170px;
        height: 170px;
        .code {
          width: 100%;
          height: 100%;
        }
      }
      .code-desc {
        margin-top: 30px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: center;
        line-height: 31.2px;
      }
      .save-btn {
        margin: 0 auto;
        margin-top: 40px;
        width: 260px;
        height: 50px;
        border: 2px solid #F05720;
        border-radius: 25px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #F05720;
        letter-spacing: 0;
        text-align: center;
        line-height: 50px;
      }
      .coupon-info {
        margin: 0 auto;
        margin-top: 60px;
        width: 550px;
        height: 200px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/bg_share_3.png');
        border-radius: 9.57px;
        .coupon-left,
        .coupon-right {
          width: 50%;
          display: inline-block;
          float: left;
        }
        .coupon-title-2 {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #2E3141;
          letter-spacing: 0;
          text-align: center;
          line-height: 31.2px;
          margin-top: 55px;
        }
        .coupon-desc-2 {
          margin-top: 10.8px;
          font-family: PingFangSC-Medium;
          font-size: 42px;
          color: #2E3141;
          letter-spacing: 0;
          text-align: center;
          line-height: 46.8px;
        }
        .coupon-title {
          margin-top: 48px;
          text-align: center;
          font-family: PingFangSC-Medium;
          font-size: 72px;
          color: #FFF;
          letter-spacing: 0;
          text-align: center;
          line-height: 62.4px;
          .currency {
            font-size: 32px;
          }
        }
        .coupon-desc {
          margin-top: 10px;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #FFFFFF;
          letter-spacing: 0;
          line-height: 31.2px;
          text-align: center;
        }
      }
      .shop-info {
        width: 100%;
        height: 100px;
        padding-left: 170px;
        padding-right: 40px;
        box-sizing: border-box;
        margin-top: 60px;
        position: relative;
        .shop-logo {
          position: absolute;
          top: 0;
          left: 40px;
          width: 100px;
          height: 100px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .shop-content {
          width: 100%;
          height: 100%;
          .shop-name {
            font-family: PingFangSC-Semibold;
            font-size: 32px;
            color: #2E3141;
            line-height: 41.6px;
          }
          .shop-area {
            margin-top: 20px;
            opacity: 0.8;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #818B8F;
            line-height: 31.2px;
          }
        }
      }
    }
  }
  .info {
    width: 100%;
    height: 130px;
    margin: 0 auto;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 40px;
    padding-bottom: 10px;
    text-align: center;
    position: relative;
    .avatar-box {
      width: 35%;
      height: 80px;
      position: absolute;
      top: 40px;
      left: 0;
      text-align: right;
      .avatar {
        display: inline-block;
        border-radius: 80px;
        overflow: hidden;
        width: 80px;
        height: 80px;
      }
    }

    .user-name {
      box-sizing: border-box;
      width: 100%;
      padding-left: 35%;
      display: inline-block;
      height: 80px;
      font-family: PingFangSC-Medium;
      font-size: 28px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 80px;
      text-align: left;
      text-indent: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

</style>
