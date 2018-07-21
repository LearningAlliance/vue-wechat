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