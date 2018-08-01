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
    let { id } = this.$route.query;
    this.getInfo(id);
  },
  methods: {
    getInfo(id) {
      api.user.getEggDetail({ id, }).then((res) => {

      })
    }
  }
}

</script>
<style scoped lang="scss">


</style>
