<template>
  <div class="section">
    <div class="card">
      <div class="card-box">
        <div class="sign-in-box">已签到</div>
        <div class="avatar">
          <image v-bind:src="userInfo.userHead" />
          <img v-bind:src="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532006746195&di=47e74eb4ed8a7b8e3befe47b19575533&imgtype=0&src=http%3A%2F%2Fcdnq.duitang.com%2Fuploads%2Fblog%2F201504%2F03%2F20150403225532_Jtxak.thumb.700_0.png'" />
        </div>
        <div class="user-name">
          <span>{{userInfo.userNick}}</span>
          <i :class="['user-sex-hidden', userSex]"></i>
        </div>
        <div class="level">
          <div class="level-box">
            <span class="level-text">青铜会员</span>
          </div>
        </div>
        <div class="box">
          <div class="box-left">
            <p class="box-title">保障金(元)</p>
            <p class="box-content">2147.38</p>
          </div>
          <div class="box-right">
            <p class="box-title">积分</p>
            <P class="box-content">32310</P>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {

  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'userInfo'
    ]),
    userSex() {
      let value = this.userInfo.userSex;
      if (value == '1') {
        return 'male';
      } else if (value == '0') {
        return 'female';
      }
      return '';
    }
  },
}

</script>
<style lang="scss" scoped>

</style>
