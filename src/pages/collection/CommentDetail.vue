<template>
  <div class="page" @scroll="handleScroll">
    <div class="section-6" v-for="(item, index) in commentInfo" :key="'comment' + index">
      <div class="comment-list">
        <!-- <div :class="['cell', {'no-border': commentList.length - 1 == index}]"> -->
        <div class="cell">
          <div class="avatar">
            <img :src="item.userHead || require('../../assets/images/icon_user_default.png')" />
          </div>
          <div class="header">
            <div class="user-nick">{{item.userNick}}</div>
            <div class="avg-consume">消费{{item.avgConsume}}元</div>
          </div>
          <div class="create-date">{{item.createDate.slice(0, 10)}}</div>
          <div class="comment-content">{{item.commentContent}}</div>
          <div class="comment-imgs clearfix" v-if="item.hasOwnProperty('commentImgsList') && item.commentImgsList.length > 0">
            <div :class="['img', {'no-right': index2 % 3 == 2}]" v-for="(item2, index2) in item.commentImgsList" :key="'comment' + index + '_img' + index2" v-if="index2 < 3" @click="preview(index2)">
              <img :src="item2" />
            </div>
          </div>
          <div class="reply-box clearfix">
            <!-- <div class="reply-count">{{item.replyCount}}</div> -->
            <!-- <i class="icon-reply"></i> -->
          </div>
        </div>
        <div class="shop-card" v-if="!!shopId">
          <div class="card-logo">
            <img :src="shopInfo.shopLogo || require('../../assets/images/icon_shop_default.png')" />
          </div>
          <div class="card-content" @click="toShopDetail">
            <div class="shop-name ellipsis">{{shopInfo.shopName || ''}}</div>
            <div class="shop-area ellipsis">{{shopInfo.tradingArea || ''}}</div>
          </div>
          <div class="card-distance">距{{shopInfo.distance | formatDistance}}</div>
        </div>
      </div>
    </div>
    <div class="my-blank"></div>
    <div class="sub-title" v-show="commentCount">评价 <span class="text-num">({{commentCount}})</span></div>
    <div class="section">
      <div class="cell" v-for="(item, index) in subCommnentList" :key="'subCommnent' + index">
        <div class="create-time">{{item.createDate.slice(0, 10)}}</div>
        <div class="avatar">
          <img :src="item.userHead || require('../../assets/images/icon_user_default.png')" />
        </div>
        <div class="header">{{item.userNick}}</div>
        <div class="comment-content">{{item.commentContent}}</div>
        <div class="line-box" v-if="subCommnentList.length - 1 != index">
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="no-more" v-show="allLoaded">没有更多了</div>
    <div class="blank"></div>
    <div class="footer" v-if="!!shopId">
      <div class="btn" @click="toComment">评论</div>
    </div>
    <previewer ref="previewer" :list="previewerList" :options="options"></previewer>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import { mapGetters } from 'vuex'
