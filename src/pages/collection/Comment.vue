<template>
  <div class="page">
    <div class="remark-box">
      <textarea placeholder="想说的就写下来吧～" class="remark" rows="6" maxlength="140" v-model="remark"></textarea>
    </div>
    <div class="num-box">{{num}}/140</div>
    <div :class="['btn', {'can-submit': num > 0}]" @click="comment">发布</div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      remark: '',
      commentId: null,
    }
  },
  mounted(){
    let {commentId} = this.$route.query;
    this.commentId = commentId;
  },
  computed: {
    num() {
      return this.remark.length;
    }
  },
  methods: {
    comment(){
      if(this.num <= 0){
        _.alert('请写下您的评论~');
        return;
      }else if(this.num >140){
        _.alert('最多可以输入140字，请检查');
        return;
      }
      this.doComment();
    },
    doComment(){
      api.collection.saveShopComment({
        id: this.commentId,
        remark: this.remark,
      }).then((res) => {
        _.alert('发布评论成功~');
        history.go(-1);
      }).catch((err) => {});
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 60px 0 60px;
  background: #FFF;
}

.remark-box {
  width: 100%;
  height: 250px;
  .remark {
    resize: none;
    width: 100%;
    border: none;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #333;
    letter-spacing: 0;
    line-height: 41.6px;
  }
}

.num-box {
  width: 100%;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #C4CACD;
  letter-spacing: 0;
  text-align: right;
  line-height: 36.4px;
}

.btn {
  position: fixed;
  bottom: 120px;
  left: 50%;
  margin-left: -285px;
  width: 570px;
  height: 88px;
  background: #E2E2E2;
  border-radius: 44px;
  text-align: center;
  line-height: 88px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 0;
  &.can-submit {
    background: #F05720;
  }
}

</style>
