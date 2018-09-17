<template>
  <div class="page">
    <div class="margin-top-20"></div>
    <div class="group">
      <div class="cell">
        <label for="file">
          <div class="cell-div clearfix has-avatar">
            <div class="cell-l has-avatar">
              <span class="text margin-left-0">头像</span>
            </div>
            <div class="cell-r right-0 has-avatar">
              <span class="avatar" v-show="userInfo.userHead"><img :src="userInfo.userHead" alt="" /></span>
              <img src="../../assets/images/ic_back_right@2x.png" class="more" alt="">
            </div>
          </div>
        </label>
      </div>
      <div class="cell">
        <router-link to="/mine/modifyUserNick" class="clearfix no-border">
          <div class="cell-l">
            <span class="text margin-left-0">昵称</span>
          </div>
          <div class="cell-r right-0">
            <span class="text">{{userInfo.userNick}}</span>
            <img src="../../assets/images/ic_back_right@2x.png" class="more" alt="">
          </div>
        </router-link>
      </div>
    </div>
    <!-- <user-group :cell-lists="cellLists2"></user-group> -->
    <user-group :cell-lists="cellLists1"></user-group>
    <input id="file" ref="file" name="file" class="file-input" @change="uploadPic" accept="image/*" type="file" />
  </div>
</template>
<script type="text/javascript">
import userGroup from '@/components/group'
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import { Indicator } from 'mint-ui'
import * as conf from '@/config/index'

export default {
  data() {
    return {
      cellLists2: [
        { link: '', iconUrl: null, text: '头像', desc: '', badg: '', more: true, avatar: '' },
        { link: '', iconUrl: null, text: '昵称', desc: '', badg: '', more: true },
      ],
      cellLists1: [
        { link: '', iconUrl: null, text: '姓名', desc: '', badg: '', more: false },
        { link: '', iconUrl: null, text: '性别', desc: '', badg: '', more: false },
        { link: '', iconUrl: null, text: '身份证', desc: '', badg: '', more: false },
        { link: '', iconUrl: null, text: '出生年月', desc: '', badg: '', more: false },
      ]
    }
  },
  components: {
    'user-group': userGroup,
  },
  created() {

  },
  mounted() {
    let { userName, userSex, idcardNo, userBirthday, userNick, userHead } = this.userInfo;
    if (userName.length > 0) {
      let len = userName.length;
      let temp = [];
      for (let i = 0; i < len - 1; i++) {
        temp.push('*')
      }
      this.cellLists1[0].desc = userName.replace(userName.substring(1, len), temp.join(''));
    }
    if (userSex != null && userSex != undefined) {
      this.cellLists1[1].desc = userSex == 1 ? '男' : '女';
    }
    this.cellLists1[2].desc = !!idcardNo ? idcardNo.replace(idcardNo.substring(4, 14), "************") : '';
    this.cellLists1[3].desc = !!userBirthday ? userBirthday.slice(0, 10) : '';

    // this.cellLists2[0].avatar = userHead;
    // this.cellLists2[1].desc = !!userNick ? userNick : '';
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'userInfo'
    ])
  },
  methods: {
    changeAvatar() {
      _.alert('选择相册图片开发中');
    },
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
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 1000 * 60,
        }
        axios.post(`${conf.baseUrlPro}/userServer/OSSClientFileImport`, param, config)
          .then((res) => {
            var res = res.data;
            // console.log(res);
            this.setAvatar(res.data[0].fileName);
            Indicator.close();
          }).catch((err) => {
            Indicator.close();
            _.alert('上传失败，请重试');
          });
      } catch (e) {
        Indicator.close();
      }
    },
    setAvatar(avatar) {
      api.user.updateUserHead({
        userHead: avatar,
      }).then((res) => {
        _.alert('修改头像成功');
        api.user.getUserInfo().then((res) => {
          let userInfo = res.data[0];
          this.$store.dispatch('setUserInfo', userInfo);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        _.alert('修改头像失败，请重试');
      })
    }
  },
}

</script>
<style scoped lang="scss">
.margin-top-20 {
  width: 100%;
  height: 20px;
  background: #F8F8FC;
}

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

.group {
  margin-bottom: 20px;
}

.cell {
  position: relative;
  background: #fff;
  a,
  .cell-div {
    display: block;
    height: 88px;
    line-height: 88px;
    margin: 0 30px 0 30px;
    border-bottom: 1px solid #E2E2E2;
    /*no*/
    position: relative;
    box-sizing: border-box;
    &.has-avatar {
      height: 176px;
    }
    .cell-l {
      display: inline-block;
      float: left;
      height: 88px;
      vertical-align: middle;
      &.has-avatar {
        height: 176px;
        line-height: 176px;
      }
      .cell-icon {
        width: 40px;
        height: 40px;
        vertical-align: middle;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 36.4px;
        margin-left: 20px;
        &.margin-left-0 {
          margin-left: 0;
        }
      }
    }
    .cell-r {
      position: absolute;
      top: 0;
      right: -10px;
      display: inline-block;
      height: 88px;
      vertical-align: middle;
      &.right-0 {
        right: 0;
      }
      &.has-avatar {
        height: 176px;
        line-height: 176px;
      }
      .text {
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: right;
        line-height: 36.4px;
        vertical-align: middle; // margin-right: 10px;
      }
      .more {
        width: 50px;
        height: 50px;
        vertical-align: middle;
      }
      .badg {
        display: inline-block;
        color: #fff;
        height: 30px;
        font-size: 24px;
        line-height: 30px;
        text-align: center;
        padding-left: 10px;
        padding-right: 10px;
        background: #F05720;
        border-radius: 20px;
        vertical-align: middle;
      }
      .avatar {
        display: inline-block;
        width: 120px;
        height: 120px;
        border-radius: 120px;
        overflow: hidden;
        vertical-align: middle;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  & .no-border {
    border: none;
  }
}

</style>
