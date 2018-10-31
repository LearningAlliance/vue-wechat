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

// 获取保障金
export const getAccountSafeGuard = () => post('/userServer/business/UserInfoAction', {
	action: 'qryAccount',
	data: JSON.stringify({
		balanceType: 10000
	}),
})

// 获取积分
export const getAccountCredits = () => post('/userServer/business/UserInfoAction', {
	action: 'qryAccount',
	data: JSON.stringify({
		balanceType: 20000
	}),
})

// 获取养老金
export const getAccountPensions = () => post('/userServer/business/UserInfoAction', {
	action: 'qryAccount',
	data: JSON.stringify({
		balanceType: 30000
	}),
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
export const getUserFamilyList = (params) => post('/userServer/business/UserFamilyAccountAction', {
	action: 'qryUserFamilyList',
	data: JSON.stringify(params),
});

// 删除情亲账号
export const delUserFamily = (params) => post('/userServer/business/UserFamilyAccountAction', {
	action: 'delUserFamily',
	data: JSON.stringify(params),
})

// 修改亲情比例
export const updateUserFamilyRate = (params) => post('/userServer/business/UserFamilyAccountAction', {
	action: 'updateUserFamilyRate',
	data: JSON.stringify(params),
})

// 保障金-获取转赠记录
export const getPensionList = (params) => post('/userServer/business/AcctBalanceLogAction', {
	action: 'qryAcctLog',
	data: JSON.stringify({ ...params,
		...{
			type: 30000
		}
	}),
});

// 我的彩蛋--我放置的
export const getMyeggs = (params) => post('/userServer/business/UserReceiveZoneAction', {
	action: 'qryUserZoneList',
	data: JSON.stringify(params),
})

// 我的彩蛋-菜单详情
export const getEggDetail = (params) => post('/userServer/business/UserReceiveZoneAction', {
	action: 'qryUserZone',
	data: JSON.stringify(params),
})

// export const getEggDetail = (params) => get('/getEggDetail', params)

// 我的代金券-可使用
export const getVoucher = (params) => post('/userServer/business/UserCouponAction', {
	action: 'qryUserCoupons',
	data: JSON.stringify({ ...params,
		...{
			couponType: '1',
			state: '2',
		}
	}),
})

// 我的代金券-已失效
export const getInvalidVoucher = (params) => post('/userServer/business/UserCouponAction', {
	action: 'qryUserCoupons',
	data: JSON.stringify({ ...params,
		...{
			couponType: '1',
			state: '-1',
		}
	}),
})

// 修改会员头像
export const updateUserHead = (params) => post('/userServer/business/UserInfoAction', {
	action: 'updateUserHead',
	data: JSON.stringify(params),
})

export const userLevel = (params) => post('/userServer/business/UserInfoAction', {
	action: 'userLevel',
	data: JSON.stringify(params),
})

// 支付宝是否绑定手机接口
export const isBindAliPhone = (params) => post('/userServer/business/UserInfoAction', {
	action: 'isBindAliPhone',
	data: JSON.stringify(params),
}, {
	body: {
		withToken: false,
		withUid: false,
	}
})