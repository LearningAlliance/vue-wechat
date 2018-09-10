<template>
  <div class="page">
    <div class="pic"></div>
    <div class="sub-title">开始创建彩蛋</div>
    <div class="section">
      <div class="section-title">彩蛋位置</div>
      <div class="section-desc shop-name">{{shopInfo.shopName}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      shopId: null,
      shopInfo: {},
    }
  },
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    this.getShopDetail();
  },
  methods: {
    // 查询商家详情
    getShopDetail() {
      api.collection.merShop({
        shopId: this.shopId,
      }).then((res) => {
        this.shopInfo = res.data[0];
      }).catch((err) => {});
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%; // height: 100%;
  min-height: 100%;
  background: #FFF;
  margin: 0;
  padding: 0;
}

.section {
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 79px;
  .section-title {
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
  }
  .section-desc {
    margin-top: 30px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    &.shop-name {
      padding-left: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &.shop-name::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../assets/images/ic_location.png');
    }
  }
}

.pic {
  margin: 0 auto;
  width: 750px;
  height: 569px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/img_duegg.png');
}

.sub-title {
  width: 100%;
  box-sizing: border-box;
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 60px;
  font-family: PingFangSC-Medium;
  font-size: 48px;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 62.4px;
}

</style>
