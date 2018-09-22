<template>
  <div class="page">
    <open-success :visible="showSuccess" :close-modal="closeModal"></open-success>
    <!-- reType -->
    <!--       
      绿色套餐  1
      蓝色碎片  2
      粉色代金券  3
      红色红包  4
       -->
    <div :class="['top-img', {'re-type-1': info.reType == 1,'re-type-2': info.reType == 2,'re-type-3': info.reType == 3,'re-type-4': info.reType == 4, }]">
      <div class="top-right" v-if="info.reType == 1">
        <div class="combo-title">核销套餐</div>
        <div class="combo-name">{{info.name}}</div>
      </div>
      <div class="top-right" v-if="info.reType == 2">
        <div class="chip-title">夺宝碎片1个</div>
        <div class="chip-name">{{info.name}}</div>
      </div>
      <div class="top-right" v-if="info.reType == 3">
        <div class="amount"><span class="currency">￥</span><span class="price">{{info.price || 0}}</span></div>
        <div class="limit">{{info.name}}(满{{info.amount}}可用)</div>
      </div>
      <div class="top-right" v-if="info.reType == 4">
        <div class="amount"><span class="currency">￥</span><span class="price">{{info.price || 0}}</span></div>
        <div class="limit">获得红包</div>
      </div>
    </div>
    <div class="egg-header">
      <img class="avatar" :src="info.userHead || require('../../assets/images/icon_user_default.png')" />
      <div class="user-info clearfix">
        <span class="user-name">{{info.userName}}</span>
        <span class="create-time">{{info.createDate || ''}}</span>
      </div>
    </div>
    <div class="egg-content">
      <div>
        <z-character v-if="info.zoneType == 1" :remark="info.remark" :info="info"></z-character>
        <z-voice v-if="info.zoneType == 2" :info="info" :audio-url="audioUrl"></z-voice>
        <z-video v-if="info.zoneType == 3" :info="info" :video-url="videoUrl"></z-video>
      </div>
      <div>
        <z-combo v-if="info.reType == 1" :info="info"></z-combo>
        <z-chip v-if="info.reType == 2" :info="info"></z-chip>
        <z-coupon v-if="info.reType == 3" :info="info"></z-coupon>
        <z-red-packet v-if="info.reType == 4" :info="info"></z-red-packet>
      </div>
    </div>
    <div class=""></div>
    <egg-detail-footer :visible="showFooter" :shop-id="shopId"></egg-detail-footer>
  </div>
</template>
<script type="text/javascript">
import openSuccess from '@/components/openSuccess'
import eggDetailFooter from '@/components/eggDetailFooter'
import character from '@/components/zoneType/character'
import voice from '@/components/zoneType/voice'
import video from '@/components/zoneType/video'
import chip from '@/components/reType/chip'
import combo from '@/components/reType/combo'
import coupon from '@/components/reType/coupon'
import redPacket from '@/components/reType/redPacket'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      id: null,
      shopId: null,
      showSuccess: false,
      showFooter: false,
      info: {},
    }
  },
  components: {
    'open-success': openSuccess,
    'egg-detail-footer': eggDetailFooter,
    'z-character': character,
    'z-voice': voice,
    'z-video': video,
    'z-chip': chip,
    'z-combo': combo,
    'z-coupon': coupon,
    'z-red-packet': redPacket,
  },
  mounted() {
    let { id, shopId, success = false, } = this.$route.query;
    this.id = id;
    this.shopId = shopId;
    this.showSuccess = success;
    this.showFooter = success;
    // 延迟一段时间后关闭遮罩
    setTimeout(() => {
      this.showSuccess = false;
    }, 2500);
    this.qryUserZone();
  },
  methods: {
    closeModal() {
      this.showSuccess = false;
    },
    qryUserZone() {
      api.user.getEggDetail({
        id: this.id,
      }).then((res) => {
        this.info = res.data;

        // this.info.zoneType = 2;

        if (this.info.zoneType == 3) {
          this.videoUrl = this.info.file.split(',');
        }
        if(this.info.zoneType == 2){
          // this.audioUrl = 'http://vk88.vka88.com/00006/2017063014590719381_Stay the Night.mp3';
          // this.audioUrl = 'http://p-shop.juanzisc.com/userServer/Wechat/Y9WET1YhY-vw4S6J6BrFz_T1o7a5vt4LaQa-iyV_7ikmkdUFbhqczHaFZKcNq4aw.amr';
          this.audioUrl = this.info.file;
        }

        // // 测试 todo
        // this.info.reType = 1;
        // this.info.zoneType = 2;
      }).catch((err) => {});
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

.egg-header {
  margin-top: 40px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 60px;
  padding-right: 60px;
  height: 80px;
  position: relative;
  .avatar {
    display: block;
    position: absolute;
    top: 0;
    left: 60px;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    overflow: hidden;
  }
  .user-info {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 100px;
    .user-name {
      display: inline-block;
      max-width: 270px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 100%;
      float: left;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 80px;
      margin-right: 20px;
    }
    .create-time {
      display: inline-block;
      height: 100%;
      float: right;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #818B8F;
      letter-spacing: -0.58px;
      line-height: 80px;
    }
  }
}

.top-img {
  margin: 0 auto;
  width: 750px;
  height: 408px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .top-right {
    position: absolute;
    top: 94px;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding-left: 403px;
    padding-right: 30px;
    .chip-title {
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #FEBC02;
      letter-spacing: 0;
      text-align: left;
      line-height: 41.6px;
    }
    .chip-name {
      margin-top: 22px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: left;
      line-height: 31.2px;
    }
    .combo-title {
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #FEBC02;
      letter-spacing: 0;
      text-align: left;
      line-height: 41.6px;
    }
    .combo-name {
      margin-top: 22px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: left;
      line-height: 31.2px;
    }
    .amount {
      height: 72px;
      text-align: left;
      .currency {
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #FEBC02;
        letter-spacing: 0;
        line-height: 78px;
      }
      .price {
        display: inline-block;
        font-family: PingFangSC-Medium;
        font-size: 56px;
        color: #FEBC02;
        letter-spacing: 0;
        line-height: 78px;
      }
    }
    .limit {
      margin-top: 7px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 31.2px;
    }
  }
  &.re-type-1 {
    background-image: url('../../assets/images/img_eggdetail_setmeal.png');
  }
  &.re-type-2 {
    background-image: url('../../assets/images/img_eggdetail_piece.png');
  }
  &.re-type-3 {
    background-image: url('../../assets/images/img_eggdetail_ticket.png');
  }
  &.re-type-4 {
    background-image: url('../../assets/images/img_eggdetail_redbag.png');
  }
}

</style>
