import {
	post,
	get
} from '../method.js';

/**
 * 用户登录
 */
export const login = (params) => get('/login', params)

/**
 * 获取用户信息
 */
export const getUserInfo = (params) => post('/userServer/business/UserInfoAction', {
	action: 'qryUser'
})

/**
 * 修改用户昵称
 */
export const updateUserNick = (params) => post('/userServer/business/UserInfoAction', {
	action: 'updateNIckName',
	data: JSON.stringify(params),
})

// 获取手机验证码
export const getVerifyCode = (params) => post('/userServer/business/VerifyLogAction', {
	action: 'sendVcode',
	data: JSON.stringify(params),
}, {
	body: {
		withToken: false,
		withUid: false,
	}
})

// 更改手机号
export const updateMobile = (params) => post('/userServer/business/UserInfoAction', {
	action: 'updateMobile',
	data: JSON.stringify(params),
});

// 保障金-完善信息
export const completeInfo = (params) => post('/userServer/business/UserInfoAction', {
	action: 'saveUserInfo',
	data: JSON.stringify(params),
});

// 保障金-转增
export const giveSafeGuard = (params) => post('/userServer/business/UserAccountAction', {
	action: 'giveUserSafeguards',
	data: JSON.stringify(params),
});

// 保障金-获取转赠记录
export const getGivenList = (params) => post('/userServer/business/AcctBalanceLogAction', {
	action: 'qryAcctLog',
	data: JSON.stringify({ ...params,
		...{
			type: 10000
		}
	}),
});

// 查询该用户亲情比例列表
export const getUserFamilyRateList = (params) => post('/userServer/business/UserFamilyAccountAction', {
	action: 'qryUserFamilyRateList',
	data: JSON.stringify(params),
});

// 新增亲情用户
export const saveUserFamily = (params) => post('/userServer/business/UserFamilyAccountAction', {
	action: 'saveUserFamily',
	data: JSON.stringify(params),
});

// 获取到账通知（TODO）
export const getFamilyAccoutNotice = (params) => get('/common', params);

// 开启/关闭 到账通知（TODO）
export const changeFamilyAccoutNotice = (params) => get('/common', params);

// 查询亲情列表-管理页面
export const getUserFamilyList = (params) => get('/qryUserFamilyList', params);