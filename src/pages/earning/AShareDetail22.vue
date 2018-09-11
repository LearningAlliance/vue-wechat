<template>
  <div class="page" ref="page">
    <div ref="box" :class="['box', {'hidden': hideBox}]">
      <div class="info">
        <div class="avatar-box">
          <!-- <img ref="avatar" class="avatar" :src="userInfo.userHead || require('../../assets/images/icon_user_default.png')" crossOrigin="anonymous" /> -->
          <img ref="avatar" class="avatar" src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLoJTSB95niaeia0icfVUGTss1J0C2mWiaqhTfGc7DkWg6GAIktNvEtJjuRQJPv5yX8q6fia5HJgN9XNibQ/132" crossOrigin="anonymous" />
        </div>
        <div class="user-name">
          好友 <span class="underline">{{userInfo.userNick | formatName}}</span> 向你推荐
        </div>
      </div>
      <div class="box-2">
        <div class="area">
          <div class="shop-info">
            <div class="shop-logo">
              <img ref="logo" :src="shopInfo.shopLogo || require('../../assets/images/icon_shop_default.png')" crossOrigin="anonymous" />
            </div>
            <div class="shop-content">
              <div class="shop-name">肥宅快乐鸡西湖文化广场店</div>
              <div class="shop-area">西湖区</div>
            </div>
          </div>
          <div class="coupon-info clearfix">
            <div class="coupon-left">
              <div class="coupon-title">
                <span class="currency">￥</span>30
              </div>
              <div class="coupon-desc">满200可用</div>
            </div>
            <div class="coupon-right">
              <div class="coupon-title-2">店铺会员最高可享</div>
              <div class="coupon-desc-2">全场8折</div>
            </div>
          </div>
          <div class="code-box">
            <div id="qrcode" class="code" ref="qrcode"></div>
          </div>
          <div class="code-desc">扫码收藏该店可免费领取大额代金券！</div>
          <div class="save-btn">长按保存到手机</div>
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
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    // this.getShopDetail();
    this.qrySharePath();
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
      shopId: null,
      url: null,
      hideBox: false,
      shopInfo: {},
      userInfo: {},
    }
  },
  methods: {
    qrySharePath() {
      if (!this.shopId) {
        return;
      }
      api.earning.qrySharePath({
        shopId: this.shopId
      }).then((res) => {
        let { url = null, shopId, userId } = res.data;
        this.url = `http://cs.juanzisc.com/collection/shopDetail?shopId=${shopId}`;
        this.$nextTick(() => {
          this.qrCode();
        });
      }).catch((err) => {});
    },
    qrCode() {
      let { clientWidth, clientHeight } = this.$refs.qrcode;
      this.qrcode = new QRCode(this.$refs.qrcode, {
        text: this.url,
        width: clientWidth,
        height: clientHeight,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      var self = this;
      // this.queue([self.getUserInfo, self.avatarToBase64, self.logoToBase64, self.doHtml2Canvas])
      //   .then((res) => {
      //     // console.log('success');
      //     _.alert('success');
      //   }).catch((e) => {
      //     console.log('queue', e);
      //   });
      this.queue([self.getUserInfo, self.getShopDetail, self.doHtml2Canvas])
        .then((res) => {
          console.log('success');
        });
    },
    doHtml2Canvas() {
      var self = this;
      return new Promise((resolve) => {
        html2canvas(self.$refs.page, {
          useCORS: true,
        }).then(function(canvas) {
          self.hideBox = true;
          canvas.id = 'canvas';
          self.$refs.page.appendChild(canvas);
          self.canvas2Images(canvas);
          resolve();
        }).catch((err) => {
          console.log(err);
        });
      })
    },
    getUserInfo() {
      return new Promise((resolve) => {
        api.user.getUserInfo().then((res) => {
          let userInfo = res.data[0];
          this.userInfo = userInfo;
          this.$nextTick(() => {
            this.img2base64Two(this.$refs.avatar.src, 'Anonymous').then((res) => {
              this.$refs.avatar.src = res;
              resolve();
            }).catch((err) => {})
          })
        }).catch((err) => {
          console.log(err);
        });
      })
    },
    // avatarToBase64() {
    //   return new Promise((resolve) => {
    //     this.img2base64(this.$refs.avatar).then((res) => {
    //       // this.$refs.avatar.src = res;
    //       this.userInfo.userHead = res;
    //       this.$nextTick(() => {
    //         resolve();
    //       })
    //     }).catch((err) => {
    //       console.log(err);
    //     })
    //   })
    // },
    // logoToBase64() {
    //   return new Promise((resolve) => {
    //     this.img2base64(this.$refs.logo).then((res) => {
    //       // this.$refs.logo.src = res;
    //       this.shopInfo.logo = res;
    //       this.$nextTick(() => {
    //         resolve();
    //       })
    //     }).catch((err) => {
    //       console.log(err);
    //     })
    //   })
    // },
    async queue(arr) {
      let res = null
      for (let promise of arr) {
        res = await promise(res)
      }
      return await res
    },
    canvas2Images(canvas) {
      try {
        var image = new Image();
        // var canvas = document.getElementById('canvas');
        image.setAttribute('crossOrigin', 'anonymous');
        // image.crossOrigin = 'anonymous';
        image.src = canvas.toDataURL("image/png");
        image.style.width = '100%';
        image.style.height = '100%';
        canvas.style.display = 'none';
        this.$refs.page.appendChild(image);
      } catch (e) {
        console.log('canvas2Images', e);
      }
    },
    img2base64(el) {
      var url = el.src;
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const cxt = c.getContext('2d');
          cxt.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
          // 得到图片的base64编码数据
          resolve(c.toDataURL('image/png'));
        };
        img.setAttribute("crossOrigin", 'Anonymous'); // 防止画布污染
        // img.crossOrigin = 'anonymous';
        img.src = url;
      });
    },
    img2base64Two(url, crossOrigin) {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const cxt = c.getContext('2d');
          cxt.drawImage(img, 0, 0);
          // 得到图片的base64编码数据
          resolve(c.toDataURL('image/png'));
        };
        crossOrigin && img.setAttribute('crossOrigin', crossOrigin);
        img.src = url;
      });
    },
    // 查询商家详情
    getShopDetail() {
      return new Promise((resolve) => {
        api.collection.merShop({
          shopId: this.shopId,
        }).then((res) => {
          this.shopInfo = res.data[0];
          // this.shopInfo.shopLogo = 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLoJTSB95niaeia0icfVUGTss1J0C2mWiaqhTfGc7DkWg6GAIktNvEtJjuRQJPv5yX8q6fia5HJgN9XNibQ/132';
          this.$nextTick(() => {
            // this.img2base64Two(this.$refs.logo.src, 'Anonymous').then((res) => {
            this.img2base64Two(this.$refs.logo.src, 'Anonymous').then((res) => {
              this.$refs.logo.src = res;
              resolve();
            }).catch((err) => {})
          });
        }).catch((err) => {});
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
