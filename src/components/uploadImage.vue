<template>
  <div class="upload-box clearfix">
    <div class="upload-inner-box" v-for="(item, index) in picList">
      <div class="upload-cell">
        <img :src="item" />
      </div>
    </div>
    <div class="upload-inner-box">
      <label for="file" class="upload-cell add"></label>
    </div>
    <input id="file" name="file" class="file-input" @change="onFileChange" accept="image/*" type="file">
  </div>
</template>
<script type="text/javascript">
import config from '@/config'
export default {
  data() {
    return {
      url: `${config.baseUrlPro}/userServer/OSSClientFileImport`,
      picList: [],
    }
  },
  mounted() {

  },
  methods: {
    onFileChange(e) {
      console.log(e);
      let { files, value } = e.target;
      console.log(files);
      console.log(files.length);
      if (files.length == 1) {
        // this.picList.push(value);
        this.onReadIn(files[0]);
      }
    },
    onReadIn(fileObj) {
      console.log(fileObj);
      let file = fileObj.file;
      let param = new FormData() // 创建form对象
      param.append('file', file, file.name) // 通过append向form对象添加数据
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 1000 * 60,
      }
      this.$axios.post(this.url, param, config)
        .then((res) => {
          console.log(res);
          // var item = res.data.data[0].fileName;
          console.log(item);
        }).catch(error => {})
    },

  },
}

</script>
<style scoped lang="scss">
.file-input {
  position: absolute;
  left: -9999px;
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


    .upload-cell {
      display: inline-block;
      width: 210px;
      height: 210px;
      background: #F8F8FC;
      border-radius: 2px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
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
