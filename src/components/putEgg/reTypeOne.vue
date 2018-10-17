<!-- 套餐券 -->
<template>
  <div class="page">
    <div class="section-title">请选择放置您的套餐券</div>
    <div class="list">
      <div :class="['cell', {'no-border': index == list.length - 1}]" v-for="(item, index) in list" @click="changeSelect(index)">
        <div :class="['cell-top', {'on': item.select}]">{{item.couponName}}</div>
        <div class="cell-bottom clearfix">
          <div class="cell-num">{{item.merName}}</div>
          <div class="cell-exp-date">有效期至{{item.expDate}}</div>
        </div>
      </div>
    </div>
    <div :class="['submit-btn', {'on': canSubmit}]" @click="next">生成</div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import { mapGetters, mapActions } from 'vuex'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      list: [],
      canSubmit: false,
      shopId: null,
      couponId: null,
    }
  },
  computed: {
    ...mapGetters(['eggInfo']),
  },
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    this.getData();
  },
  methods: {
    ...mapActions({
      saveEgg: 'saveEgg',
      updateEggInfoByKey: 'updateEggInfoByKey',
    }),
    next() {
      if(this.list.length == 0){
        _.alert('暂无可用套餐券');
        return;
      }
      if (!this.canSubmit || !this.couponId) {
        _.alert('请选择套餐券后再提交');
        return;
      }
      let router = this.$router;
      this.updateEggInfoByKey({couponId: this.couponId});
      this.saveEgg({
        router,
        shopId: this.shopId,
      });
    },
    getData() {
      this.list = [];
      return;
      api.user.getVoucher({ pageNum: 1, pageRow: 1000 }).then((res) => {
        let list = res.data;
        list.forEach((obj) => {
          obj.select = false;
        });
        this.list = list;
        if (this.list.length > 0) {
          this.list[0].select = true;
          this.couponId = this.list[0].couponId;
          this.canSubmit = true;
        } else {
          _.alert('暂无可用套餐券');
        }
      }).catch((err) => {});
    },
    changeSelect(index) {
      if (this.list[index].select) {
        return;
      }
      this.list.forEach((obj) => {
        obj.select = false;
      })
      this.list[index].select = true;
      this.couponId = this.list[index].couponId;
    }
  },
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #F8F8FC;
}

.list {
  width: 100%;
  background: #FFF;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  .cell {
    width: 100%;
    height: 159px;
    box-sizing: border-box;
    padding-top: 30px;
    border-bottom: 1px solid #E2E2E2;
    .cell-bottom {
      margin-top: 20.4px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #818B8F;
      letter-spacing: -0.68px;
      line-height: 36.4px;
      .cell-num {
        float: left;
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cell-exp-date {
        float: left;
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
      }
    }
    .cell-top {
      height: 41.6px;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 41.6px;
      box-sizing: border-box;
      padding-right: 65px;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &::after {
        content: '';
        position: absolute;
        width: 35px;
        height: 35px;
        top: 50%;
        margin-top: -17.5px;
        right: 0;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/ic_select_grey.png');
      }
      &.on::after {
        background-image: url('../../assets/images/ic_select.png');
      }
    }
    &.no-border {
      border: none;
    }
  }
}

.section-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 92px;
  height: 92px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
}

.submit-btn {
  margin: 120px auto 80px auto;
  width: 570px;
  height: 88px;
  border-radius: 44px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 88px;
  background: #E2E2E2;
  &.on {
    background: #F05720;
  }
}

</style>
