<template>
  <div class="page">
    <div class="margin-top-20"></div>
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

    this.cellLists2[0].avatar = userHead;
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
.margin-top-20 {
  width: 100%;
  height: 20px;
  background: #F8F8FC;
}
</style>
