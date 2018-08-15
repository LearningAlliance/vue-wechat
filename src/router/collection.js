import Collection from '../pages/Collection'

import Search from '../pages/collection/Search'
import PlacementSuccess from '../pages/collection/PlacementSuccess'
import PayTheBill from '../pages/collection/PayTheBill'
import Branch from '../pages/collection/Branch'
import UseCoupons from '../pages/collection/UseCoupons'
import MapSearch from '../pages/collection/MapSearch'
import ShopDetail from '../pages/collection/ShopDetail'
import CouponDetail from '../pages/collection/CouponDetail'
import SaveCouponOrder from '../pages/collection/SaveCouponOrder'

export default [{
	path: '/collection',
	name: 'collection',
	meta: {
		title: '收藏',
		showTabar: true,
		wxConfig: true,
		jsApiList: ['getLocation'],
		getLocation: true,
	},
	component: Collection
}, {
	path: '/collection/search',
	name: 'search',
	meta: {
		title: '收藏',
	},
	component: Search,
}, {
	path: '/collection/placementSuccess',
	name: 'placementSuccess',
	meta: {
		title: '微信',
	},
	component: PlacementSuccess,
}, {
	path: '/collection/payTheBill',
	name: 'payTheBill',
	meta: {
		title: '买单',
		subTitle: '买单',
	},
	component: PayTheBill,
}, {
	path: '/collection/branch',
	name: 'branch',
	meta: {
		title: '套餐',
		subTitle: '分店',
		wxConfig: true,
		jsApiList: ['getLocation'],
		getLocation: true,
	},
	component: Branch,
}, {
	path: '/collection/useCoupons',
	name: 'useCoupons',
	meta: {
		title: '代金券使用',
		subTitle: '代金券使用',
	},
	component: UseCoupons,
}, {
	path: '/collection/mapSearch',
	name: 'mapSearch',
	meta: {
		title: '收藏',
		wxConfig: true,
		jsApiList: ['getLocation'],
		getLocation: true,
	},
	component: MapSearch,
}, {
	path: '/collection/shopDetail',
	name: 'shopDetail',
	meta: {
		title: '收藏',
		wxConfig: true,
		jsApiList: ['getLocation', 'openLocation'],
		getLocation: true,
	},
	component: ShopDetail,
}, {
	path: '/collection/couponDetail',
	name: 'couponDetail',
	meta: {
		title: '套餐',
		subTitle: '优惠套餐',
		wxConfig: true,
		jsApiList: ['getLocation'],
		getLocation: true,
	},
	component: CouponDetail,
}, {
	path: '/collection/saveCouponOrder',
	name: 'saveCouponOrder',
	meta: {
		title: '套餐',
		subTitle: '提交订单',
	},
	component: SaveCouponOrder,
}, ]