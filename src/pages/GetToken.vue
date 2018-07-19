<template>
  <div class="home">
    获取信息页面
    <div>登录状态{{loginStatus}}</div>
    <div>用户信息{{userInfo}}</div>
    <button @click="login">模拟个人信息并登录</button>
    <button @click="loginOut">模拟登出</button>
    <router-link to="/mine">跳转到我的页面</router-link>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import api from '../fetch/api.js'

export default {
  data() {
    return {}
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
    ...mapActions({ setSignIn: 'setSignIn' , setSignOut: 'setSignOut'}),

    login() {
      console.log('login');
      // TODO 登录判断
      api.login({ username: 123, password: 123 }).then((res) => {
        console.log(res);
        // 假设获取了用户数据
        res = {userName: '海娃'};
        this.setSignIn(res);
        // this.$router.replace('/mine');
      });
    },
    loginOut() {
      this.setSignOut();
    }
  }
}

</script>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 200px;
}

</style>
