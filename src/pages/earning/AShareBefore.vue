<template>
  <div class="page">
    <div class="section" @click="toShare"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      shopId: null,
    }
  },
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
  },
  methods: {
  	toShare(){
  		this.$router.push({
  			path: '/earning/aShareDetail',
  			query: {
  				shopId: this.shopId,
  			}
  		})
  	}
  },
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #EA7638;
}

.section {
  margin: 0 auto;
  width: 750px;
  height: 1396px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/bg_share_before_2.png');
}

</style>
