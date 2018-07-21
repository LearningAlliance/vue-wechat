<template>
  <div class="page">
    <div class="group">
      <div class="input-box">
        <input class="input" ref="userName" type="text" autofocus="autofocus" v-model="tempNick" />
        <i class="icon-cancel" v-show="tempNick.length > 0" @click="clear"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'

export default {
  data() {
    return {
      tempNick: '',
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'headerRightFun'
    ]),
  },
  watch: {
    headerRightFun(val, oldVal) {
      if(!!val){
      	this[val] && this[val]();
      }
    }
  },
  mounted() {
    this.tempNick = this.userInfo.userNick;
  },
  methods: {
  	updateUserNick(){
  		if(!this.tempNick){
  			_.alert('请先填写昵称再保存~');
  			this.$store.dispatch('setHeaderRightFun', '');
  			return;
  		}
  		api.user.updateUserNick({
  			userNick: this.tempNick
  		}).then((res) => {
  			this.$store.dispatch('setHeaderRightFun', '');
  			// res.data[0]中为新的用户信息
  			this.$store.dispatch('setUserInfo', res.data[0]);
  			this.$router.history.go(-1);
  		}).catch((err) => {
  			console.log(err);
  			this.$store.dispatch('setHeaderRightFun', '');
  		})
  	},
  	clear(){
  		this.tempNick = '';
  	},
  }
}

</script>
<style scoped lang="scss">
.group {
  margin-top: 20px;
  width: 100%;
  .input-box {
    width: 100%;
    height: 88px;
    background: #fff;
    position: relative;
    .input {
      width: 100%;
      height: 88px;
      line-height: 88px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      padding-left: 30px;
      padding-right: 100px;
      border: none;
      box-sizing: border-box;
    }
    .icon-cancel {
      display: block;
      position: absolute;
      width: 40px;
      height: 40px;
      top: 24px;
      right: 30px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA3ZJREFUWAntmE1rE0EYxzdpUiIKPSXEhFTEmxcRP4CIB03xA9i0R7+BxYuoFfGmiN/BKj1bGgX9CCIeevCgYJrGkFtAJSFv/v9xJszszsxuXpHSB4bdmXlefjtvu8963okc8xGITfp89Xr9dKfTuQH7NZQLKDlRcPFqonzDdT+ZTL7PZrO/2TGujA14dHR0ud/vPxgMBkUES0UM2IrFYuV4PP4kn89/jmgzVIsMWKvVzvV6vaewKgEusp0KA8gB6q+Xlpbu53K5H2qf7T5SoMPDwyKg3sDJis3RmO1NwK4XCoVymF08TKFSqdyFzh7KrOAYkr72hG/WreIcQeHgmdV6Nh1bq6urz22urICcVhjtYWpDR9nmPEo7proPvVu26TYCckN0u90vMJzltLp4m4lE4pJp4xhHR+zWRcERfEXEDDxEAJDnHLRKAU3RgCn5g9sPtn5TO2y+spj6lLaSiK00eV4AEIfwQ8c510Egrpeb8LKrebJUCJZKpa6xQOW7Rc1jTL4A/P0aIF9fUGRwmyTRfxVBe4DcgJITUsKl0+mf7Xb7IupnbY7ZDt9FMqg6GqB4tzpfX3DyCDt8OwxShatWq9dh9xbllBrccJ8SDKMuDRCtfPGHShjkhHAyrsbgB+RXSSSxQU4Jx9gaQ8JHw0+myCIgPUBt434DU1nBZnjBNTfGtPrjaQxTAdKzConqPbZNAUdzDdA/xVSYRG43Go0z0hDHxSbAwzaEVHde/YD8Eh5L5JrLZDK/cEScpzGOoDu4OI8gRxCNYSpACSfXHI6IgyhHkAOOXU5A5hCRxA+HKR2ec2JNhp6TjiAag38E9x2Goy4bnFSYElJj0ACZfSFISwYyXcPgpM2EkC3BIN3oHwtMDQHwbtQbvOksLy+vyTUnpzWo9q/FAHlg02U7Ypf96Wngg1WklZ/gPNAnnHxE+vgSR8kudCIdJQj8mLYE5tUk0BnA7xV/WmqEwE58BWf8WlmYAHAHx9OmP6C2BmUn81bcN2V9AdemiBkIZQRkboAnWkdhQjNXYQzGMuUjDGwEZAeGu4xpHr5bWZ+XMAZj2fxbAWkg8tWteYyk8OnMiclg3CTsUIU5Mp70//z1QVBOAfNWPPUOCn8ATSS0pQ/6ck2r6jzSCKoG4pxk5sfkypm/KHbz//2mBBveLuoHpj/uSf3YjcBfJDHXec85L28AAAAASUVORK5CYII=');
    }
  }
}

</style>
