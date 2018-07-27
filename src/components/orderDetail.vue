<!-- 个人中心-我的订单-我的买单 -->
<!-- 个人中心-我的买单-优惠套餐 -->
<template>
  <div class="page">
    <div class="section">
      <div class="section-body">
        <div class="section-header"></div>
        <div class="line"></div>
        <div class="section-content"></div>
      </div>
    </div>
    <div class="section-2">
      <div class="section-body-2">
        <div class="product">
        </div>
        <div class="box">
          <div class="box-label">VIP折扣</div>
          <div class="box-value">-10元</div>
        </div>
        <div class="box">
          <div class="box-label">实付</div>
          <div class="box-value">190元</div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script type="text/javascript">
import { Loadmore, MessageBox } from 'mint-ui';
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  props: {
    detialNo: String,
    createDate: String,
  },
  data() {
    return {
    	order: {
    		coupons: null,
    		orderDetail: null,
    	},
    	coupons: [],
    	orderDetail: null,
    }
  },
  created() {

  },
}

</script>
<style scoped lang="scss">
.section {
  margin-top: 20px;
  width: 100%;
  height: 273px;
  background: #FFF;
  .section-body {
    width: 690px;
    height: 273px;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: hidden;
    .section-header {
      width: 100%;
      height: 108px;
    }
    .line {
      width: 100%;
      height: 1px;
      /*no*/
      background: #E2E2E2;
    }
    .section-content {
      width: 100%;
      height: 164px;
    }
  }
}

.section-2 {
  margin-top: 20px;
  background: #FFF;
  width: 100%;
  height: 342px;
  .section-body-2 {
    width: 690px;
    margin: 0 auto;
    height: 342px;
    overflow: hidden;
  }
}

.footer {
  width: 100%;
  height: 120px;
  background: #FFF;
  position: fixed;
  bottom: 0;
  left: 0;
}

</style>
