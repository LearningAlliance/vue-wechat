<template>
  <div class="page" @scroll="handleScroll()">
    <div class="blank"></div>
    <banner></banner>
    <div class="box">
      <div class="inner-box clearfix">
        <div class="box-left">
          <img src="../assets/images/img_findstore.png" />
        </div>
        <div class="box-right" @click="toMall">
          <img src="../assets/images/img_changecoin.png" />
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-header">发现动态</div>
      <div class="section-cell clearfix">
        <div class="cell-left">
          <div class="cell with-shadow" v-for="(item, index) in list" v-if="index % 2 == 0">
            <img class="pic-url" :src="item.picUrl" />
            <div class="comment-box">
              <p class="comment">{{item.userComments}}</p>
            </div>
            <div class="cell-footer">
              <img class="user-avatar" :src="item.userAvatar" />
              <div class="user-name">{{item.userName}}</div>
            </div>
          </div>
        </div>
        <div class="cell-right">
          <div class="cell with-shadow" v-for="(item, index) in list" v-if="index % 2 == 1">
            <img class="pic-url" :src="item.picUrl" />
            <div class="comment-box">
              <p class="comment">{{item.userComments}}</p>
            </div>
            <div class="cell-footer">
              <img class="user-avatar" :src="item.userAvatar" />
              <div class="user-name">{{item.userName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import banner from '@/components/banner'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      list: [{
        userName: '皮卡丘',
        picUrl: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
        userComments: '真的不错的一家海鲜自助餐厅，服务员态度非常好十分满意',
        userAvatar: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
      }, {
        userName: '肯泰罗',
        picUrl: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
        userComments: '缤纷多彩的夏日滋味',
        userAvatar: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
      }, {
        userName: '奥特曼',
        picUrl: 'http://img1.imgtn.bdimg.com/it/u=1221783501,3812481500&fm=27&gp=0.jpg',
        userComments: '放置了口令彩蛋，在银泰第一次见面的地方',
        userAvatar: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
      }, {
        userName: '蝙蝠侠',
        picUrl: 'http://img3.imgtn.bdimg.com/it/u=3609715430,818893913&fm=27&gp=0.jpg',
        userComments: '彩蛋袭来~快进店来',
        userAvatar: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
      }, {
        userName: '名字啊名字啊名字啊名字啊名字啊名字啊名字啊名字啊名字啊名字啊',
        picUrl: 'http://img0.imgtn.bdimg.com/it/u=3129060174,250262574&fm=27&gp=0.jpg',
        userComments: '彩蛋袭来~快进店来',
        userAvatar: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
      }, ],
    }
  },
  mounted() {

  },
  methods: {
    toMall() {
      this.$router.push('/discovery/exchangeMall');
    },
    handleScroll() {
      console.log(this.$el.scrollTop, this.$el.offsetHeight, this.$el.scrollHeight);
    },
  },
  components: {
    'banner': banner,
  }
}

</script>
<style scoped lang="scss">
.page {
  height: 100%;
  overflow-y: scroll;
}

.section {
  margin-top: 20px;
  width: 100%;
  margin-bottom: 120px; // height: 1800px;
  // border: 1px solid red;
  box-sizing: border-box;
  background: #FFFFFF;
  .section-header {
    width: 100%;
    height: 107px;
    box-sizing: border-box;
    padding-top: 29.8px;
    padding-bottom: 30.2px;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: center;
    line-height: 47px;
  }
  .section-cell {
    width: 690px;
    margin: 0 auto;
    .cell-left {
      float: left;
      width: 336px;
    }
    .cell-right {
      float: right;
      width: 336px;
    }
    .cell-left,
    .cell-right {
      .cell {
        display: block;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 20px;
        .pic-url {
          display: block;
          width: 100%;
        }
        .comment-box {
          padding: 20px 24px;
          box-sizing: border-box;
          width: 100%;
          .comment {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            width: 300px;
            height: 72.8px;
            font-family: PingFangSC-Medium;
            font-size: 28px;
            color: #2E3141;
            letter-spacing: 0;
            line-height: 36.4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal!important;
          }
        }
        .cell-footer {
          width: 336px;
          height: 60px;
          margin: 0 auto;
          box-sizing: border-box;
          padding-left: 24px;
          padding-right: 24px;
          position: relative;
          .user-avatar {
            position: absolute;
            top: 0;
            left: 24px;
            width: 40px;
            height: 40px;
            border-radius: 40px;
          }
          .user-name {
            width: 100%;
            height: 40px;
            box-sizing: border-box;
            padding-left: 50px;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #818B8F;
            letter-spacing: 0;
            line-height: 40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}

.blank {
  width: 100%;
  height: 10px;
  background: #FFF;
}

.box {
  width: 100%;
  height: 228px;
  background: #FFF;
  .inner-box {
    width: 750px;
    height: 100%;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .box-left {
    display: inline-block;
    float: left;
    width: 336px;
    height: 188px;
  }
  .box-right {
    display: inline-block;
    float: right;
    width: 336px;
    height: 188px;
  }
  .box-left,
  .box-right {
    img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
