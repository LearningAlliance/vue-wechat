<template>
  <div class="page">
  	<div class="margin-top-20"></div>
    <user-group :cell-lists="list"></user-group>
  </div>
</template>
<script type="text/javascript">
import userGroup from '@/components/group'

export default {
  data() {
    return {
      list: [
        { link: '/mine/userSettings/ModifyMobile', iconUrl: null, text: '修改手机', desc: '', badg: '', more: true },
      ]
    }
  },
  components: {
    'user-group': userGroup,
  },
}

</script>
<style scoped lang="scss">
	.margin-top-20{
		margin-top: 20px;
	}
</style>
