<template>
  <div class="page">
    <div class="user-avatar-box">
      <div class="cell">
        <div class="cell-l">
          <span class="text margin-left-0">头像</span>
        </div>
        <div class="cell-r">
          <span class="avatar"><img :src="userInfo.userHead" alt=""></span>
          <img src="require('@/assets/images/ic_back_right@2x.png)" class="more" alt="">
        </div>
      </div>
    </div>
    <user-group :cell-lists="cellLists2"></user-group>
    <user-group :cell-lists="cellLists1"></user-group>
  </div>
</template>
<script type="text/javascript">
import userGroup from '@/components/group'
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'

export default {
  data() {
    return {
      cellLists2: [
        { link: '', iconUrl: null, text: '昵称', desc: '', badg: '', more: true },
        { link: '', iconUrl: null, text: '头像', desc: '', badg: '', more: true, avatar: '' },
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
    let { userName, userSex, idcardNo, userBirthday, userNick } = this.userInfo;
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

    this.cellLists2[1].desc = !!userNick ? userNick : '';
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'userInfo'
    ])
  },
  methods: {

  },
}

</script>
<style scoped lang="scss">
.cell {
  position: relative;
  background: #fff;
  .cell-l {
    display: inline-block;
    float: left;
    height: 88px;
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
    &.right-0 {
      right: 0;
    }
    .text {
      display: inline-block;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #818B8F;
      letter-spacing: 0;
      text-align: right;
      line-height: 36.4px;
      vertical-align: middle;
      margin-right: 10px;
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
  }
  & .no-border {
    border: none;
  }
}

</style>