<template>
  <div class="page">
    <user-card></user-card>
    <user-group :cell-lists="cellLists1"></user-group>
  </div>
</template>
<script type="text/javascript">
import userCard from '@/components/userCard'
import userGroup from '@/components/group'
import { mapGetters } from 'vuex'
import api from '../fetch/api.js'

export default {
  data() {
    return {
      cellLists1: [
        { link: '/mine/userinfo', iconUrl: require('@/assets/images/ic_my_info.png'), text: '个人信息', desc: '', badg: '', more: true },
        { link: '/mine/pensionAccount', iconUrl: require('@/assets/images/ic_my_account.png'), text: '养老金账户', desc: '', badg: '', more: true },
        { link: '', iconUrl: require('@/assets/images/ic_my_huiyuan.png'), text: '会员中心', desc: '签到奖励', badg: '', more: true },
        { link: '/mine/myOrder', iconUrl: require('@/assets/images/ic_my_odering.png'), text: '我的订单', desc: '', badg: '', more: true },
        { link: '/mine/myeggs', iconUrl: require('@/assets/images/ic_my_egg.png'), text: '我的彩蛋', desc: '', badg: '', more: true },
        { link: '/mine/voucher', iconUrl: require('@/assets/images/ic_my_ticket.png'), text: '我的优惠券', desc: '', badg: '', more: true },
        { link: '/mine/userSettings', iconUrl: require('@/assets/images/ic_my_setting.png'), text: '设置', desc: '', badg: '', more: true },
      ]
    }
  },
  components: {
    'user-card': userCard,
    'user-group': userGroup,
  },
  created() {
    api.user.getUserInfo().then((res) => {
      let userInfo = res.data[0];
      this.$store.dispatch('setUserInfo', userInfo);
    });
  },
  mounted() {

  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'userInfo'
    ])
  },
  methods: {

  },
}

</script>
<style scoped lang="scss">


</style>
