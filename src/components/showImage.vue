<template>
  <div class="upload-box clearfix">
    <div class="upload-inner-box" v-for="(item, index) in initalList">
      <div class="upload-cell">
        <div class="img-box" @click="preview(index)">
          <div class="img-box-cell">
            <img :src="item" />
          </div>
        </div>
      </div>
    </div>
    <previewer ref="previewer" :list="initalPreviewerList" :options="options"></previewer>
  </div>
</template>
<script type="text/javascript">
import * as conf from '@/config'
import * as _ from '@/util/tool.js'
import { Indicator } from 'mint-ui'
import { Previewer } from 'vux'

export default {
  props: {
    initalList: {
      default: [],
    },
    initalPreviewerList: {
      default: [],
    }
  },
  data() {
    return {
      url: `${conf.baseUrlPro}/userServer/OSSClientFileImport`,
      picList: [],
      previewerList: [],
      imgUrl: '',
      isPreview: false,
      options: {
        isClickableElement: function(el) {
          return /previewer-delete-icon/.test(el.className)
        }
      },
    }
  },
  components: {
    'previewer': Previewer
  },
  mounted() {
    console.log(this.initalPreviewerList);
  },
  methods: {
    preview(index) {
      // this.imgUrl = this.picList[index];
      // this.isPreview = true;
      this.$refs.previewer.show(index)
    },
  },
}

</script>
<style scoped lang="scss">
.file-input {
  position: absolute;
  left: -99999px;
  top: -99999px;
  width: 100px;
  height: 20px;
  opacity: 0;
  overflow: visible;
  z-index: -1;
}

.upload-box {
  padding-top: 30px;
  background: #FFF;
  width: 100%;
  .upload-inner-box {
    float: left;
    display: inline-block;
    width: 25%;
    height: 130px;
    text-align: center;
    margin-bottom: 30px;
    position: relative;
    .upload-cell {
      display: inline-block;
      width: 130px;
      height: 130px;
      background: #F8F8FC;
      border-radius: 2px;
      position: relative;
      overflow: hidden;
      .pic-delete-btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        z-index: 999;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../assets/images/icon_pic_delete.png');
      }
      .img-box {
        display: table;
        width: 100%;
        height: 100%;
        max-height: 210px;
        .img-box-cell {
          display: table-cell;
          vertical-align: middle;
          img {
            width: 100%; // height: 100%;
            height: auto;
            max-height: 100%;
          }
        }
      }
      &.add::after {
        content: '';
        position: absolute;
        width: 68px;
        height: 68px;
        top: 50%;
        left: 50%;
        margin-left: -34px;
        margin-top: -34px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../assets/images/icon_image_add.png');
      }
    }
  }
}

</style>
