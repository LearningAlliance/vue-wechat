<template>
  <div class="alert">
    <div class="text">
      {{alertMsg}}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: mapState({
    alertMsg: state => state.com.alertMsg
  })
}

</script>
<style lang="scss" scoped>
.alert {
  z-index: 9999;
  position: fixed;
  padding: 18px 40px;
  line-height: 1.4;
  font-size: 48px;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%,-50%);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.8);
  .text {
    font-size: 14px;
    color: #fff;
  }
}
</style>
