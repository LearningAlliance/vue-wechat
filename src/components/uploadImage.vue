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
    <form method="POST" :action="url" ref="form" enctype="multipart/form-data">
      <input id="file" name="file" class="file-input" @change="uploadPic" accept="image/*" type="file" />
      <!-- <input type="text" name="key" /> -->
      <button type="submit">提交</button>
    </form>
  </div>
</template>
<script type="text/javascript">
// import axios from 'axios'
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
    uploadPic(e) {
      console.log(e.target);
      let file = e.target.files[0]
      /* eslint-disable no-undef */
      let param = new FormData() // 创建form对象
      param.append('file', file, file.name) // 通过append向form对象添加数据
      // param.append('chunk', '0') // 添加form表单中其他数据
      // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去

      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      // 添加请求头
      axios.post('http://cs.juanzisc.com:9000/userServer/OSSClientFileImport', param, config)
        .then(response => {
          console.log("222222");
          if (response.data.code === 0) {
            console.log(response.data.data);
          }
          console.log(response.data)
        })
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
