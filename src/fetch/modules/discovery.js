import {
	post,
	get
} from '../method.js';


export const qryBannerList = (params) => post('/userServer/business/SysBannerAction', {
	action: 'qryBannerList',
	data: JSON.stringify(params),
});

// 发现动态列表（查推荐的商户和评价）
export const qryShopComment = (params) => post('/userServer/business/MerShopAction', {
	action: 'qryShopComment',
	data: JSON.stringify(params),
});

// 根据经纬度获取地理位置信息
export const getAddress = (params) => post('/userServer/business/SysGaoDeAction', {
	action: 'getAddress',
	data: JSON.stringify(params),
});

// 
export const qryShopList = (params) => post('/userServer/business/MerShopAction', {
	action: 'qryShopList',
	data: JSON.stringify(params),
});