import {
	post,
	get
} from '../method.js';

// 我的订单-我的买单
export const getOrderBaseInfo = (params) => post('/userServer/business/OrderBaseInfoAction', {
	action: 'qryOrderBaseInfo',
	data: JSON.stringify({ ...params,
		...{
			orderType: '1',
			orderState: '0'
		}
	}),
});

export const cancelOrder = (params) => get('/common', params);

// 我的订单-优惠套餐
export const getOrderInfoCombo = (params) => post('/userServer/business/OrderBaseInfoAction', {
	action: 'qryOrderBaseInfo',
	data: JSON.stringify({ ...params,
		...{
			orderType: '2',
		}
	}),
});

//我的买单-订单详情
export const getOrderDetail = (params) => post('/userServer/business/OrderBaseInfoAction', {
	action: 'orderDetail',
	data: JSON.stringify(params),
});

// 获取代金券可用分店
export const getShopByCoupon = (params) => post('/userServer/business/MerShopAction?action=qryShopByCoupon', {
	action: 'qryShopByCoupon',
	data: JSON.stringify(params),
}, {
	body: {
		// withToken: false,
		// withUid: false,
	}
});