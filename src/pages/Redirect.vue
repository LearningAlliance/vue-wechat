<template>
	<div class="page">
		Login
	</div>
</template>

<script type="text/javascript">
	// import api from '@/fetch/api.js'
	// import * as _ from '@/util/tool.js'
	export default{
		data (){
			return {}
		},
		created(){
			// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb3101479b8367c05&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect
			// alert(window.location.href);
			// alert(_.getRequest('code'));
			// api.common.getOpenIdByCode({code: code}).then(())
		}
		// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx541da45793175de8&redirect_uri=https%3A%2F%2Fgateway.medtap.cn%2fwechat%2fauth%3ftype%3dSUPER_MARKET&response_type=code&scope=snsapi_userinfo&state=random4#wechat_redirect
	}
</script>

<style scoped lang="scss">
	
</style>