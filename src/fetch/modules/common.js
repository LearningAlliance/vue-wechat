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