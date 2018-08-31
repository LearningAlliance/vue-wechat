<template>
  <div class="page">
    <div class="video with-shadow">
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

.video {
  margin: 0 auto;
  width: 630px;
  height: 340px; // background: rgba(0,0,0,0.50);
  border-radius: 20px;
}

</style>
