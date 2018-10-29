<template>
  <div class="modal-box" v-show="visible">
    <div class="modal" @click="hideModal"></div>
      <div class="phone-item-1" v-if="phoneList.length == 0">
        暂无电话
      </div>
      <div class="phone-item-1" v-for="(item, index) in phoneList" v-if="phoneList.length == 1" :key="index" @click="makePhone(item)">
        {{item}}
      </div>
      <div class="phone-item-2"  v-if="phoneList.length >= 2">
        <div class="item-inner" v-for="(item, index) in phoneList" v-if="index <= 1" :key="index" @click="makePhone(item)">
          {{item}}
        </div>
      </div>
      <div class="cancel-btn" @click="hideModal">取消</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    phoneList: {
      required: true,
      default: [] // 电话列表
    },
    visible: {
      default: true
    },
    hidePhoneCard: {

    }
  },
  data() {
    return {};
  },
  methods: {
    hideModal() {
      this.hidePhoneCard && this.hidePhoneCard();
    },
    makePhone(tel) {
      window.location.href = `tel:${tel}`;
    }
  }
};
</script>
<style lang="scss" scoped>
.phone-item-2 {
  position: absolute;
  width: 96%;
  height: 200px;
  background: #fff;
  bottom: 130px;
  left: 50%;
  margin-left: -48%;
  z-index: 1004;
  border-radius: 20px;
  font-size: 34px;
  color: #4b7dfc;
  .item-inner {
    line-height: 100px;
    text-align: center;
  }
  &::after{
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    /*no*/
    border-top: 1px solid #e0e0e0;/*no*/
  }
}
.phone-item-1 {
  position: absolute;
  width: 96%;
  height: 100px;
  background: #fff;
  line-height: 100px;
  text-align: center;
  bottom: 130px;
  left: 50%;
  margin-left: -48%;
  z-index: 1004;
  border-radius: 20px;
  font-size: 34px;
  color: #4b7dfc;
}
.cancel-btn {
  position: absolute;
  width: 96%;
  height: 100px;
  background: #fff;
  line-height: 100px;
  text-align: center;
  bottom: 15px;
  left: 50%;
  margin-left: -48%;
  z-index: 1004;
  border-radius: 20px;
  font-size: 34px;
  color: #4b7dfc;
}
.modal-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.3);
}
</style>
