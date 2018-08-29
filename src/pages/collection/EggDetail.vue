<template>
  <div class="page">
    <open-success :visible="showSuccess" :close-modal="closeModal"></open-success>
    <egg-detail-footer :visible="showFooter" :shop-id="shopId"></egg-detail-footer>
  </div>
</template>
<script type="text/javascript">
import openSuccess from '@/components/openSuccess'
import eggDetailFooter from '@/components/eggDetailFooter'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      id: null,
      shopId: null,
      showSuccess: false,
      showFooter: false,
      info: {},
    }
  },
  components: {
    'open-success': openSuccess,
    'egg-detail-footer': eggDetailFooter,
  },
  mounted() {
    let { id, shopId, success = false, } = this.$route.query;
    this.id = id;
    this.shopId = shopId;
    this.showSuccess = success;
    this.showFooter = success;
    // 延迟一段时间后关闭遮罩
    setTimeout(() => {
      this.showSuccess = false;
    }, 2500);
    this.qryUserZone();
  },
  methods: {
    closeModal() {
      this.showSuccess = false;
    },
    qryUserZone() {
      api.user.getEggDetail({
        id: this.id,
      }).then((res) => {
      	this.info = res.data;
      }).catch((err) => {});
    },
  }
}

</script>
<style scoped lang="scss">


</style>
