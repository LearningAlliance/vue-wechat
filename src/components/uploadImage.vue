<template>
  <div class="upload-box clearfix">
    <div class="upload-inner-box" v-for="(item, index) in picList">
      <div class="upload-cell">
        <div class="pic-delete-btn" @click="deletePic(index)"></div>
        <div class="img-box" @click="preview(index)">
          <div class="img-box-cell">
            <img :src="item" />
          </div>
        </div>
      </div>
    </div>
    <div class="upload-inner-box">
      <label for="file" class="upload-cell add"></label>
    </div>
    <input id="file" ref="file" name="file" class="file-input" @change="uploadPic" accept="image/*" type="file" />
    <previewer ref="previewer" :list="previewerList" :options="options"></previewer>
  </div>
</template>
<script type="text/javascript">
import config from '@/config'
import * as _ from '@/util/tool.js'
import { Indicator } from 'mint-ui'
import { Previewer } from 'vux'
import { mapGetters } from 'vuex'

export default {
  props: {
    imgChange: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      url: `${config.baseUrlPro}/userServer/OSSClientFileImport`,
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
  computed: {
    ...mapGetters(['eggInfo']),
  },
  components: {
    'previewer': Previewer
  },
  mounted() {
  	this.picList = !!this.eggInfo.zoneFile ? this.eggInfo.zoneFile.split(',') : [];
  },
  methods: {
    uploadPic(e) {
      var self = this;
      try {
        if (e.target.files.length != 1) {
          return;
        }
        Indicator.open({
          text: '上传中',
          spinnerType: 'fading-circle'
        });
        let file = e.target.files[0];
        /* eslint-disable no-undef */
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name) // 通过append向form对象添加数据
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        axios.post('http://cs.juanzisc.com:9000/userServer/OSSClientFileImport', param, config)
          .then((res) => {
            var res = res.data;
            this.picList.push(res.data[0].fileName);
            this.previewerList.push({ src: res.data[0].fileName });
            this.imgChange(this.picList);
            Indicator.close();
            this.$refs.file.value = '';
          }).catch((err) => {
            Indicator.close();
            _.alert('上传失败，请重试');
          });
      } catch (e) {
        Indicator.close();
      }
    },
    deletePic(index) {
      this.picList.splice(index, 1);
      this.previewerList.splice(index, 1);
      this.imgChange(this.picList);
    },
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
  margin-top: 30px;
  width: 100%;
  .upload-inner-box {
    float: left;
    display: inline-block;
    width: 33%;
    height: 210px;
    text-align: center;
    margin-bottom: 30px;
    position: relative;
    .upload-cell {
      display: inline-block;
      width: 210px;
      height: 210px;
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
