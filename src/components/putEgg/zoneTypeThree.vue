<template>
  <div class="page">
    <div class="height-60"></div>
    <label for="file" class="upload-video">点击上传短视频</label>
    <label for="file" class="video-box">
      <div class="video-box-placeholder" v-if="videoUrl.length == 0">
        <div class="icon-player"></div>
        <div class="icon-player-desc">最长上传60秒短视频</div>
      </div>
      <div class="player-box" v-if="videoUrl.length > 0">
        <my-player :video-url="videoUrl"></my-player>
      </div>
    </label>
    <input id="file" ref="file" name="file" class="file-input" @change="uploadVideo" accept="video/*" type="file" />
    <div :class="['submit-btn', {'on': canSubmit}]" @click="next">下一步</div>
  </div>
</template>
<script type="text/javascript">
import config from '@/config'
import { Indicator } from 'mint-ui'
import { mapGetters, mapActions } from 'vuex'
import * as _ from '@/util/tool.js'
import 'video.js/dist/video-js.css'
// import { videoPlayer } from 'vue-video-player'
import myPlayer from '@/components/myPlayer'
export default {
  data() {
    return {
      videoUrl: [], // [{src: 'abc.mp4'}] 视频地址格式
      canSubmit: false,
    }
  },
  mounted(){
  	if(!!this.eggInfo.zoneFile){
  		let obj = {src: this.eggInfo.zoneFile};
  		this.videoUrl = [obj];
  	}
  },
  components: {
    'my-player': myPlayer,
  },
  computed: {
    ...mapGetters(['eggInfo']),
  },
  watch: {
    videoUrl(newVal, oldVal) {
      this.canSubmit = newVal.length > 0;
    },
  },
  methods: {
    ...mapActions({
      updateEggInfoByKey: 'updateEggInfoByKey',
    }),
    next() {
      if (!this.canSubmit) {
        return;
      }
      this.updateEggInfoByKey({ zoneFile: this.videoUrl[0].src });
      this.$router.push({
        path: '/collection/putEggStep2'
      });
    },
    uploadVideo(e) {
      var self = this;
      try {
        if (e.target.files.length != 1) {
          return;
        }
        console.log(e.target.files);
        Indicator.open({
          text: '上传中',
          spinnerType: 'fading-circle'
        });
        let file = e.target.files[0];
        /* eslint-disable no-undef */
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name) // 通过append向form对象添加数据
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 1000 * 60,
        }
        axios.post('http://cs.juanzisc.com:9000/userServer/OSSClientFileImport', param, config)
          .then((res) => {
            var res = res.data;
            let obj = { src: res.data[0].fileName };
            this.videoUrl = [obj];
            Indicator.close();
            _.alert('上传成功');
            this.$refs.file.value = '';
          }).catch((err) => {
            Indicator.close();
            _.alert('上传失败，请重试');
          });
      } catch (e) {
        Indicator.close();
      }
    },
  }
}

</script>
<style scoped lang="scss">
.file-input {
  position: absolute;
  left: -99999px;
  top: -99999px;
  width: 100px;
  height: 20px;
  opacity: 0;
  overflow: visible;
  z-index: -1;
}

.page {
  width: 100%;
  height: 100%;
  background: #FFF;
}

.video-box {
  display: block;
  margin: 60px auto;
  width: 630px;
  height: 340px;
  border: 3px dashed #C4CACD;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  .video-box-placeholder {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .icon-player {
      margin: 119px auto 0 auto;
      width: 59.5px;
      height: 41px;
    }
    .icon-player-desc {
      margin-top: 30px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #C4CACD;
      letter-spacing: 0;
      text-align: center;
      line-height: 31.2px;
    }
  }
  .player-box {
    width: 100%;
    height: 100%;
  }
}

.upload-video {
  display: block;
  margin: 0 auto;
  width: 450px;
  height: 88px;
  border: 3px solid #F05720;
  border-radius: 44px;
  font-family: PingFangSC-Medium;
  font-size: 36px;
  color: #F05720;
  letter-spacing: 0;
  text-align: center;
  line-height: 88px;
}

.height-60 {
  width: 100%;
  height: 60px;
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
