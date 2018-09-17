<!-- 碎片 -->
<template>
  <div class="page">
    <div class="section-title">请选择放置的碎片</div>
    <div class="list">
      <div :class="['cell', {'no-border': index == list.length - 1}]" v-for="(item, index) in list" @click="changeSelect(index)">
        <div :class="['cell-top', {'on': item.select}]">{{item.name}}</div>
        <div class="cell-bottom">
          <div class="cell-num">已拥有碎片：{{item.num}}个</div>
        </div>
      </div>
    </div>
    <div :class="['submit-btn', {'on': canSubmit}]" @click="next">生成</div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      list: [],
      canSubmit: false,
      shopId: null,
      id: null,
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
      // _.alert('1');
      // TODO 参数中添加 id
      if (!this.canSubmit || !this.id) {
        _.alert('请选择碎片后再提交');
        return;
      }
      // TODO updateEggInfoByKey
      this.updateEggInfoByKey({id: this.id});
      let router = this.$router;
      this.saveEgg({
        router,
        shopId: this.shopId,
      });
    },
    getData() {
      // TODO 调用接口
      this.list = [{
      	id: 1,
        name: '新客到店',
        num: 4,
        select: true,
      }, {
      	id: 2,
        name: '新客到店2',
        num: 4,
        select: false,
      }, ];
      if (this.list.length > 0) {
      	// this.list[0].select = true;
       //  this.couponId = this.list[0].couponId;
        this.canSubmit = true;
      } else {
        _.alert('暂无可用碎片');
      }
    },
    changeSelect(index) {
      if (this.list[index].select) {
        return;
      }
      this.list.forEach((obj) => {
        obj.select = false;
      })
      this.list[index].select = true;
      // TODO
      this.id = this.list[index].id;
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
