<template>
  <div class="page">
    <div class="remark">{{remark}}</div>
    <!-- <div class="">图片TODO</div> -->
    <show-image :inital-list="picList" :inital-previewer-list="previewList"></show-image>
  </div>
</template>
<script type="text/javascript">
import showImage from '@/components/showImage'
export default {
  props: {
    remark: {
      default: '',
    },
    info: {
      default: '',
    }
  },
    components: {
    'show-image': showImage,
  },
  data() {
    return {
      picList: [],
      previewList: [],
    }
  },
  mounted(){
    // this.info.file = 'http://pic35.photophoto.cn/20150409/0005018337384017_b.jpg,http://pic35.photophoto.cn/20150409/0005018337384017_b.jpg,http://pic35.photophoto.cn/20150409/0005018337384017_b.jpg,http://pic35.photophoto.cn/20150409/0005018337384017_b.jpg,http://pic35.photophoto.cn/20150409/0005018337384017_b.jpg,http://pic35.photophoto.cn/20150409/0005018337384017_b.jpg';
    this.picList = this.info.file.split(',');
    let list = [];
    this.picList.forEach((item) => {
      list.push({src: item});
    });
    this.previewList = list;
    console.log(list);
  },
  methods: {

  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  margin-top: 40px;
}

.remark {
  width: 100%;
  box-sizing: border-box;
  padding-left: 60px;
  padding-right: 60px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 1.4;
}

</style>
