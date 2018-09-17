import api from '../../fetch/api'
import * as types from '../types'

// 彩蛋创建数据暂存
const state = {
	eggInfo: {
		amount: null, // 红包金额（元）
		zoneType: null, // 1：文字2：语言3：视频
		shopId: null, // 店铺id
		zoneFile: null, // 彩蛋附件
		expDate: null, // 到期时间（天）
		pw: null, // 口令密码6位,
		reType: null, // 1优惠券4红包
		couponId: null, // 券主键
		desc: null, // 彩蛋内容(文字必填)
	}
}

const actions = {
	/*
	 *	更新创建的彩蛋信息
	 */
	setEggInfo({
		commit
	}, payload) {
		commit(types.SET_EGG_INFO, payload)
	},
	clearEggINfo({
		commit
	}, payload) {
		commit(types.CLEAR_EGG_INFO, payload)
	},
	updateEggInfoByKey({
		commit
	}, payload) {
		commit(types.UPDATE_EGG_INFO_BY_KEY, payload)
	},
	saveEgg({
		commit
	}, payload) {
		let {
			router,
			shopId,
		} = payload;
		console.log(router);
		router.push({
			path: '/collection/placementSuccess',
			query: {
				shopId,
			}
		})
		api.collection.saveSysZone(state.eggInfo).then((res) => {
			console.log(res);
			router.push({
				path: '/collection/placementSuccess',
				query: {
					shopId,
				}
			})
			// 放置彩蛋后清空彩蛋信息
			commit(types.CLEAR_EGG_INFO, payload);
		}).catch((err) => {});
	},
}

const getters = {
	eggInfo: state => state.eggInfo,
	abc: state => state.abc,
}

const mutations = {
	[types.SET_EGG_INFO](state, payload) {
		state.eggInfo = payload;
	},
	[types.CLEAR_EGG_INFO](state, payload) {
		Object.keys(state.eggInfo).forEach((key) => {
			state.eggInfo[key] = null;
		})
	},
	[types.UPDATE_EGG_INFO_BY_KEY](state, payload) {
		state.eggInfo = {
			...state.eggInfo,
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