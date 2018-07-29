<template>
  <div class="page">
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {

    }
  },
  created() {
    let id = this.$route.query.id;
    this.getInfo(id);
  },
  methods: {
    getInfo(id) {
      api.user.getEggDetail().then((res) => {

      })
    }
  }
}

</script>
<style scoped lang="scss">


</style>
