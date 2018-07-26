<template>
  <div class="page">
  	<div class="height-20"></div>
    <user-group :cell-lists="cellLists1"></user-group>
  </div>
</template>
<script type="text/javascript">
import userGroup from '@/components/group'
export default {
  data() {
    return {
      cellLists1: [
        { link: '/mine/myPay', iconUrl: null, text: '我的买单', desc: '', badg: '', more: true },
        { link: '/mine/myCombo', iconUrl: null, text: '优惠套餐', desc: '', badg: '', more: true },
      ]
    }
  },
  components: {
    'user-group': userGroup,
  },
}

</script>
<style scoped lang="scss">
.height-20{
	width: 100%;
	height: 20px;
}

</style>
