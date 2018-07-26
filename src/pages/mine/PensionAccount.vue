<template>
  <div class="page">
    <pension-card></pension-card>
    <pension-list></pension-list>
    <div class="footer">
      <div class="footer-btn" @click="toExchange">兑换养老金</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import pensionCard from '@/components/pensionCard'
import pensionList from '@/components/pensionList'

export default {
  data() {
    return {}
  },
  components: {
    'pension-card': pensionCard,
    'pension-list': pensionList,
  },
  computed: {
    ...mapGetters([
      'headerRightFun'
    ]),
  },
  watch: {
    headerRightFun(val, oldVal) {
      if (!!val) {
        this[val] && this[val]();
      }
    },
  },
  methods: {
    toList() {
      this.$store.dispatch('setHeaderRightFun', '');
      this.$router.push('/mine/pensionList');
    },
    toExchange() {
      _.alert('TODO 跳转到兑换养老金页面')
    },
  },
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.footer {
  width: 100%;
  height: 120px;
  background: #FFF;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  .footer-btn {
    width: 570px;
    height: 88px;
    margin: 16px auto 0 auto;
    background: #F05720;
    border-radius: 44px;
    font-family: PingFangSC-Semibold;
    font-size: 36px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 88px;
  }
}

</style>
