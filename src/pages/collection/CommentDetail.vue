<template>
  <div class="page" @scroll="handleScroll">
    <div class="section-6" v-for="(item, index) in commentInfo" :key="'comment' + index">
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
            <!-- <div class="reply-count">{{item.replyCount}}</div> -->
            <!-- <i class="icon-reply"></i> -->
          </div>
        </div>
      </div>
      <div class="sub-title">评价 <span class="text-num">({{commentCount}})</span></div>
    </div>
    <div class="section" style="height: 200%;">
      <div class="cell">11</div>
    </div>
    <div class="no-more" v-show="allLoaded">没有更多了</div>
    <div class="blank"></div>
    <div class="footer">
      <div class="btn">评论</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
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
    }
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
          if (!!obj.commentImgs) {
            obj.commentImgsList = obj.commentImgs.split(',');
          } else {
            obj.commentImgsList = [];
          }
        });
        this.commentInfo = res.data;
      }).catch((err) => {});
    },
    qryShopComments() {
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
          this.allLoaded(comment.length > 0);
          this.subCommnentList = this.searchCondition.pageNum == 1 ? comment : this.subCommnentList.concat(comment);
        } else {
          this.allLoaded = true;
        }
      }).catch((err) => {});
    },
    handleScroll() {
      if (this.$el.scrollTop + this.$el.offsetHeight >= this.$el.scrollHeight) {
        this.loadMore();
      }
    },
    loadMore() {
      this.searchCondition.pageNum = parseInt(this.searchCondition.pageNum) + 1;
      this.$nextTick(() => {
      	this.qryShopComments();
      });
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

.section {
  width: 100%;
  background: #FFF;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  .cell {
    width: 100%;
    box-sizing: border-box;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 100px;
  }
}

.blank {
  width: 100%;
  height: 120px;
  background: #FFF;
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
  margin-top: 30px;
  padding-left: 20px;
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 45px;
  height: 45px;
  .text-num {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #330000;
    letter-spacing: 0;
    line-height: 45px;
  }
}

.comment-list {
  border-bottom: 1px solid #E2E2E2;
  /*no*/
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
