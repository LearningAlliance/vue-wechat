import Earning from '../pages/Earning'
import AShare from '../pages/earning/AShare'
import AShareShopList from '../pages/earning/AShareShopList'
import AShareDetail from '../pages/earning/AShareDetail'
import AShareBefore from '../pages/earning/AShareBefore'

export default [{
	path: '/earning',
	name: 'earning',
	meta: {
		title: '赚赚',
		showTabar: true,
	},
	component: Earning
}, {
	path: '/earning/aShare',
	name: 'aShare',
	meta: {
		title: '全民纷享',
		subTitle: '全民纷享',
		rightText: '规则',
		funName: 'toRule',
	},
	component: AShare,
}, {
	path: '/earning/aShareShopList',
	name: 'aShareShopList',
	meta: {
		title: '全民纷享',
		subTitle: '可推荐的商家',
	},
	component: AShareShopList,
}, {
	path: '/earning/aShareDetail',
	name: 'aShareDetail',
	meta: {
		title: '微信',
		subTitle: '分享获得积分收益',
	},
	component: AShareDetail,
}, {
	path: '/earning/aShareBefore',
	name: 'aShareBefore',
	meta: {
		title: '微信',
		subTitle: '全民分享',
	},
	component: AShareBefore,
}, ]