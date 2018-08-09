import {
	post,
	get
} from '../method.js';

// 常去推荐店铺列表
export const hotShop = (params) => post('/userServer/business/MerShopAction', {
	action: 'hotShop',
	data: JSON.stringify(params),
});

// 常去收藏店铺列表
export const qryMyCollect = (params) => post('/userServer/business/UserCollectAction', {
	action: 'qryMyCollect',
	data: JSON.stringify(params),
});

// 查询店铺类型列表
export const qryShopTypeList = (params) => post('/userServer/business/SysShopTypeAction', {
	action: 'qryShopTypeList',
	data: JSON.stringify(params)
});