<template>
  <div class="page">
    <user-card></user-card>
  </div>
</template>
<script type="text/javascript">
import userCard from '@/components/userCard'
import { mapGetters } from 'vuex'
import api from '../fetch/api.js'

export default {
  data() {
    return {}
  },
  components: {
    'user-card': userCard
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
