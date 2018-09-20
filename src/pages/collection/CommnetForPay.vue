<template>
  <div class="page">
    <div class="section">
      <div class="cell-1 clearfix">
        <div class="cell-label cell-label-1">综合</div>
        <div class="cell-service-box">
          <div :class="['cell-service', {'select': item.selected}]" v-for="(item, index) in services" @click="changeService(index)">{{item.name}}</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="cell-1 cell-2 clearfix">
        <div class="cell-label cell-label-2">人均(元)</div>
        <input type="number" class="avg" v-model.number="avg" />
      </div>
      <div class="line"></div>
      <div class="cell-1 cell-2 clearfix" @click="changeType">
        <div :class="['icon-type', {'on': type}]"></div>
        <div class="type-text">是否匿名</div>
      </div>
    </div>
    <div class="remark-box">
      <textarea placeholder="请输入你想说的点评..." class="remark" rows="6" maxlength="140" v-model="remark"></textarea>
    </div>
    <div class="num-box">{{num}}/140</div>
    <div class="line-box">
      <div class="line"></div>
    </div>
    <div class="share-title">分享图片 <span class="color-000">(0/4)</span></div>
    <upload-image :img-change="imgChange" :max-num="4"></upload-image>
    <div :class="['btn', {'can-submit': true}]" @click="comment">立即评价</div>
  </div>
</template>
<script type="text/javascript">
import uploadImage from '@/components/uploadImage'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      orderNo: null,
      remark: '',
      commentId: null,
      avg: null, // 人均消费
      type: true, // 是否匿名
      services: [{
        key: 3,
        name: '不满意',
        selected: false,
      }, {
        key: 2,
        name: '一般',
        selected: false,
      }, {
        key: 1,
        name: '满意',
        selected: false,
      }, ],
      selectService: null, // 选中的服务评价
      img: '',// 图片地址
    }
  },
  components: {
    'upload-image': uploadImage,
  },
  mounted() {
    let { commentId, orderNo } = this.$route.query;
    this.commentId = commentId;
    this.orderNo = orderNo;
  },
  computed: {
    num() {
      return this.remark.length;
    }
  },
  methods: {
    comment() {
      if (!this.selectService) {
        _.alert('请先选择综合评价');
        return;
      }
      if (!this.avg) {
        _.alert('请先输入人均消费');
        return;
      }
      if (this.num <= 0) {
        _.alert('请写下您的评论~');
        return;
      } else if (this.num > 140) {
        _.alert('最多可以输入140字，请检查');
        return;
      }
      this.doComment();
    },
    doComment() {
      api.collection.saveShopComment({
        // id: this.commentId,
        orderNo: this.orderNo,
        remark: this.remark,
        img: this.img,
        service: this.services[this.selectService].key,
        avg: this.avg,
        type: this.type,
      }).then((res) => {
        _.alert('发布评论成功~');
        history.go(-1);
      }).catch((err) => {});
    },
    changeService(index) {
      this.services.forEach((obj) => {
        obj.selected = false;
      })
      this.selectService = index;
      this.services[index].selected = true;
    },
    changeType() {
      this.type = !this.type;
    },
    imgChange(picList) {
      this.img = picList.join(',');
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%; // background: #FFF;
}

.color-000 {
  color: #818B8F;
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

.share-title {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  padding-bottom: 0;
  background: #FFF;
}

.section {
  width: 100%;
  height: 326px;
  background: #FFF;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  .line {
    width: 100%;
    height: 1px;
    /*no*/
    background: #E2E2E2;
  }
  .cell-1 {
    width: 100%;
    height: 148px;
    &.cell-2 {
      height: 88px;
      position: relative;
      .icon-type {
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -17.5px;
        display: inline-block;
        width: 35px;
        height: 35px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/ic_select_grey.png');
        &.on {
          background-image: url('../../assets/images/ic_select.png');
        }
      }
      .type-text {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 57px;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 88px;
      }
      .type-text {
        display: inline-block;
        float: left;
      }
    }
    .avg {
      display: inline-block;
      float: right;
      width: 50%;
      text-align: right;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 88px;
    }
    .cell-label {
      display: inline-block;
      float: left;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      &.cell-label-1 {
        line-height: 148px;
      }
      &.cell-label-2 {
        line-height: 88px;
      }
    }
    .cell-service-box {
      display: inline-block;
      float: right;
      text-align: right;
      height: 148px;
      box-sizing: border-box;
      padding-top: 40px;
      padding-bottom: 40px;
      .cell-service {
        margin-left: 30px;
        display: inline-block;
        float: right;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: center;
        line-height: 68px;
        padding-left: 20px;
        padding-right: 20px;
        border: 1px solid #818B8F;
        /*no*/
        border-radius: 34px;
        &.select {
          background: #F05720;
          color: #FFF;
          border-color: #F05720;
        }
      }
    }
  }
}

.remark-box {
  margin-top: 20px;
  width: 100%;
  height: 250px;
  box-sizing: border-box;
  padding: 30px;
  background: #FFF;
  .remark {
    resize: none;
    width: 100%;
    border: none;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #333;
    letter-spacing: 0;
    line-height: 41.6px;
  }
}

.num-box {
  width: 100%;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #C4CACD;
  letter-spacing: 0;
  text-align: right;
  box-sizing: border-box;
  padding: 30px;
  line-height: 36.4px;
  background: #FFF;
}

.btn {
  // position: fixed;
  // bottom: 120px;
  // left: 50%;
  // margin-left: -285px;
  margin: 120px auto 80px auto;
  width: 570px;
  height: 88px;
  background: #E2E2E2;
  border-radius: 44px;
  text-align: center;
  line-height: 88px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 0;
  &.can-submit {
    background: #F05720;
  }
}

</style>
