<!-- 收藏首页-搜索 -->
<template>
  <div class="page">
    <div class="search-box clearfix">
      <div class="search">
        <div class="search-icon"></div>
        <input type="search" class="search-input" @keyup.enter="search" v-model.trim="keyWords" placeholder="请输入要搜索的内容" />
        <!-- <input type="text" class="search-input" @keyup.enter="search" v-model.trim="keyWords" /> -->
        <div class="search-icon-delete" v-show="!!keyWords" @click="resetKeyWords"></div>
      </div>
      <div class="search-cancel" @click="goBack">搜索</div>
    </div>
    <div class="section">
      <div class="section-header">
        <p class="section-header-p">我过去的搜索</p>
        <div class="icon icon-delete-history" @click="clearAll"></div>
      </div>
      <div class="section-body">
        <div class="cell" v-for="(item, index) in list1" @click="clickCell(item)" :key="index">{{item}}</div>
        <div class="none" v-show="list1.length == 0">暂无搜索记录</div>
      </div>
    </div>
    <!-- <div class="section">
      <div class="section-header">
        <p class="section-header-p">搜索发现</p>
        <div :class="['icon',{'icon-show': showDiscovery == 'show', 'icon-hidden': showDiscovery != 'show'}]" @click="changeShow"></div>
      </div>
      <div class="section-body">
        <div class="cell" v-for="(item, index) in list2" v-show="showDiscovery == 'show'" @click="clickCell(item)">{{item}}</div>
        <div class="none" v-show="showDiscovery != 'show'">当前搜索发现已隐藏</div>
      </div>
    </div> -->
  </div>
</template>
<script type="text/javascript">
import { MessageBox } from 'mint-ui';
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      keyWords: '',
      list1: ['牛排套餐', '超大披萨', '新白鹿', '日式料理', '城西银泰商场', '超大披萨', '新白鹿'], // 我过去的搜索
      list2: ['超大披萨', '新白鹿', '日式料理', '城西银泰商场', '超大披萨', '新白鹿'], // 搜索发现
      showDiscovery: 'show', // 是否显示
    }
  },
  created() {
    let searchHistory = localStorage.getItem('searchHistory');
    this.list1 = !!searchHistory ? JSON.parse(searchHistory) : [];
    this.showDiscovery = localStorage.getItem('showDiscovery') || 'show';
    // TODO 调取接口获取搜索发现部分信息
  },
  methods: {
    search() {
      if (!this.keyWords) {
        return;
      }
      if (this.list1.indexOf(this.keyWords) > -1) {
        this.list1.splice(this.list1.indexOf(this.keyWords), 1);
      }
      this.list1.unshift(this.keyWords);
      localStorage.setItem('searchHistory', JSON.stringify(this.list1));
      // this.keyWords = '';
      this.$router.replace({
        path: '/discovery/findShop',
        query: {
          keyWords: this.keyWords,
        }
      });
    },
    goBack() {
      if (!this.keyWords) {
        this.$router.replace({
          path: '/discovery/findShop',
          query: {
            keyWords: '',
          }
        });
        return;
      }
      if (this.list1.indexOf(this.keyWords) > -1) {
        this.list1.splice(this.list1.indexOf(this.keyWords), 1);
      }
      this.list1.unshift(this.keyWords);
      localStorage.setItem('searchHistory', JSON.stringify(this.list1));
      this.$router.replace({
        path: '/discovery/findShop',
        query: {
          keyWords: this.keyWords,
        }
      });
    },
    resetKeyWords() {
      this.keyWords = '';
    },
    changeShow() {
      if (this.showDiscovery == 'show') {
        this.showDiscovery = 'hidden';
      } else {
        this.showDiscovery = 'show';
      }
      localStorage.setItem('showDiscovery', this.showDiscovery);
    },
    clearAll() {
      MessageBox.confirm('清空搜索记录?').then(action => {
        if (action) {
          this.list1 = [];
          localStorage.setItem('searchHistory', JSON.stringify(this.list1));
        }
      }).catch((err) => {

      });
    },
    clickCell(keyWords) {
      if (!keyWords) {
        return;
      }
      if (this.list1.indexOf(keyWords) > -1) {
        this.list1.splice(this.list1.indexOf(keyWords), 1);
      }
      this.list1.unshift(keyWords);
      if (this.list1.length > 10) {
        this.list1.splice(10);
      }
      localStorage.setItem('searchHistory', JSON.stringify(this.list1));
      this.$router.replace({
        path: '/discovery/findShop',
        query: {
          keyWords: keyWords,
        }
      });
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  background: #FFF;
  height: 100%;
  box-sizing: border-box;
  .search-box {
    width: 690px;
    height: 100px;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0 auto;
    .search {
      display: inline-block;
      float: left;
      position: relative;
      width: 590px;
      height: 60px;
      background: #F8F8FC;
      border-radius: 30px;
      .search-icon {
        position: absolute;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 34px;
        height: 34px;
        top: 13px;
        left: 30px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/ic_search.png');
      }
      .search-input {
        // width: 590px;
        // margin-top: 16px;
        width: 100%;
        height: 60px;
        border-radius: 30px;
        line-height: 60px;
        background: #F8F8FC;
        padding-left: 94px;
        padding-right: 94px;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
      }
      .search-icon-delete {
        position: absolute;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
        top: 10px;
        right: 30px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/ic_cancel.png');
      }
    }
    .search-cancel {
      display: inline-block;
      float: right;
      width: 100px;
      text-align: right;
      height: 60px;
      line-height: 60px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
    }
  }
  .section {
    width: 100%;
    padding-top: 48.8px;
    padding-bottom: 30px;
    .section-header {
      width: 690px;
      height: 40px;
      margin: 0 auto;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #818B8F;
      line-height: 36.4px;
      position: relative;
      .section-header-p {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        line-height: 40px;
      }
      .icon {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.icon-delete-history {
          background-image: url('../../assets/images/ic_delete.png');
        }
        &.icon-show {
          background-image: url('../../assets/images/ic_search_show.png');
        }
        &.icon-hidden {
          background-image: url('../../assets/images/ic_search_hide.png');
        }
      }
    }
    .section-body {
      width: 690px;
      margin: 0 auto;
      .cell {
        height: 50px;
        box-sizing: border-box;
        line-height: 40px;
        margin-top: 30px;
        margin-right: 20px;
        padding: 5px 14px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        text-align: center;
        background: #F8F8FC;
        border-radius: 25px;
        display: inline-block;
      }
      .none {
        margin-top: 60.8px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        text-align: center;
        line-height: 36.4px;
      }
    }
  }
}

</style>
