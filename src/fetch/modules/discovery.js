import {
	post,
	get
} from '../method.js';


export const qryBannerList = (params) => post('/userServer/business/SysBannerAction', {
	action: 'qryBannerList',
	data: JSON.stringify(params),
});