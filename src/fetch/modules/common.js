import {
	post,
	get
} from '../method.js';

// 授权页面获取openid
// 获取用户微信openId和支付宝userId
export const getOpenIdByCode = (params) => post('/userServer/business/UserInfoAction', {
	action: 'getOpenIdAndUserId',
	data: JSON.stringify(params),
}, {
	body: {
		withToken: false,
		withUid: false,
	}
});

// 微信支付宝自动登录接口， 获取token 和uid
export const wxLogin = (params) => post('/userServer/business/UserInfoAction', {
	action: 'wxLogin',
	data: JSON.stringify(params),
}, {
	body: {
		withToken: false,
		withUid: false,
	}
})

// 根据openId获取token
// 参数userWecharId
export const getTokenByOpenId = (params) => post('/userServer/business/UserInfoAction', {
	action: 'action',
	data: JSON.stringify(params),
}, {
	body: {
		withToken: false,
		withUid: false,
	}
});

// 获取微信公众号信息 用于 wxconfig
export const getWxConfig = (params) => post('/userServer/business/SysWechatAction', {
	action: 'getSignaTure',
	// data: JSON.stringify({
	// 	url: location.href.split('#')[0],
	// })
	data: JSON.stringify(params),
}, {
	body: {
		withToken: false,
	}
});

// 根据经纬度获取地理位置信息  参数 lon   lat
export const getAddress = (params) => post('/userServer/business/SysGaoDeAction', {
	action: 'getAddress',
	data: JSON.stringify(params),
}, {
	body: {
		withToken: false,
		withUid: false,
	}
});

//根据地址获取经纬度  参数  addres 地址
export const getLonLat = (params) => post('/userServer/business/SysGaoDeAction', {
	action: 'getLonLat',
	data: JSON.stringify(params),
}, {
	body: {
		withToken: false,
		withUid: false,
	}
});

//上传文件
// 直接在组件中请求了

// 从微信服务器获取临时素材存到oss
export const getWechatmedia = (params) => post('/userServer/business/SysWechatAction', {
	action: 'getWechatmedia',
	data: JSON.stringify(params),
});