<template>
  <div class="page">
    <!-- http://vk88.vka88.com/00006/2017063014590719381_Stay the Night.mp3 -->
    <div class="voice">
      <audio controls height="100" width="100">
        <source :src="audioUrl" type="audio/mpeg">
        <source :src="audioUrl" type="audio/ogg">
        <embed height="50" width="100" :src="audioUrl">
      </audio>
    </div>
  </div>
</template>
<script type="text/javascript">
// import Aplayer from 'vue-aplayer'
export default {
  props: {
    remark: {
      default: '',
    },
    info: {
      default: '',
    },
    audioUrl: {
      default: ''
    }
  },
  //   components: {
  //     Aplayer
  // },
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
  // background-image: linear-gradient(-180deg, #F99043 0%, #F05720 100%);
  // border-radius: 100px;
  audio {
    width: 100%;
    height: 100%;
  }
}

</style>
