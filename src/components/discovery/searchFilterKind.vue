<template>
  <div class="box">
    <div class="list clearfix">
    	<div class="list-left"></div>
    	<div class="list-right"></div>
    </div>
    <div class="close-btn" @click="closeModal"></div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  props: {
    closeModal: {
      type: Function,
    }
  },
  data() {
    return {
    	kinds: [],
    }
  },
  mounted() {
  	this.qryShopTypeList(null);
  },
  methods: {
    qryShopTypeList(id) {
      api.collection.qryShopTypeList({ id, }).then((res) => {
        this.kinds = res.data.sort(this.compare);
      }).catch((err) => {})
    },
    compare(x, y) { //比较函数
      if (x.sort < y.sort) {
        return -1;
      } else if (x.sort > y.sort) {
        return 1;
      } else {
        return 0;
      }
    },
  }
}

</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  position: fixed;
  box-sizing: border-box;
  padding-top: 88px;
  padding-bottom: 200px;
  z-index: 998;
}

.list {
  width: 100%;
  height: 100%;
  background: #FFF;
  .list-left{
  	display: inline-block;
  	float: left;
  	width: 40%;
  	height: 100%;
  	background: #F8F8FC;
  }
  .list-right{
  	display: inline-block;
  	float: left;
  	width: 60%;
  	height: 100%;
  	background: #FFF;
  }
}

.close-btn {
  width: 100%;
  height: 100px;
}

</style>
