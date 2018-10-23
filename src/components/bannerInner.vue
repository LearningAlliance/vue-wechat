<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in list" @click="toUrl(item.url)">
        <img class="banner-img" :src="item.img" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    list: {
      default: [],
    }
  },
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      autoplay:true,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }　　　　
    });
  },
  methods: {
    toUrl(url) {
      if (!url) {
        return;
      }
      if (url.indexOf('http') > -1) {
        window.location.href = url;
      } else {
        this.$router.push(url);
      }
      // window.location.href = url;
    },
  }
}

</script>
<style scoped lang="scss">
.banner-img {
  width: 100%;
  height: 100%;
}

</style>
