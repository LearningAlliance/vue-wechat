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
	data: JSON.stringify({
		url: location.href.split('#')[0],
	})
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