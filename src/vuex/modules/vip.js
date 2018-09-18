import api from '../../fetch/api'
import * as types from '../types'

const state = {
	vipLevel: 0, // 会员等级   0.初心会员 1.青铜会员 2.白银会员 3.黄金会员 4.铂金会员 5.钻石会员
	vipScore: 0, // 会员积分
	vips: [{
		vipName: '初心会员'
	}, {
		vipName: '青铜会员'
	}, {
		vipName: '白银会员'
	}, {
		vipName: '黄金会员'
	}, {
		vipName: '铂金会员'
	}, {
		vipName: '钻石会员'
	}, ]
}

const actions = {

}

const getters = {
	vipLevel: state => state.vipLevel,
	vipScore: state => state.vipScore,
	vipName: state => state.vips[state.vipLevel].vipName,
}

const mutations = {

}

export default {
	state,
	actions,
	getters,
	mutations
}