<template>
  <div class="page">
    <div class="banner"></div>
    <safeguard-card :can-use-safeguard="false"></safeguard-card>
    <div class="height-46"></div>
    <family-account></family-account>
  </div>
</template>
<script type="text/javascript">
import safeguardCard from '@/components/safeguardCard'
import familyAccount from '@/components/familyAccount'
import api from '@/fetch/api.js'

export default {
  data() {
    return {}
  },
  created() {
    // 调用接口
    // 设置值，通过该值判断 是否已经完善过信息
    // 显示控制在 safeguard-card 值 ，true 则 正常逻辑， false，则需完善信息
  },
  components: {
    'safeguard-card': safeguardCard,
    'family-account': familyAccount,
  }
}

</script>
<style scoped lang="scss">
.banner {
  margin: 0 auto;
  width: 750px;
  height: 120px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/img_baozhangjin_banner.png');
}
.height-46{
  width: 100%;
  height: 46px;
}

</style>
