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
})