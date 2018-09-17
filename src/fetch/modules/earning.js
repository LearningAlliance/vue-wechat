import {
	post,
	get
} from '../method.js';

// 获取分享链接
export const qrySharePath = (params) => post('/userServer/business/UserInfoAction', {
	action: 'qrySharePath',
	data: JSON.stringify(params),
})

// 查询全民分享正在获取奖励的推荐
export const qryShare = (params) => post('/userServer/business/UserShareAction', {
	action: 'qryShare',
	data: JSON.stringify(params),
})

// 查询全民分享可推荐的商家
export const qryShareCollect = (params) => post('/userServer/business/UserShareAction', {
	action: 'qryShareCollect',
	data: JSON.stringify(params),
})