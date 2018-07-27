<!-- 个人中心-我的买单-详情页面 -->
<template>
  <div class="page">
    <order-detail :detial-no="orderNo" :create-date="createDate"></order-detail>
  </div>
</template>
<script type="text/javascript">
import orderDetail from '@/components/orderDetail'
export default {
  data() {
    return {
      orderNo: null,
      createDate: null
    }
  },
  components: {
    'order-detail': orderDetail,
  },
  created() {
    this.orderNo = this.$route.query.orderNo;
    this.createDate = this.$route.query.createDate;
  }
}

</script>
<style scoped lang="scss">


</style>
