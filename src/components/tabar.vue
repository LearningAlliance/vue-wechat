<template>
  <div class="tabar" v-show="isShowTabbar">
    <div class="tab clearfix">
      <div class="tab-item">
        <router-link to="/collection">
          <div class="tab-icon"><img :src="routeName == 'collection' ? require('@/assets/images/ic_navfavorite.png') : require('@/assets/images/ic_navfavorite_grey.png')" alt=""></div>
          <div class="tab-text">收藏</div>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/discovery">
          <div class="tab-icon"><img :src="routeName == 'discovery' ? require('@/assets/images/ic_navdiscovery.png') : require('@/assets/images/ic_navdiscovery_grey.png')" alt=""></div>
          <div class="tab-text">发现</div>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/earning">
          <div class="tab-icon"><img :src="routeName == 'earning' ? require('@/assets/images/ic_navincome.png') : require('@/assets/images/ic_navincome_grey.png')" alt=""></div>
          <div class="tab-text">赚赚</div>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/mine">
          <div class="tab-icon"><img :src="routeName == 'mine' ? require('@/assets/images/ic_navmy.png') : require('@/assets/images/ic_navmy_grey.png')" alt=""></div>
          <div class="tab-text">我的</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'routeName',
    ]),
    isShowTabbar() {
      let { showTabar } = this.$route.meta;
      return !!showTabar ? showTabar : false;
    }
  }
}

</script>
<style scoped lang="scss">
.tabar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #fff;
  .tab {
    width: 100%;
    height: 100%;
    line-height: 100px;
    background: #fff;
    &:after {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      content: '';
    }
    .tab-item {
      display: inline-block;
      width: 25%;
      height: 100px;
      float: left;
      text-align: center;
      a {
        width: 100%;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &:hover {
          text-decoration: none;
        }
        &:active {
          text-decoration: none;
        }
        &:link {
          text-decoration: none;
        }
        &:visited {
          text-decoration: none;
        }
        .tab-icon {
          width: 50px;
          height: 50px;
          margin: 0 auto;
          img {
            display: block;
            height: 100%;
            width: 100%;
          }
        }
        .tab-text {
          margin-top: 4px;
          font-size: 22px;
          height: 30px;
          line-height: 30px;
          color: #818B8F;
          letter-spacing: 0;
          text-align: center;
        }
      }
    }
  }
}

</style>
