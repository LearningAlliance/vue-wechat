<template>
  <div class="page">
    <div class="height-100"></div>
    <div class="time">{{currentTime}}</div>
    <div class="wave-box">
      <wave :on="on"></wave>
    </div>
    <div class="record-btn">
      <div :class="['icon-record-btn', {'with-shadow': !on}]" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove"></div>
      <div v-if="!!localId" :class="['icon-record-play', {'with-shadow': !play}]" @touchstart="touchPlay" @touchend="touchPlayEnd"></div>
      <div v-if="!!localId" class="icon-record-desc">播放</div>
    </div>
    <!-- <div :class="['submit-btn', {'on': canSubmit}]" @click="next">下一步</div> -->
    <div :class="['submit-btn', {'on': !!audioUrl}]" @click="next">下一步</div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import { mapGetters, mapActions } from 'vuex'
import wave from '@/components/animation/wave'
export default {
  computed: {
    ...mapGetters(['eggInfo']),
    currentTime() {
      return `${this.m < 10 ? '0' + this.m : this.m}:${this.s < 10 ? '0' + this.s : this.s}:${this.ms < 10 ? '0' + this.ms : this.ms}`;
    },
  },
  data() {
    return {
      // currentTime: '00:16:50',
      shopId: null,
      on: false,
      play: false,
      canSubmit: true,
      clientX_start: null,
      clientY_start: null,
      // audioUrl: 'http://m10.music.126.net/20180914170902/95ccd17f5936b34882d206b140665944/ymusic/afec/8b3a/6745/ec2c0046e5a80032f377012448795bb2.mp3',
      audioUrl: '',
      m: 0, // 分
      s: 0, // 秒
      ms: 0, // 毫秒
      timer: null,
      localId: '', // 本地的音频文件id
    }
  },
  components: {
    wave,
  },
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
  },
  methods: {
    ...mapActions({
      saveEgg: 'saveEgg',
      updateEggInfoByKey: 'updateEggInfoByKey',
    }),
    timerFun() {
      this.ms += 1;
      if (this.ms == 100) {
        this.s++;
        this.ms = 0;
      }
      if (this.s == 60) {
        this.m++;
        this.s = 0;
      }
      if (this.m == 2) {
        _.alert('不能更长了~');
        this.on = false;
        this.stopRecord();
        clearInterval(this.timer);
      }
    },
    resetTimer() {
      clearInterval(this.timer);
      this.m = 0;
      this.s = 0;
      this.ms = 0;
    },
    touchStart(ev) {
      _.alert('开始录音, 上滑可取消');
      ev = ev || event;
      ev.preventDefault();
      this.on = true;
      this.startRecord();
      // reset timer
      this.m = 0;
      this.s = 0;
      this.ms = 0;
      this.timer = setInterval(this.timerFun, 10);

      let { clientX, clientY } = ev.touches[0];
      this.clientX_start = clientX;
      this.clientY_start = clientY;
    },
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      this.on = false;
      clearInterval(this.timer);
      this.stopRecord();
    },
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      let { clientX, clientY } = ev.changedTouches[0];
      // console.log(clientX, clientY);
      if (!this.clientY_start) {
        return;
      }
      // if (Math.abs(clientY - this.clientY_start) > 100) {
      if (this.clientY_start - clientY > 100) {
        _.alert('上划取消录音');
        this.clientX_start = null;
        this.clientY_start = null;
        this.on = false;
        this.stopRecord(true);
        this.resetTimer();
      }
    },
    next() {
      // TODO 通过audioUrl 判断是否能够正常提交
      if (!this.audioUrl) {
        _.alert('请上传语音后再进行下一步');
        return;
      }
      this.updateEggInfoByKey({ zoneFile: this.audioUrl });
      if (!this.eggInfo['reType']) {
        let router = this.$router;
        this.saveEgg({
          router,
          shopId: this.shopId,
        });
        return;
      }
      this.$router.push({
        path: '/collection/putEggStep2',
        query: {
          shopId: this.shopId,
        }
      });
    },
    startRecord(flag) {
      if (flag) {
        // 取消录音则 不上传
        return;
      }
      var self = this;
      // this.$wechat.startRecord({
      //   success: function() {
      //     console.log('wx.startRecord success');
      //   },
      //   cancel: function() {
      //     // _this.oRecordInfo.bShowRecording = false;
      //   }
      // });
      this.$wechat.startRecord();
      this.$wechat.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function(res) {
          var localId = res.localId;

        }
      });
    },
    stopRecord(flag) {
      // 取消的时候需要置空逻辑等
      // TODO
      // flag == true时 不执行替换音频操作
      if (!!flag) {
        return;
      }
      var self = this;
      this.$wechat.stopRecord({
        success: function(res) {
          console.log('stopRecord', res);
          let { localId = '' } = res;
          self.localId = localId;
          console.log('stopRecord success')
          self.uploadVoice();
        },
        fail: function(res) {
          console.log(JSON.stringify(res))
        }
      });
    },
    uploadVoice() {
      var self = this;
      console.log('up:' + self.localId);
      this.$wechat.uploadVoice({
        localId: self.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          var serverId = res.serverId; // 返回音频的服务器端ID
          // console.log('uploadVoice: ' + serverId);
          // alert('uploadVoice: ' + serverId);
          self.getUrlFromOss(serverId);
          // 测试
          // self.getUrlFromOss('pq5E5PnzGuAo23eZQSu3IQQToR2w6WgBEzfZnNqcGxWGnVHUQT6yONU4TvW9mR9f');
        }
      });
    },
    getUrlFromOss(serverId) {
      api.common.getWechatmedia({
        serverid: serverId,
      }).then((res) => {
        console.log(res);
        let { url = '' } = res.data[0];
        if (!!url) {
          this.audioUrl = url;
        }
      }).catch((err) => {});
    },
    touchPlay(ev) {
      var self = this;
      ev = ev || event;
      ev.preventDefault();
      this.play = true;
      if (!this.localId) {
        _.alert('请先录制音频后再试听');
        return;
      }
      _.alert('试听中');
      this.$wechat.playVoice({
        localId: self.localId, // 需要播放的音频的本地ID，由stopRecord接口获得
      });
    },
    touchPlayEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      this.play = false;
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #FFF;
}

.wave-box {
  margin: 0 auto;
  margin-top: 114.6px;
  width: 570px;
  height: 100px;
}

.record-btn {
  position: relative;
  margin: 0 auto;
  padding-top: 226px;
  width: 100%;
  height: 160px;
  box-sizing: border-box;
  .icon-record-desc {
    position: absolute;
    top: 322px;
    right: 145px;
    width: 80px;
    height: 32px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #C4CACD;
    letter-spacing: 0;
    text-align: center;
    line-height: 31.2px;
  }
  .icon-record-play {
    cursor: pointer;
    position: absolute;
    top: 232px;
    right: 145px;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    overflow: hidden;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/icon_record_play.png');
  }
  .icon-record-btn {
    cursor: pointer;
    position: absolute;
    top: 226px;
    left: 50%;
    margin-left: -80px;
    width: 160px;
    height: 160px;
    border-radius: 80px;
    overflow: hidden;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/icon_record_btn.png');
    transition: all ease 0.3s;
    -webkit-transition: all ease 0.3s;
    -moz-transition: all ease 0.3s;
    -o-transition: all ease 0.3s;
  }
}

.height-100 {
  height: 100px;
}

.time {
  font-family: PingFangSC-Medium;
  font-size: 64px;
  color: #2E3141;
  letter-spacing: 0;
  text-align: center;
  line-height: 62.4px;
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