import * as _ from '@/util/tool.js'
import { Previewer } from 'vux'
export default {
  data() {
    return {
      commentId: null,
      commentInfo: [],
      searchCondition: {
        pageNum: 1,
        pageRow: 10
      },
      commentCount: 0,
      allLoaded: false,
      subCommnentList: [],
      shopInfo: {},
      shopId: null,
      options: {
        isClickableElement: function(el) {
          return /previewer-delete-icon/.test(el.className)
        }
      },
      previewerList: [],
    }
  },
  components: {
    'previewer': Previewer,
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
      if (val && !!this.shopId) {
        this.getShopInfo();
      }
    },
  },
  mounted() {
    let { shopId, commentId } = this.$route.query;
    this.commentId = commentId;
    this.shopId = shopId;
    this.qryShopCommentById();
    this.qryShopComments();
  },
  methods: {
    qryShopCommentById() {
      api.collection.qryShopCommentById({ commentId: this.commentId }).then((res) => {
        let comment = res.data;
        comment.forEach((obj) => {
          console.log(obj);
          if (!!obj.commentImgs) {
            obj.commentImgsList = obj.commentImgs.split(',');
            obj.commentImgsList.forEach((item) => {
              this.previewerList.push({ src: item });
            });
          } else {
            obj.commentImgsList = [];
          }
        });
        this.commentInfo = res.data;
      }).catch((err) => {});
    },
    qryShopComments() {
      if (!this.shopId) {
        return;
      }
      this.getShopInfo();
      api.collection.qryShopComments({
        ...this.searchCondition,
        ...{
          parentCommentId: this.commentId,
          shopId: this.shopId,
        }
      }).then((res) => {
        let list = res.data[0];
        this.commentCount = list.commentCount || 0;
        if (list.commentCount > 0 && list.hasOwnProperty('comment')) {
          let comment = list.comment;
          this.allLoaded = comment.length < this.searchCondition.pageRow;
          this.subCommnentList = (this.searchCondition.pageNum == 1 ? comment : this.subCommnentList.concat(comment));
        } else {
          this.allLoaded = true;
        }
      }).catch((err) => {});
    },
    getShopInfo() {
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
    handleScroll() {
      if (this.$el.scrollTop + this.$el.offsetHeight >= this.$el.scrollHeight) {
        this.loadMore();
      }
    },
    loadMore() {
      if (this.allLoaded) {
        return;
      }
      this.searchCondition.pageNum = parseInt(this.searchCondition.pageNum) + 1;
      this.$nextTick(() => {
        this.qryShopComments();
      });
    },
    toComment() {
      this.$router.push({
        path: '/collection/comment',
        query: {
          commentId: this.commentId,
        },
      });
    },
    toShopDetail() {
      if (!!this.shopId) {
        this.$router.push({
          path: '/collection/shopDetail',
          query: {
            shopId: this.shopId,
          },
        });
      }
    },
    preview(index) {
      // this.imgUrl = this.picList[index];
      // this.isPreview = true;
      this.$refs.previewer.show(index)
    },
  },
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
  position: relative;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shop-card {
  width: 100%;
  height: 160px;
  border-top: 1px solid #E2E2E2;
  /*no*/
  box-sizing: border-box;
  padding-left: 130px;
  padding-right: 30%;
  padding-top: 30px;
  position: relative;
  .card-content {
    width: 100%;
    height: 100%;
    .shop-name {
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 41.6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .shop-area {
      margin-top: 20px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #818B8F;
      letter-spacing: 0;
      line-height: 36.4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .card-distance {
    width: 30%;
    position: absolute;
    top: 30px;
    right: 0;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #818B8F;
    letter-spacing: 0;
    text-align: right;
    line-height: 36.4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-logo {
    position: absolute;
    top: 30px;
    left: 0;
    width: 100px;
    height: 100px;
    border-radius: 12px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.my-blank {
  width: 100%;
  height: 20px;
  background: #F8F8FC;
}

.section {
  width: 100%;
  background: #FFF;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  .cell {
    position: relative;
    width: 100%;
    min-height: 140px;
    box-sizing: border-box;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 100px;
    .line-box {
      position: absolute;
      bottom: 1px;
      /*no*/
      right: 0;
      width: 100%;
      height: 0;
      box-sizing: border-box;
      padding-left: 100px;
      .line {
        border-bottom: 1px solid #E2E2E2;
        /*no*/
      }
    }
    .comment-content {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 31.2px;
    }
    .create-time {
      position: absolute;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #818B8F;
      letter-spacing: 0;
      text-align: right;
      line-height: 31.2px;
      top: 30px;
      right: 0;
    }
    .header {
      width: 100%;
      height: 37px;
      box-sizing: border-box;
      padding-right: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .avatar {
      position: absolute;
      width: 80px;
      height: 80px;
      top: 30px;
      left: 0;
      border-radius: 80px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.blank {
  width: 100%;
  height: 120px;
}

.no-more {
  margin: 30px auto;
  width: 372px;
  height: 41.6px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #818B8F;
  letter-spacing: 0;
  text-align: center;
  line-height: 41.6px;
}

.footer {
  width: 100%;
  height: 120px;
  background: #FFF;
  position: fixed;
  bottom: 0;
  left: 0;
  .btn {
    background: #F05720;
    border-radius: 44px;
    width: 570px;
    height: 88px;
    margin: 16px auto 0 auto;
    font-family: PingFangSC-Semibold;
    font-size: 36px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 88px;
  }
}

.sub-title {
  padding-top: 30px;
  padding-left: 50px;
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 45px;
  height: 45px;
  background: #FFF;
  .text-num {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #330000;
    letter-spacing: 0;
    line-height: 45px;
  }
}

// .comment-list {
//   border-bottom: 1px solid #E2E2E2;
//   /*no*/
// }
.section-6 {
  width: 100%;
  padding: 30px 30px 0 30px;
  box-sizing: border-box; // margin-top: 20px;
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
    // margin-top: 30px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 100px; // padding-bottom: 30px;
    position: relative; // border-bottom: 1px solid #E2E2E2;
    /*no*/
    .reply-box {
      width: 100%;
      margin-top: 0px;
      height: 30px;
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

</style>
