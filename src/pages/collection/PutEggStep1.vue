<template>
  <div class="page">
  	<zone-type-one :remark="eggInfo.desc" v-if="eggInfo.zoneType == 1"></zone-type-one>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import zoneTypeOne from '@/components/putEgg/zoneTypeOne'
import zoneTypeTwo from '@/components/putEgg/zoneTypeTwo'
import zoneTypeThree from '@/components/putEgg/zoneTypeThree'
export default {
  computed: {
    ...mapGetters(['eggInfo']),
  },
  components: {
  	'zone-type-one': zoneTypeOne,
  	'zone-type-two': zoneTypeTwo,
  	'zone-type-three': zoneTypeThree,
  },
  mounted() {

  },
  data() {
    return {

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
