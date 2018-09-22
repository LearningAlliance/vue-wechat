<template>
  <div class="page">
    <div class="video with-shadow">
      <my-player :video-url="videoUrl" v-if="!!videoUrl"></my-player>
    </div>
  </div>
</template>
<script type="text/javascript">
import myPlayer from '@/components/myPlayer'
import 'video.js/dist/video-js.css'
export default {
  props: {
    remark: {
      default: '',
    },
    info: {
      default: {},
    },
    videoUrl: {
      default: []
    },
  },
  components: {
    'my-player': myPlayer,
  },
  data() {
    return {}
  },
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
  overflow: hidden;
}

</style>
