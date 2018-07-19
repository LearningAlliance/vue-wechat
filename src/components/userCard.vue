<template>
  <div class="section">
    <div class="card">
      <div class="sign-in-box">已签到</div>
      <div class="avatar">
      	<!-- <image v-bind:src="userInfo.userHead" /> -->
      	<img v-bind:src="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532006746195&di=47e74eb4ed8a7b8e3befe47b19575533&imgtype=0&src=http%3A%2F%2Fcdnq.duitang.com%2Fuploads%2Fblog%2F201504%2F03%2F20150403225532_Jtxak.thumb.700_0.png'" />
      </div>
      <div class="user-name">
      	<span>{{userInfo.userNick}}</span>
      	<span>{{userInfo.userSex | showUserSex}}</span>
      </div>
      <div class="level">
      	青铜会员
      </div>
      <div class="box">
      	<div class="box-left">
      		<p>保障金(元)</p>
      		<p>2147.38</p>
      	</div>
      	<div class="box-right">
      		<p>积分</p>
      		<P>32310</P>
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
    ])
  },
  filters: {
    showUserSex: function(value) {
      value = value.toString();
      if (value == '1') {
        return '男';
      } else if (value == '0') {
        return '女';
      }
      return '';
    }
  }
}

</script>
<style lang="scss" scoped>
.section {
  width: 100%;
  height: 536px;
  background: #fff;
  .card{
  	position: relative;
  	margin: 30px auto;
  	width: 690px;
  	height: 476px;
  	background-size: 100% 100%;
  	background-repeat: no-repeat;
  	// background-image: url('')
  	border: 1px solid red;
  	.avatar{
  		width: 150px;
  		height: 150px;
  		margin: 40px auto 20px auto;
  		img{
  			display: block;
  			width: 100%;
  			height: 100%;	
  			border-radius: 100%;
  		}
  	}
  }
}

</style>
