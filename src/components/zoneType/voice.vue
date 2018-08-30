<template>
  <div class="page">
  	<audio>
        <source src="http://a.f265.com/project/shake-money/img/shake.mp3" type="audio/mp3">
    </audio>
    <div class="voice">
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    remark: {
      default: '',
    }
  },
  data() {
    return {}
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  margin-top: 40px;
}

.voice {
  margin: 0 auto;
  width: 461px;
  height: 70px;
  background-image: linear-gradient(-180deg, #F99043 0%, #F05720 100%);
  border-radius: 100px;
}

</style>
