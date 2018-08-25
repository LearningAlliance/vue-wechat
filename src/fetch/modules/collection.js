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

// 获取店铺信息接口
export const merShop = (params) => post('/userServer/business/MerShopAction', {
	action: 'merShop',
	data: JSON.stringify(params),
});

// 查询商家彩蛋数量
export const qrySysZoneCount = (params) => post('/userServer/business/SysZoneAction', {
	action: 'qrySysZoneCount',
	data: JSON.stringify(params),
});

// 商铺会员等级信息
export const qryMerLevel = (params) => post('/userServer/business/MerShopAction', {
	action: 'qryMerLevel',
	data: JSON.stringify(params),
});

// 根据类型查询店铺优惠劵列表
export const qryShopCoupon = (params) => post('/userServer/business/MerCouponAction', {
	action: 'qryShopCoupon',
	data: JSON.stringify(params),
});

//店铺评论和回复列表
export const qryShopComments = (params) => post('/userServer/business/ShopCommentAction', {
	action: 'qryShopComments',
	data: JSON.stringify(params),
});

// 店铺的查询评论详情（不带token）
export const qryShopCommentById = (params) => post('/userServer/business/ShopCommentAction', {
	action: 'qryShopCommentById',
	data: JSON.stringify(params),
});

// 保存评论
export const saveShopComment = (params) => post('/userServer/business/ShopCommentAction', {
	action: 'saveShopComment',
	data: JSON.stringify(params),
});

// 创建购买套餐订单
export const saveCouponOrder = (params) => post('/userServer/business/OrderBaseInfoAction', {
	action: 'saveCouponOrder',
	data: JSON.stringify(params),
});