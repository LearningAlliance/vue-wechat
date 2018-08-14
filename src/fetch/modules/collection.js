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
	data: JSON.stringify(params),
});

// 收藏-有活动页面折扣大小排序的优惠套餐列表
export const qryMerCouponActivity = (params) => post('/userServer/business/MerCouponAction', {
	action: 'qryMerCouponActivity',
	data: JSON.stringify(params),
});

// 收藏-有活动页面推荐的优惠套餐列表
export const qryMerCouponHot = (params) => post('/userServer/business/MerCouponAction', {
	action: 'qryMerCouponHot',
	data: JSON.stringify(params),
});

// 套餐详情
export const merCouponDetail = (params) => post('/userServer/business/MerCouponAction', {
	action: 'merCouponDetail',
	data: JSON.stringify(params),
}, {
	body: {
		withToken: false,
		withUid: false,
	}
});

// 创建购买套餐订单
export const saveCouponOrder = (params) => post('/userServer/business/OrderBaseInfoAction', {
	action: 'merCouponDetail',
	data: JSON.stringify(params),
});