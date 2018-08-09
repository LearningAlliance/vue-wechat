<template>
  <div class="page">
    <user-card></user-card>
    <div class="list">
      <div class="cell with-shadow">
        <img class="image" src="../assets/images/img_jianzheyoufen.png" />
        <span class="desc">已分发 145W 积分</span>
      </div>
      <div class="cell with-shadow">
        <img class="image" src="../assets/images/img_quanmingfenxiang.png" />
        <span class="desc">已分发158939积分</span>
      </div>
      <div class="cell with-shadow">
        <img class="image" src="../assets/images/img_duobaoqibing.png" />
        <span class="desc">已分发158939保障金</span>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import userCard from '@/components/userCard2'
import api from '../fetch/api.js'
export default {
  data() {
    return {}
  },
  components: {
    'user-card': userCard,
  },
  created() {
    api.user.getUserInfo().then((res) => {
      let userInfo = res.data[0];
      this.$store.dispatch('setUserInfo', userInfo);
    }).catch((err)=>{
      console.log(err);
    });
  },
  mounted() {

  },
}

// 730 260
// 690 220

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: #F8F8FC;
  box-sizing: border-box;
  .list {
    width: 690px;
    margin: 0 auto;
    padding-top: 30px;
    .cell {
      width: 690px;
      height: 220px;
      margin-bottom: 30px;
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      .image {
        display: block;
        width: 100%;
        height: 100%;
      }
      .desc {
        position: absolute;
        top: 30px;
        right: 30px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        text-align: right;
        line-height: 36.4px;
      }
    }
  }
}

</style>
