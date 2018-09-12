<template>
  <div class="page">
    <textarea class="remark" v-model="desc" maxlength="150" placeholder="请输入你想说的..."></textarea>
    <div class="num-left">还剩{{numLeft}}字</div>
    <div class="line-box">
    	<div class="line"></div>
    </div>
    <upload-image></upload-image>
    <div :class="['submit-btn', {'on': canSubmit}]" @click="next">下一步</div>
  </div>
</template>
<script type="text/javascript">
import uploadImage from '@/components/uploadImage'
export default {
  props: {
    remark: {
      type: String,
    }
  },
  components: {
  	'upload-image': uploadImage,
  },
  computed: {
  	numLeft() {
  		return this.max - this.desc.length;
  	}
  },
  data() {
    return {
      canSubmit: true,
      desc: '',
      max: 150,
    }
  },
  mounted() {
    this.desc = this.remark || '';
  },
  methods: {
    next() {

    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #FFF;
}

.line-box{
	box-sizing: border-box;
	width: 100%;
	height: 1px;/*no*/
	padding-left: 30px;
	padding-right: 30px;
	.line{
		width: 100%;
		height: 100%;
		background: #E2E2E2;
	}
}

.remark {
  width: 100%;
  height: 250px;
  resize: none;
  box-sizing: border-box;
  padding: 30px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  border: none;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 41.6px;
}

.num-left {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #818B8F;
  letter-spacing: 0;
  text-align: right;
  line-height: 36.4px;
}

.submit-btn {
  position: fixed;
  bottom: 116px;
  left: 50%;
  margin-left: -285px;
  width: 570px;
  height: 88px;
  background: #E2E2E2;
  border-radius: 44px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 88px;
  &.on {
    background: #F05720;
    color: #FFF;
  }
}

</style>
