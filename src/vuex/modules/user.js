import api from '../../fetch/api'
import * as types from '../types'

const state = {
	// 用户登录状态
	loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
	// 用户登录信息
	userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
	// 用户数据信息
	userData: []
}

const actions = {
	/**
	 * 用户登录
	 */
	setSignIn({
		commit
	}, res) {
		commit(types.SET_LOGIN_STATUS, true)
		// TODO 如果登陆后没返回用户信息 ，则不进行设置用户信息操作
		commit(types.SET_USER_INFO, res)
	},

	/**
	 * 获取用户信息
	 */
	setUserInfo({
		commit
	}, res) {
		localStorage.setItem('userInfo', JSON.stringify(res))
		localStorage.setItem('loginStatus', true)
		commit(types.SET_USER_INFO, res)
		// commit(types.SET_LOGIN_STATUS, true)
	},

	/**
	 * 退出登录
	 */
	setSignOut({
		commit
	}) {
		localStorage.removeItem('loginStatus')
		localStorage.removeItem('userInfo')
		commit(types.SET_LOGIN_STATUS, false)
		commit(types.SET_USER_INFO, {})
	},
}

const getters = {
	getUserData: state => state.userData,
	loginStatus: state => state.loginStatus,
	userInfo: state => state.userInfo
}

const mutations = {
	[types.SET_USER_INFO](state, res) {
		state.userInfo = res;
		localStorage.setItem('userInfo', JSON.stringify(res));
	},

	[types.SET_LOGIN_STATUS](state, status) {
		state.loginStatus = status
	},

}

export default {
	state,
	actions,
	getters,
	mutations
}