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
import ShopVipInfo from '../pages/collection/ShopVipInfo'
import CommentList from '../pages/collection/CommentList'
import CommentDetail from '../pages/collection/CommentDetail'
import Comment from '../pages/collection/Comment'
import ShopEggList from '../pages/collection/ShopEggList'
import EggDetail from '../pages/collection/EggDetail'

export default [{
	path: '/collection',
	name: 'collection',
	meta: {
		title: '收藏',
		showTabar: true,
		wxConfig: true,
		jsApiList: ['getLocation'],
		getLocation: true,
		keepAlive: true,
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
		keepAlive: true,
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
}, {
	path: '/collection/shopVipInfo',
	name: 'shopVipInfo',
	meta: {
		title: 'VIP'
	},
	component: ShopVipInfo,
}, {
	path: '/collection/commentList',
	name: 'commentList',
	meta: {
		title: '评价',
		subTitle: '评价',
	},
	component: CommentList,
}, {
	path: '/collection/commentDetail',
	name: 'commentDetail',
	meta: {
		title: '评价详情',
		subTitle: '评价详情',
	},
	component: CommentDetail,
}, {
	path: '/collection/comment',
	name: 'comment',
	meta: {
		title: '评价',
		subTitle: '评论',
	},
	component: Comment,
}, {
	path: '/collection/shopEggList',
	name: 'shopEggList',
	meta: {
		title: '彩蛋',
		subTitle: '彩蛋',
		wxConfig: true,
		jsApiList: ['getLocation'],
		getLocation: true,
		keepAlive: true,
	},
	component: ShopEggList,
}, {
	path: '/collection/eggDetail',
	name: 'shopEggDetail',
	meta: {
		title: '彩蛋',
		subTitle: '彩蛋'
	},
	component: EggDetail,
}, ]