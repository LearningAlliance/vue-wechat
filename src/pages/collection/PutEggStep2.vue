<template>
  <div class="page">
    <re-type-one :remark="eggInfo.desc" v-if="eggInfo.reType == 1"></re-type-one>
    <re-type-two :remark="eggInfo.desc" v-if="eggInfo.reType == 2"></re-type-two>
    <re-type-four :remark="eggInfo.desc" v-if="eggInfo.reType == 4"></re-type-four>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import reTypeOne from '@/components/putEgg/reTypeOne'
import reTypeTwo from '@/components/putEgg/reTypeTwo'
import reTypeFour from '@/components/putEgg/reTypeFour'
export default {
  computed: {
    ...mapGetters(['eggInfo']),
  },
  components: {
    're-type-one': reTypeOne,
    're-type-two': reTypeTwo,
    're-type-four': reTypeFour,
  },
  mounted() {
    let { shopId } = this.$route.query;
    if (this.isAllEmpty()) {
      this.$router.replace({
        path: '/collection/putEgg',
        query: {
          shopId,
        },
      });
    }
  },
  data() {
    return {

    }
  },
  methods: {
    isAllEmpty() {
      if (!this.eggInfo['shopId']) {
        return true;
      }
      if (!this.eggInfo['zoneType']) {
        return true;
      }
      if (!this.eggInfo['reType']) {
        return true;
      }
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #FFF;
}

</style>
