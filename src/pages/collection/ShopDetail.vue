<!-- 店铺详情 -->
<template>
  <div class="page">
    <div class="modal" v-show="showModal" @click.stop="hideModal"></div>
    <div class="info-box with-shadow" v-show="showModal">
      <div class="info-box-cancel" @click.stop="hideModal"></div>
      <div class="info-header">是否收藏该店？</div>
      <div class="info-content">首次收藏该店将获得500元代金券</div>
      <div class="info-extra">
        <div :class="['extra-text', {'select-yes': subscribe, 'select-no': !subscribe}]" @click.stop="toggleSubscribe">订阅该店个性化优惠信息</div>
      </div>
      <div class="info-footer">
        <div class="info-btn" @click.stop="doCollect">确定收藏</div>
      </div>
    </div>
    <div class="top-bar clearfix">
      <i class="icon icon-back" @click="toBack"></i>
      <i class="icon icon-home" @click="toHome"></i>
      <!--             <span class="top-bar-desc" @click="userFollow(collectInfo.isFollow)">{{collectInfo.hasOwnProperty('isFollow') && collectInfo.isFollow == '1' ? '已特别关注' : '未特别关注'}}</span>
      <i :class="['icon-attention', {'no': !(collectInfo.hasOwnProperty('isFollow') && collectInfo.isFollow == '1')}]" @click="userFollow(collectInfo.isFollow)"></i> -->
      <span class="top-bar-desc">{{collectInfo.hasOwnProperty('state') && collectInfo.state == 1 ? '已特别关注' : '未特别关注'}}</span>
      <i :class="['icon-attention', {'no': !(collectInfo.hasOwnProperty('state') && collectInfo.state == 1)}]"></i>
    </div>
    <div class="height-100"></div>
    <div class="section-1">
      <div class="cell">
        <div class="cell-left">
          <div class="shop-name">{{shopInfo.shopName}}</div>
          <div class="score-box clearfix">
            <div class="star clearfix">
              <div v-for="(item, index) in stars" :class="['star-item', item]" track-by="index"></div>
            </div>
            <span class="score">综合{{shopInfo.score}}分</span>
          </div>
        </div>
        <div class="collect-btn" @click="collectShop(collectInfo.state)">{{collectInfo.hasOwnProperty('state') && collectInfo.state == 1 ? '取消收藏' : '收藏店铺'}}</div>
      </div>
      <div class="other-info clearfix">
        <div class="avg-consume" v-show="!!shopInfo.avgConsume">人均消费 {{shopInfo.avgConsume}}元</div>
        <div class="collect-coupon" v-show="!!shopInfo.collectCoupon">
          <div class="text-1" v-show="shopInfo.collectCoupon.hasOwnProperty('couponPrice')">新客到店收藏领{{shopInfo.collectCoupon.couponPrice || ''}}元券</div>
          <div class="text-2" v-show="shopInfo.collectCoupon.hasOwnProperty('couponLimit')">(满{{shopInfo.collectCoupon.couponLimit || ''}}元可用)</div>
        </div>
      </div>
    </div>
    <div class="section-2 clearfix">
      <div class="cell first" v-if="!!shopInfo.shopVideo">
        视频
      </div>
      <div class="cell" v-if="!!shopInfo.mainImgUrl">
        <img class="image" :src="shopInfo.mainImgUrl" />
      </div>
      <!-- TODO -->
      <!--       <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div> -->
      <div class="cell-blank"></div>
    </div>
    <div class="line-box">
      <div class="line"></div>
    </div>
    <div class="section-3">
      <i class="icon-address"></i>
      <div class="shop-info">
        <div class="shop-address" @click="openLocation">{{shopInfo.shopAddress}}</div>
        <div class="shop-distance">距您{{shopInfo.distance | formatDistance}}</div>
      </div>
      <div class="line"></div>
      <i class="icon-tel" @click="makePhone(shopInfo.shopTel)"></i>
    </div>
    <!-- TODO 缺少数据 -->
    <div class="section-4">
      <i class="icon-buy"></i>
      <div class="section-content">
        <div class="cell-header clearfix">
          <div class="title">买单</div>
          <div class="desc">返10%养老保障金</div>
        </div>
        <div class="cell-info">
          <div class="desc no-top">满100元立减5元 (周一至周五)</div>
          <div class="desc">满100元送小猪佩奇 (周一至周五)</div>
        </div>
      </div>
      <div class="btn" @click="payTheBill">买单</div>
    </div>
    <div class="section-4" v-if="eggNum > 0">
      <i class="icon-egg"></i>
      <div class="section-content">
        <div class="cell-header clearfix">
          <div class="title">本店有彩蛋<span class="orange">{{eggNum}}</span>个 </div>
        </div>
        <div class="cell-info">
          <div class="desc no-top">在该店内有效范围内开启</div>
        </div>
      </div>
      <div class="btn" @click="openEgg">开蛋</div>
      <div class="btn-desc">打开有惊喜</div>
    </div>
    <div class="vip-card" @click="toShopVipInfo" v-if="!!vipInfo.merLevelConfig.levelName">
      <div class="header">
        <div class="level">{{(vipInfo.merLevelConfig.levelName || '').toUpperCase()}}</div>
        <div class="shop-name">{{shopInfo.shopName}}</div>
      </div>
      <div class="cell-1">
        <div class="title">当前VIP权益</div>
        <div class="desc">{{vipInfo.merLevelConfig.levelDesc}}</div>
      </div>
      <div class="cell-2">
        <div class="title">{{(vipInfo.merLevelConfig.upgradeAmount || 0) | formatPrice}}元后升级可享</div>
        <div class="desc">{{vipInfo.nextmerLevelConfig.levelDesc}}</div>
      </div>
    </div>
    <div class="section-5" v-show="couponList.length > 0">
      <div class="header clearfix">
        <i class="icon-coupon"></i>
        <div class="title">优惠</div>
        <div class="desc" v-if="!!shopInfo.pensionRate">返{{shopInfo.pensionRate * 100}}%养老保障金</div>
      </div>
      <div class="blank"></div>
      <div class="list">
        <div :class="['cell', {'no-border': couponList.length - 1 == index}]" v-for="(item, index) in couponList" :key="'coupon' + index">
          <div class="coupon-img">
            <img :src="item.couponImg" />
          </div>
          <div class="cell-content">
            <div class="cell-shop-name">{{shopInfo.shopName}}</div>
            <div class="price">
              <span class="buy-price">{{item.buyPrice | formatPrice}}</span>
              <span class="coupon-price">{{item.couponPrice | formatPrice}}</span>
              <span class="discount">{{(item.buyPrice/item.couponPrice * 10).toFixed(1)}}折扣</span>
            </div>
            <div class="buy-btn" @click="buyCoupon(item.couponId)">购买</div>
            <div class="buy-num">{{item.couponNum - item.surplusNum}}人买过</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-6" v-if="commentList.length > 0">
      <div class="section-6-title">评论</div>
      <div class="comment-list" v-for="(item, index) in commentList" :key="'comment' + index" @click="toCommentDetail(item.commentId)">
        <!-- <div :class="['cell', {'no-border': commentList.length - 1 == index}]"> -->
        <div class="cell">
          <div class="avatar">
            <img :src="item.userHead || require('../../assets/images/icon_user_default.png')" />
          </div>
          <div class="header">
            <div class="user-nick">{{item.userNick}}</div>
            <div class="avg-consume">消费{{item.avgConsume}}元</div>
          </div>
          <div class="create-date">{{item.createDate}}</div>
          <div class="comment-content">{{item.commentContent}}</div>
          <div class="comment-imgs clearfix" v-if="item.hasOwnProperty('commentImgsList') && item.commentImgsList.length > 0">
            <div :class="['img', {'no-right': index2 % 3 == 2}]" v-for="(item2, index2) in item.commentImgsList" :key="'comment' + index + '_img' + index2" v-if="index2 < 3">
              <img :src="item2" />
            </div>
          </div>
          <div class="reply-box clearfix">
            <div class="reply-count">{{item.replyCount}}</div>
            <i class="icon-reply"></i>
          </div>
        </div>
      </div>
      <div class="comment-more" @click="toCommentList">
        <div class="more-text">查看全部({{commentCount}})</div>
      </div>
    </div>
    <div class="section-7"></div>
    <div class="footer clearfix">
      <div class="center-line"></div>
      <div class="footer-left" @click="toShare">
        <div class="footer-btn share">分享推荐</div>
      </div>
      <div class="footer-right" @click="putEgg">
        <div class="footer-btn put-egg">放置彩蛋</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import {
  MessageBox,
} from 'mint-ui';
export default {
  data() {
    return {
      shopId: null,
      shopInfo: {
        collectCoupon: {}
      },
      eggNum: 0, // 彩蛋数量
      stars: ['off', 'off', 'off', 'off', 'off'], // 评分列表
      vipInfo: {
        merLevelConfig: "",
        nextmerLevelConfig: "",
      },
      couponList: [],
      commentList: [],
      commentCount: 0, //  店铺评论总数
      collectInfo: {}, // 店铺收藏信息
      showModal: false, // 显示收藏的遮罩
      subscribe: false, // 是否订阅
    }
  },
  computed: {
    ...mapGetters([
      'longitude',
      'latitude',
    ]),
    getLocationOver() {
      return !!this.longitude && !!this.latitude;
    },
  },
  watch: {
    getLocationOver(val, oldVal) {
      if (val) {
        this.getShopDetail();
      }
    },
  },
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    if (!!this.longitude && !!this.latitude) {
      this.getShopDetail();
    }
    // 彩蛋数量 商家详情里有返回了
    // this.qrySysZoneCount();
    this.qryMerLevel();
    this.qryShopCoupon();
    this.qryShopComments();
    this.qryUserCollect();
  },
  methods: {
    // 查询商家详情
    getShopDetail() {
      api.collection.merShop({
        shopId: this.shopId,
        shopLon: this.longitude.toString(),
        shopLat: this.latitude.toString(),
      }).then((res) => {
        // let obj = {
        //   couponPrice: 200,
        //   couponLimit: 2000,
        // }
        // res.data[0].collectCoupon = obj; 
        this.shopInfo = res.data[0];
        let score = res.data[0].score;
        this.eggNum = res.data[0].zoneCount;
        this.stars = this.setStars(score);
      }).catch((err) => {});
    },
    // 商家彩蛋数量
    qrySysZoneCount() {
      api.collection.qrySysZoneCount({
        shopId: this.shopId,
        type: '2',
      }).then((res) => {
        let num = 0;
        let list = res.data;
        list.forEach((obj) => {
          if (obj.hasOwnProperty('type') && obj.type == '2') {
            num = obj.num;
          }
        })
        this.eggNum = num;
      }).catch((err) => {});
    },
    // 商铺会员等级信息
    qryMerLevel() {
      api.collection.qryMerLevel({
        shopId: this.shopId,
      }).then((res) => {
        this.vipInfo = res.data[0];
      }).catch((err) => {});
    },
    // 根据类型查询店铺优惠劵列表
    qryShopCoupon() {
      api.collection.qryShopCoupon({
        shopId: this.shopId,
        couponType: '3',
      }).then((res) => {
        this.couponList = res.data;
      }).catch((err) => {});
    },
    // 店铺评论和回复列表
    qryShopComments() {
      api.collection.qryShopComments({
        pageNum: 1,
        pageRow: 10,
        shopId: this.shopId,
        parentCommentId: -1,
      }).then((res) => {
        let list = res.data[0];
        this.commentCount = list.commentCount || 0;
        if (list.commentCount > 0) {
          let comment = list.comment;
          comment.forEach((obj) => {
            if (!!obj.commentImgs) {
              obj.commentImgsList = obj.commentImgs.split(',');
            } else {
              obj.commentImgsList = [];
            }
          })
          this.commentList = comment;
        }
      }).catch((err) => {});
    },
    // 根据用户id和店铺id查询收藏信息
    qryUserCollect() {
      api.collection.qryUserCollect({
        shopId: this.shopId
      }).then((res) => {
        this.collectInfo = res.data[0];
      }).catch((err) => {});
    },
    openLocation() {
      const wx = this.$wechat;
      var self = this;
      wx.openLocation({
        latitude: self.shopInfo.shopLat, // 纬度，浮点数，范围为90 ~ -90
        longitude: self.shopInfo.shopLon, // 经度，浮点数，范围为180 ~ -180。
        name: self.shopInfo.shopName, // 位置名
        address: self.shopInfo.shopAddress, // 地址详情说明
        scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
    setStars(sc) {
      if (typeof(sc) == 'string') {
        sc = Number(sc);
      }
      let result = [];
      let score = sc * 10;
      let integer = Math.floor(score / 10);
      if (integer >= 5) {
        integer = 5;
      }
      let hasDecimal = (score % 10 < 10) && (score % 10 > 0);
      for (let i = 0; i < integer; i++) {
        result.push("on");
      }
      if (hasDecimal) {
        result.push("half");
      }
      while (result.length < 5) {
        result.push("off");
      }
      return result;
    },
    toBack() {
      this.$router.history.go(-1);
    },
    toHome() {
      this.$router.push({
        path: '/collection',
      });
    },
    makePhone(tel) {
      window.location.href = `tel:${tel}`;
    },
    toShopVipInfo() {
      this.$router.push({
        path: '/collection/shopVipInfo',
        query: {
          shopId: this.shopId,
        },
      });
    },
    buyCoupon(couponId) {
      this.$router.push({
        path: '/collection/couponDetail',
        query: {
          couponId,
        }
      });
    },
    payTheBill() {
      console.log('TODO 买单');
      this.$router.push({
        path: '/collection/payTheBill',
      });
    },
    toShare() {
      _.alert('分享推荐');
    },
    putEgg() {
      this.$router.push({
        path: '/collection/shopEggList',
        query: {
          shopId: this.shopId,
        },
      });
    },
    toCommentList() {
      this.$router.push({
        path: '/collection/commentList',
        query: {
          shopId: this.shopId,
        },
      });
    },
    openEgg() {
      this.$router.push({
        path: '/collection/shopEggList',
        query: {
          shopId: this.shopId,
        },
      });
    },
    collectShop(status) {
      let follow = null;
      if (status == 0 || status == undefined) {
        follow = 1
      } else if (status == 1) {
        follow = 0;
      } else {
        follow = 1;
      }

      if (follow == 1) { // 收藏
        this.showModal = true;
      } else if (follow == 0) {
        // 取消收藏
        MessageBox.confirm('是否取消收藏店铺').then(action => {
          if (action) {
            api.collection.unUserCollect({
              shopId: this.shopId,
            }).then((res) => {
              this.$set(this.collectInfo, 'state', 0);
            }).catch((err) => {
              this.$set(this.collectInfo, 'state', 0)
            });
          }
        }).catch((err) => {

        });
      }
    },
    toCommentDetail(commentId) {
      this.$router.push({
        path: '/collection/commentDetail',
        query: {
          shopId: this.shopId,
          commentId,
        }
      })
    },
    userFollow(status) {
      MessageBox.confirm('是否关注/取消关注店铺').then(action => {
        if (action) {
          let follow = null;
          if (status == 0 || status == undefined) {
            follow = 1
          } else if (status == 1) {
            follow = 0;
          } else {
            follow = 1;
          }
          let collectInfo = this.collectInfo;

          api.collection.userFollow({
            shopId: this.shopId,
            isFollow: follow,
          }).then((res) => {
            this.$set(this.collectInfo, 'isFollow', follow);
          }).catch((err) => {});
        }
      }).catch((err) => {

      });
    },
    hideModal() {
      console.log('hideModal');
      this.showModal = false;
    },
    toggleSubscribe() {
      this.subscribe = !this.subscribe;
    },
    doCollect() {
      if (!this.subscribe) {
        _.alert('请先订阅完成收藏');
        return;
      }
      this.doCollectShop(this.collectInfo.state);
    },
    doCollectShop(status) {
      let follow = null;
      if (status == 0 || status == undefined) {
        follow = 1
      } else if (status == 1) {
        follow = 0;
      } else {
        follow = 1;
      }
      let collectInfo = this.collectInfo;
      api.collection.toUserCollect({
        shopId: this.shopId,
      }).then((res) => {
        this.$set(collectInfo, 'state', follow);
        console.log('toUserCollect', res);
        api.collection.userFollow({
          shopId: this.shopId,
          isFollow: follow,
        }).then((res) => {
          this.showModal = false;
          this.$set(this.collectInfo, 'isFollow', follow);

          // api.collection.userFollow({
          //   shopId: this.shopId,
          //   isFollow: 1,
          // }).then((res) => {
          //   console.log('userFollow', res);
          // }).catch((err) => {});

        }).catch((err) => {});
      }).catch((err) => {});
    }
  },
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background: #F8F8FC;
}

.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
}

.info-box {
  position: fixed;
  width: 690px;
  height: 320px;
  top: 50%;
  left: 50%;
  margin-top: -160px;
  margin-left: -345px;
  background: #FFF;
  border-radius: 25px;
  box-sizing: border-box;
  padding: 40px 20px;
  color: #000;
  text-align: center;
  z-index: 999;
  .info-box-cancel {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 20px;
    right: 20px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_cancel.png');
  }
  .info-header {
    font-size: 40px;
    text-align: center;
  }
  .info-content {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 32px;
    text-align: center;
  }
  .info-extra {
    font-size: 30px;
    height: 40px;
    line-height: 40px;
    color: #818B8F;
    text-align: center;
    .extra-text {
      position: relative;
      display: inline-block;
      text-indent: 50px;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      &.select-yes::before {
        background-image: url('../../assets/images/icon_select_yes.png');
      }
      &.select-no::before {
        background-image: url('../../assets/images/icon_select_no.png');
      }
    }
  }
  .info-footer {
    margin-top: 20px;
    .info-btn {
      display: inline-block;
      padding: 12px 25px;
      height: 40px;
      line-height: 40px;
      font-size: 32px;
      border-radius: 34px;
      border: 1px solid #C4CACD;
      /*no*/
    }
  }
}

.footer {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: #FFF;
  border-top: 1px solid #F8F8FC;
  /*no*/
  .center-line {
    position: absolute;
    width: 2px;
    height: 50px;
    background: #C4CACD;
    top: 50%;
    left: 50%;
    margin-top: -25px;
    margin-left: -1px;
  }
  .footer-left,
  .footer-right {
    width: 50%;
    height: 100%;
    float: left;
    display: inline-block;
    text-align: center;
    .footer-btn {
      position: relative;
      margin: 0 auto;
      display: inline-block;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 120px;
      text-align: center;
      &::before {
        content: '';
        display: inline-block;
        width: 50px;
        height: 50px;
        position: absolute;
        top: 35px;
        left: -70px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      &::after {
        content: '';
        display: inline-block;
        width: 50px;
        height: 30px;
        position: absolute;
        top: 30px;
        right: -60px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      &.share::before {
        background-image: url('../../assets/images/ic_store_share.png');
      }
      &.share::after {
        background-image: url('../../assets/images/img_youli.png');
      }
      &.put-egg::before {
        background-image: url('../../assets/images/ic_store_setegg.png');
      }
      &.put-egg::after {
        background-image: url('../../assets/images/img_cool.png');
      }
    }
  }
}

.section-7 {
  width: 100%;
  height: 140px;
}

.section-6 {
  width: 100%;
  padding: 30px 30px 0 30px;
  box-sizing: border-box;
  margin-top: 20px;
  background: #fff;
  .comment-more {
    width: 100%;
    text-align: center;
    .more-text {
      display: inline-block;
      margin: 0 auto;
      position: relative;
      height: 88px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 88px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        width: 50px;
        height: 50px;
        top: 19px;
        right: -50px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/ic_back_right@2x.png');
      }
    }
  }
  .section-6-title {
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
  }
  .cell {
    margin-top: 30px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 100px;
    padding-bottom: 30px;
    position: relative;
    border-bottom: 1px solid #E2E2E2;
    /*no*/
    .reply-box {
      width: 100%;
      margin-top: 30px;
      height: 40px;
      .reply-count {
        display: inline-block;
        float: right;
        height: 40px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        text-align: right;
        line-height: 40px;
        margin-left: 12px;
      }
      .icon-reply {
        display: inline-block;
        float: right;
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/icon_reply_count.png');
      }
    }
    &.no-border {
      border: none;
    }
    .comment-imgs {
      margin-top: 30px;
      .img {
        display: inline-block;
        margin-right: 25px;
        float: left;
        width: 180px;
        height: 180px;
        &.no-right {
          margin-right: 0;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .comment-content {
      margin-top: 21px;
      width: 100%;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: justify;
      line-height: 36px;
    }
    .avatar {
      width: 80px;
      height: 80px;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 80px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .create-date {
      position: absolute;
      top: 0;
      right: 0;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #818B8F;
      letter-spacing: 0;
      text-align: right;
      line-height: 31.2px;
    }
    .header {
      width: 100%;
      box-sizing: border-box;
      padding-right: 140px;
      .user-nick {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 41.6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .avg-consume {
        margin-top: 7.4px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 31.2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.section-5 {
  margin-top: 20px;
  width: 100%;
  background: #FFF;
  box-sizing: border-box;
  padding-left: 30px;
  padding-top: 35px;
  padding-right: 30px;
  .list {
    width: 100%;
    background: #FFF;
    .cell {
      width: 100%;
      height: 160px;
      box-sizing: border-box;
      padding-top: 30px;
      padding-left: 120px;
      padding-right: 160px;
      position: relative;
      border-bottom: 1px solid #E2E2E2;
      /*no*/
      .buy-btn {
        position: absolute;
        top: 30px;
        right: 0;
        width: 140px;
        height: 50px;
        box-sizing: border-box;
        border: 3px solid #F05720;
        border-radius: 34px;
        font-family: PingFangSC-Semibold;
        font-size: 28px;
        color: #F05720;
        letter-spacing: 0;
        text-align: center;
        line-height: 44px;
      }
      .buy-num {
        position: absolute;
        top: 96px;
        right: 0;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: right;
        line-height: 31.2px;
      }
      &.no-border {
        border: none;
      }
      .coupon-img {
        position: absolute;
        top: 30px;
        left: 0;
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cell-content {
        width: 100%;
        .cell-shop-name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #2E3141;
          letter-spacing: 0;
          line-height: 41.6px;
        }
        .price {
          margin-top: 19.4px;
          width: 100%;
          height: 36.4px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-family: PingFangSC-Semibold;
          font-size: 32px;
          color: #F05720;
          letter-spacing: 0;
          line-height: 36.4px;
          .buy-price {}
          .coupon-price {
            font-family: PingFangSC-Regular;
            font-size: 28px;
            color: #2E3141;
            letter-spacing: 0;
            line-height: 36.4px;
            text-decoration: line-through;
          }
          .discount {
            display: inline-block;
            height: 36.4px;
            font-family: PingFangSC-Regular;
            font-size: 22px;
            color: #FFFFFF;
            letter-spacing: -0.53px;
            text-align: center;
            line-height: 36.4px;
            background: #F05720;
            padding-left: 5px;
            padding-right: 5px;
          }
        }
      }
    }
  }
  .blank {
    width: 100%;
    height: 19px;
    background: #FFF;
  }
  .header {
    width: 100%;
    padding-left: 60px;
    height: 40px;
    box-sizing: border-box;
    position: relative;
    .icon-coupon {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../assets/images/ic_store_cheap.png');
    }
    .title {
      display: inline-block;
      float: left;

      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 40px;
    }
    .desc {
      display: inline-block;
      float: left;
      margin-left: 10px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #F05720;
      letter-spacing: 0;
      line-height: 40px;
    }
  }
}

.vip-card {
  margin: 30px auto 10px auto;
  width: 690px;
  height: 320px;
  box-sizing: border-box;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/icon_store_vip_bg.png');
  .header {
    width: 100%;
    height: 47px;
    position: relative;
    .level {
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 47px;
      font-family: PingFangSC-Semibold;
      font-size: 36px;
      color: #ECD9B7;
      letter-spacing: 0;
      text-align: center;
      line-height: 47px;
    }
    .shop-name {
      width: 100%;
      height: 47px;
      box-sizing: border-box;
      padding-left: 100px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #ECD9B7;
      letter-spacing: 0;
      text-align: right;
      line-height: 47px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .cell-1 {
    margin-top: 30px;
  }
  .cell-2 {
    margin-top: 20.8px;
  }
  .title {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #ECD9B7;
    letter-spacing: 0;
    line-height: 36.4px;
  }
  .desc {
    margin-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #AEA189;
    letter-spacing: 0;
    line-height: 31.2px;
  }
}

.section-4 {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #FFF;
  margin-top: 20px;
  position: relative;
  .btn-desc {
    position: absolute;
    width: 140px;
    height: 31.2px;
    right: 30px;
    top: 108px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #818B8F;
    letter-spacing: 0;
    text-align: center;
    line-height: 31.2px;
  }
  .btn {
    width: 140px;
    height: 68px;
    background: #F05720;
    border-radius: 34px;
    font-family: PingFangSC-Semibold;
    font-size: 32px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 68px;
    box-sizing: border-box;
    position: absolute;
    top: 30px;
    right: 30px;
  }
  .icon-buy {
    position: absolute;
    top: 34px;
    left: 30px;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_store_buy.png');
  }
  .icon-egg {
    position: absolute;
    top: 34px;
    left: 30px;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_store_egg.png');
  }
  .section-content {
    width: 100%;
    box-sizing: border-box;
    padding-left: 60px;
    padding-right: 170px;
    .cell-header {
      width: 100%;
      height: 41.6px;
      .title {
        float: left;
        display: inline-block;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 41.6px;
        .orange {
          color: #F05720;
        }
      }
      .desc {
        margin-left: 10px;
        float: left;
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #F05720;
        letter-spacing: 0;
        line-height: 41.6px;
      }
    }
    .cell-info {
      width: 100%;
      margin-top: 22.4px;
      .desc {
        margin-top: 10.8px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 31.2px;
        &.no-top {
          margin-top: 0;
        }
      }
    }
  }
}

.section-3 {
  width: 100%; // height: 139px;
  box-sizing: border-box;
  padding: 30px;
  background: #FFF;
  position: relative;
  min-height: 139px;
  .line {
    position: absolute;
    background: #E2E2E2;
    width: 1px;
    /*no*/
    height: 50px;
    top: 44px;
    right: 140px;
  }
  .icon-tel {
    position: absolute;
    top: 49px;
    right: 50px;
    display: block;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_store_phone.png');
  }
  .icon-address {
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    top: 30px;
    let: 30px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_store_location.png');
  }
  .shop-info {
    width: 100%;
    box-sizing: border-box;
    padding-right: 140px;
    padding-left: 60px;
    .shop-address {
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 41.6px;
    }
    .shop-distance {
      margin-top: 5.4px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #818B8F;
      letter-spacing: 0;
      line-height: 31.2px;
    }
  }
}

.line-box {
  width: 100%;
  height: 1px;
  /*no*/
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  .line {
    width: 100%;
    height: 100%;
    background: #E2E2E2;
  }
}

.section-2 {
  width: 100%;
  height: 226px;
  background: #FFF;
  box-sizing: border-box;
  padding-top: 30px;
  padding-bottom: 50px;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  display: box;
  display: -webkit-box;
  background: #FFF;
  .cell {
    width: 180px;
    height: 146px;
    margin-left: 10px;
    margin-right: 10px;
    background: #F8F8FC;
    box-sizing: border-box;
    border-radius: 12px;
    overflow: hidden;
    &.first {
      margin-left: 30px;
    }
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .cell-blank {
    width: 30px;
    height: 100%;
    background: #FFF;
  }
}

.section-1 {
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  background: #FFF;
  .other-info {
    margin-top: 30px;
    height: 77px;
    .avg-consume {
      display: inline-block;
      float: left;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
    }
    .collect-coupon {
      display: inline-block;
      float: right;
      .text-1 {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        text-align: right;
      }
      .text-2 {
        margin-top: 9.4px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: right;
        line-height: 31.2px;
      }
    }
  }
  .cell {
    width: 100%;
    min-height: 68px;
    position: relative;
    box-sizing: border-box;
    padding-right: 230px;
    .cell-left {
      .shop-name {
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #2E3141;
        line-height: 41.6px;
      }
      .score-box {
        width: 100%;
        margin-top: 11.4px;
        height: 40px;
        .star {
          display: inline-block;
          float: left;
          width: 200px;
          height: 40px;
          .star-item {
            display: inline-block;
            float: left;
            width: 40px;
            height: 40px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &.on {
              background-image: url('../../assets/images/ic_rate.png');
            }
            &.half {
              background-image: url('../../assets/images/ic_rate_halfgrey.png');
            }
            &.off {
              background-image: url('../../assets/images/ic_rate_grey.png');
            }
          }
        }
        .score {
          display: inline-block;
          float: left;
          margin-left: 20px;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #2E3141;
          letter-spacing: 0;
          line-height: 40px;
        }
      }
    }
    .collect-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 68px;
      box-sizing: border-box;
      border: 1px solid #C4CACD;
      /*no*/
      border-radius: 34px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 66px;
    }
  }
}

.height-100 {
  width: 100%;
  height: 100px;
  background: #FFF;
}

.top-bar {
  width: 100%;
  height: 100px;
  background: #FFF;
  box-sizing: border-box;
  padding: 25px 20px 25px 31px;
  display: block;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  .icon {
    display: inline-block;
    float: left;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.icon-back {
      width: 50px;
      height: 50px;
      background-image: url('../../assets/images/ic_back@2x.png');
    }
    &.icon-home {
      position: absolute;
      top: 50%;
      margin-top: -19px;
      left: 80px;
      width: 38px;
      height: 34px;
      background-image: url('../../assets/images/icon_home.png');
    }
  }
  .icon-attention {
    // background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    display: inline-block;
    position: absolute;
    width: 50px;
    height: 50px;
    top: 25px;
    right: 20px;
    background-color: #F8F8FC;
    border-radius: 100px;
    overflow: hidden;
    background-image: url('../../assets/images/ic_like.png');
    &.no {
      background-image: url('../../assets/images/ic_like_grey.png');
    }
  }
  .top-bar-desc {
    height: 100%;
    margin-right: 90px;
    float: right;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: right;
    line-height: 50px;
  }
}

</style>
