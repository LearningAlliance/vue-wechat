import Discovery from '../pages/Discovery'

// 兑换商城-兑换成功
import Success from '../pages/discovery/Success'
import CreditsExchange from '../pages/discovery/CreditsExchange'
import PensionExchange from '../pages/discovery/PensionExchange'
import ExchangeMall from '../pages/discovery/ExchangeMall'

export default [{
	path: '/discovery',
	name: 'discovery',
	meta: {
		title: '发现',
		showTabar: true,
	},
	component: Discovery
}, {
	path: '/discovery/success',
	name: 'success',
	component: Success
}, {
	path: '/discovery/creditsExchange',
	name: 'creditsExchange',
	meta: {
		title: '兑换商城',
		subTitle: '兑换积分',
	},
	component: CreditsExchange
}, {
	path: '/discovery/pensionExchange',
	name: 'pensionExchange',
	meta: {
		title: '兑换商城',
		subTitle: '兑换养老金',
	},
	component: PensionExchange
}, {
	path: '/discovery/exchangeMall',
	name: 'exchangeMall',
	meta: {
		title: '兑换商城',
		subTitle: '兑换商城',
	},
	component: ExchangeMall,
}, ]