<!-- 个人中心-我的订单-我的买单 -->
<template>
  <div class="page">
    <div class="blank"></div>
    <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul class="list-box">
          <li class="list" v-for="(item, index) in commentList" :key="'comment' + index" @click="toCommentDetail(item.commentId)">
            <div class="section-6">
              <div class="comment-list">
                <!-- <div :class="['cell', {'no-border': commentList.length - 1 == index}]"> -->
                <div class="cell">
                  <div class="avatar">
                    <img src="" />
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
            </div>
          </li>
        </ul>
      </mt-loadmore>
      <div class="no-more" v-show="allLoaded">没有更多了</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { Loadmore, MessageBox } from 'mint-ui';
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      shopId: null,
      searchCondition: { //分页属性
        pageNum: 1,
        pageRow: 10
      },
      commentList: [],
      allLoaded: false,
      scrollMode: "auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
    }
  },
  components: {
    'mt-loadmore': Loadmore
  },
  created() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    this.loadPageList();
  },
  methods: {
    loadTop() {
      this.searchCondition.pageNum = 1;
      this.loadPageList();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      this.more();
      this.$refs.loadmore.onBottomLoaded();
    },
    loadPageList() {
      // 查询数据
      api.collection.qryShopComments({
        ...this.searchCondition,
        ...{
          parentCommentId: -1,
          shopId: this.shopId,
        }
      }).then((res) => {
        let list = res.data[0];
        this.commentCount = list.commentCount || 0;
        if (list.commentCount > 0 && list.hasOwnProperty('comment')) {
          let comment = list.comment;
          comment.forEach((obj) => {
            if (!!obj.commentImgs) {
              obj.commentImgsList = obj.commentImgs.split(',');
            } else {
              obj.commentImgsList = [];
            }
          });
          this.isHaveMore(comment.length > 0);
          this.commentList = comment;
          this.$nextTick(function() {
            this.scrollMode = "touch";
          });
        } else {
          this.isHaveMore(false);
        }
      }).catch((err) => {});
    },
    more() {
      // 分页查询
      this.searchCondition.pageNum = parseInt(this.searchCondition.pageNum) + 1;
      api.collection.qryShopComments({
        ...this.searchCondition,
        ...{
          parentCommentId: -1,
          shopId: this.shopId,
        }
      }).then((res) => {
        let list = res.data[0];
        this.commentCount = list.commentCount || 0;
        if (list.commentCount > 0 && list.hasOwnProperty('comment')) {
          let comment = list.comment;
          comment.forEach((obj) => {
            if (!!obj.commentImgs) {
              obj.commentImgsList = obj.commentImgs.split(',');
            } else {
              obj.commentImgsList = [];
            }
          });
          this.isHaveMore(comment.length > 0);
          this.commentList = this.commentList.concat(comment);
          this.$nextTick(function() {
            this.scrollMode = "touch";
          });
        } else {
          this.isHaveMore(false);
        }
      }).catch((err) => {});

    },
    isHaveMore(isHaveMore) {
      // 是否还有下一页，如果没有就禁止上拉刷新
      this.allLoaded = true; //true是禁止上拉加载
      if (isHaveMore) {
        this.allLoaded = false;
      }
    },
    toCommentDetail(commentId) {
      this.$router.push({
        path: '/collection/commentDetail',
        query: {
          shopId: this.shopId,
          commentId,
        },
      });
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}

.blank {
  width: 100%;
  height: 20px;
  background: #F8F8FC;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 21;
}

.main-body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  overflow: auto;
  z-index: 10;
}

.list-box {
  width: 100%;
  .list {
    display: block;
    width: 100%; // height: 247px;
    background: #FFF; // overflow: hidden;
    margin-bottom: 20px;
  }
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
    padding-left: 100px;
    padding-bottom: 30px;
    position: relative; // border-bottom: 1px solid #E2E2E2;
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

</style>
