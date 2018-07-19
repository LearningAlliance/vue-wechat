<template>
  <div class="page">
    <user-card></user-card>
    <user-group :cell-lists="cellLists1"></user-group>
  </div>
</template>
<script type="text/javascript">
import userCard from '@/components/userCard'
import userGroup from '@/components/userGroup'
import { mapGetters } from 'vuex'
import api from '../fetch/api.js'

export default {
  data() {
    return {
      cellLists1: [
        { link: '', iconUrl: 'http://hzzly.net/xyy-vue/images/user-cert.png', text: '学生认证', desc: '', badg: '', more: true },
        { link: 'user/info', iconUrl: 'http://hzzly.net/xyy-vue/images/user-detail.png', text: '我的详情', desc: '', badg: '', more: true },
        { link: 'user/msg', iconUrl: 'http://hzzly.net/xyy-vue/images/user-message.png', text: '消息通知', desc: '', badg: '4', more: true },
      ]
    }
  },
  components: {
    'user-card': userCard,
    'user-group': userGroup,
  },
  created() {
    api.getUserInfo({ userId: 33 }).then((res) => {
      let userInfo = res.data[0];
      this.$store.dispatch('setUserInfo', userInfo);
    });
  },
  mounted() {
    console.log(this.$route);
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
