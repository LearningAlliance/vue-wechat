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
export const getUserInfo = (params) => get('/userInfo', params)

/**
 * 修改用户昵称
 */
export const updateUserNick = (params) => get('/updateUserNick', params)

// 获取手机验证码
export const getVerifyCode = (params) => get('/getVerifyCode', params)

// 更改手机号
export const updateMobile = (params) => get('/updateMobile', params);

// 保障金-完善信息
export const completeInfo = (params) => get('/completeInfo', params);