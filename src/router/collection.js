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
import PutEgg from '../pages/collection/PutEgg'
import CreatePw from '../pages/collection/CreatePw'
import PutEggStep1 from '../pages/collection/PutEggStep1'
import PutEggStep2 from '../pages/collection/PutEggStep2'
import PutEggPay from '../pages/collection/PutEggPay'
import SaveCouponSuccess from '../pages/collection/SaveCouponSuccess'
import PayTheBillSuccess from '../pages/collection/PayTheBillSuccess'
import CommnetForPay from '../pages/collection/CommnetForPay'
import BindUser from '../pages/collection/BindUser'

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
		// title: '收藏',
		title: '店铺详情',
		wxConfig: true,
		jsApiList: ['getLocation', 'openLocation'],
		getLocation: true,
		// keepAlive: true,
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
		subTitle: '彩蛋',
		wxConfig: true,
		hasAudio: true,
		AudioIndex: 0,
	},
	component: EggDetail,
}, {
	path: '/collection/putEgg',
	name: 'putEgg',
	meta: {
		title: '收藏',
		subTitle: '放置彩蛋',
		keepAlive: true,
	},
	component: PutEgg
}, {
	path: '/collection/createPw',
	name: 'createPw',
	meta: {
		title: '创建口令',
		subTitle: ' ',
	},
	component: CreatePw,
}, {
	path: '/collection/putEggStep1',
	name: 'putEggStep1',
	meta: {
		title: '收藏',
		subTitle: ' 放置彩蛋step1',
		wxConfig: true,
		jsApiList: ['translateVoice', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'uploadVoice', 'pauseVoice', 'stopVoice'],
	},
	component: PutEggStep1,
}, {
	path: '/collection/putEggStep2',
	name: 'putEggStep2',
	meta: {
		title: '收藏',
		subTitle: ' 放置彩蛋step2',
		// wxConfig: true,
		// jsApiList: ['getLocation'],
	},
	component: PutEggStep2,
}, {
	path: '/collection/putEggPay',
	name: 'putEggPay',
	meta: {
		title: '收藏',
		subTitle: ' 放置彩蛋',
		wxConfig: true,
		jsApiList: ['chooseWXPay'],
	},
	component: PutEggPay,
}, {
	path: '/collection/saveCouponSuccess',
	name: 'saveCouponSuccess',
	meta: {
		title: '套餐',
	},
	component: SaveCouponSuccess,
}, {
	path: '/collection/payTheBillSuccess',
	name: 'payTheBillSuccess',
	meta: {
		title: '买单成功',
	},
	component: PayTheBillSuccess,
}, {
	path: '/collection/commnetForPay',
	name: 'commnetForPay',
	meta: {
		title: '评论',
		subTitle: '评论',
	},
	component: CommnetForPay,
}, {
	path: '/collection/bindUser',
	name: 'bindUser',
	meta: {
		title: '登录',
		subTitle: ' ',
	},
	component: BindUser,
}, ]