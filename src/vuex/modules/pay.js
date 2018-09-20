import api from '../../fetch/api'
import * as types from '../types'

// 买单字段暂存
const state = {
	payInfo: {
		activityId: null, // 优惠活动ID
		amount: null, // 付款金额（元）
		price: null, // 不参与优惠金额（元）
		shopId: null, // 店铺id
		couponId: null, // 代金券id
		coupon: null, // 多个无门槛代金券
		hasPrice: true,
		couponName: '未使用', // 优惠券名
		total: null,
	}
}

const actions = {
	setPayInfo({
		commit
	}, payload) {
		commit(types.SET_PAY_INFO, payload)
	},
	clearPayINfo({
		commit
	}, payload) {
		commit(types.CLEAR_PAY_INFO, payload)
	},
	updatePayInfoByKey({
		commit
	}, payload) {
		commit(types.UPDATE_PAY_INFO_BY_KEY, payload)
	},
}

const getters = {
	payInfo: state => state.payInfo,
}

const mutations = {
	[types.SET_PAY_INFO](state, payload) {
		state.payInfo = payload;
	},
	[types.CLEAR_PAY_INFO](state, payload) {
		Object.keys(state.payInfo).forEach((key) => {
			state.payInfo[key] = null;
		})
	},
	[types.UPDATE_PAY_INFO_BY_KEY](state, payload) {
		state.payInfo = {
			...state.payInfo,
			...payload
		};
	},
}

export default {
	state,
	actions,
	getters,
	mutations,
}