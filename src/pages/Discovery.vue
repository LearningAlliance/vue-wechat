<template>
  <div class="page" @scroll="handleScroll()">
    <div class="blank"></div>
    <banner :type="1"></banner>
    <div class="box">
      <div class="inner-box clearfix">
        <div class="box-left" @click="toFindShop">
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
          <div class="cell with-shadow" v-for="(item, index) in list" v-if="index % 2 == 0" @click="toDetail(item.id, item.type)">
            <img class="pic-url" :src="item.mainimg" />
            <div class="comment-box">
              <p class="comment">{{item.content}}</p>
            </div>
            <div class="cell-footer">
              <img class="user-avatar" :src="item.head" />
              <div class="user-name">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="cell-right">
          <div class="cell with-shadow" v-for="(item, index) in list" v-if="index % 2 == 1" @click="toDetail(item.id, item.type)">
            <img class="pic-url" :src="item.mainimg" />
            <div class="comment-box">
              <p class="comment">{{item.content}}</p>
            </div>
            <div class="cell-footer">
              <img class="user-avatar" :src="item.head" />
              <div class="user-name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-more" v-show="!hasMore" v-text="list.length == 0 ? '暂无' : '没有更多了'"></div>
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
      hasMore: true,
      pageNum: 1,
      pageRow: 20,
      list: [],
      // defaultList: [{
      //   userName: '皮卡丘',
      //   picUrl: 'https://ss1.baidu.com/5aR1cTe9KgQFm2e88IuM_a/it?qt=spg&c=179&coord=L|13381648.01,3512769.12;13377440.63,3515346.60;13374513.07,3519404.70;13375639.71,3519245.17;13369533.31,3518722.78;',
      //   userComments: '真的不错的一家海鲜自助餐厅，服务员态度非常好十分满意',
      //   userAvatar: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
      // }, {
      //   userName: '肯泰罗',
      //   picUrl: 'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=35675958,1784347126&fm=202&src=2000&mola=new&crop=v1',
      //   userComments: '缤纷多彩的夏日滋味',
      //   userAvatar: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
      // }, {
      //   userName: '蝙蝠侠',
      //   picUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2985556964,4179404362&fm=27&gp=0.jpg',
      //   userComments: '彩蛋袭来~快进店来',
      //   userAvatar: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
      // }, {
      //   userName: '名字啊名字啊名字啊名字啊名字啊名字啊名字啊名字啊名字啊名字啊',
      //   picUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4023123360,4102988295&fm=27&gp=0.jpg',
      //   userComments: '彩蛋袭来~快进店来',
      //   userAvatar: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
      // }, {
      //   userName: '名字啊名字啊名字啊名字啊名字啊名字啊名字啊名字啊名字啊名字啊',
      //   picUrl: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=4004991133,1010136548&fm=85&s=B989F311583BA801665C105E03009060',
      //   userComments: '彩蛋袭来~快进店来',
      //   userAvatar: 'http://img5.imgtn.bdimg.com/it/u=1760549374,2354433619&fm=27&gp=0.jpg',
      // }],
      defaultList: [{
          "content": "阿萨德可千万皮卡丘万科噢请问可气温气温且去请问驱蚊器翁请问请问而且",
          "id": 1,
          "mainimg": "http://p-shop.jfb315.cn/uploadfiles/shop/2016/03/05/2016030501154259.jpg",
          "name": "沈毅",
          "head": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoKF4Op0CgKfThcArGdbthicmBwc39VFBIlxlfWTduViakqZk4g1w1KfffSAMSFnEiaxn2rVAI8eqicVw/132",
          "type": 2,
          "statedate": "2018-08-31 19:10:12"
        },
        {
          "content": "阿萨德可千万皮卡丘万科噢请问可气温气温且去请问驱蚊器翁请问请问而且",
          "id": 1,
          "mainimg": "http://p-shop.jfb315.cn/uploadfiles/shop/2016/03/05/2016030501154259.jpg",
          "name": "沈毅",
          "head": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoKF4Op0CgKfThcArGdbthicmBwc39VFBIlxlfWTduViakqZk4g1w1KfffSAMSFnEiaxn2rVAI8eqicVw/132",
          "type": 2,
          "statedate": "2018-08-31 19:10:12"
        }
      ],
    }
  },
  components: {
    'banner': banner,
  },
  created() {
    // this.defaultList = this.defaultList.concat(this.defaultList);
    // this.list = this.defaultList;
    this.getData();
  },
  methods: {
    toMall() {
      this.$router.push('/discovery/exchangeMall');
    },
    handleScroll() {
      // console.log(this.$el.scrollTop, this.$el.offsetHeight, this.$el.scrollHeight);
      if (this.$el.scrollTop + this.$el.offsetHeight >= this.$el.scrollHeight) {
        this.loadMore();
      }
    },
    loadMore() {
      // if (this.pageNum == 3) {
      //   this.hasMore = false;
      //   // _.alertButtom('没有更多了~');
      //   return;
      // }
      // 测试实际上应该调用接口
      // this.list = this.list.concat(this.defaultList);
      if(!this.hasMore){
        return;
      }
      this.pageNum++;
      this.getData();
    },
    toFindShop() {
      this.$router.push('/discovery/findShop');
    },
    getData() {
      api.discovery.qryShopComment({
        pageNum: this.pageNum,
        pageRow: this.pageRow,
      }).then((res) => {
        let { data = [] } = res;
        this.list = this.pageNum == 1 ? data : this.list.concat(data);
        // 测试用
        // this.list = this.defaultList;
        if (data.length < this.pageRow) {
          this.hasMore = false;
        }
      }).catch((err) => {});
    },
    toDetail(id, type){
      if(type == '1'){
        // 店铺
        this.$router.push({
          path: '/collection/shopDetail',
          query: {
            shopId: id,
            from: 'discovery',
          },
        });
      }else if(type == '2'){
        // 评论
        this.$router.push({
          path: '/collection/commentDetail',
          query: {
            commentId: id,
            // shopId: shoid //TODO
          },
        });
      }
    },
  },
}

</script>
<style scoped lang="scss">
.page {
  height: 100%;
  overflow-y: scroll;
}

.section {
  margin-top: 20px;
  width: 100%; // margin-bottom: 120px; // height: 1800px;
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
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
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

.no-more {
  margin: 30px auto 0 auto;
  padding-bottom: 30px;
  width: 372px;
  height: 41.6px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #818B8F;
  letter-spacing: 0;
  text-align: center;
  line-height: 41.6px;
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
