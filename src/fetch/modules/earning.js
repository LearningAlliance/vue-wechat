import {
	post,
	get
} from '../method.js';

// 获取分享链接
export const qrySharePath = (params) => post('/userServer/business/UserInfoAction', {
	action: 'qrySharePath',
	data: JSON.stringify(params),
});