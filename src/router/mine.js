import Mine from '../pages/Mine'
// 我的页面
import ModifyUserNick from '../pages/mine/ModifyUserNick'
import UserSettings from '../pages/mine/Settings'
import ModifyMobile from '../pages/mine/ModifyMobile'

// 保障金部分
import Safeguard from '../pages/mine/Safeguard'
// 保障金-完善信息
import SafeguardComplete from '../pages/mine/SafeguardComplete'
// 转赠
import SafeguardGive from '../pages/mine/SafeguardGive'
import GiveSuccess from '../pages/mine/GiveSuccess'
import GivenList from '../pages/mine/GivenList'

// 添加亲情账户
import AddFamilyAccount from '../pages/mine/AddFamilyAccount'
import EditFamilyAccount from '../pages/mine/EditFamilyAccount'
// 修改比例
import UpdateUserFamilyRate from '../pages/mine/UpdateUserFamilyRate'

// 养老金账户 
import PensionAccount from '../pages/mine/PensionAccount'

// 我的订单
import MyOrder from '../pages/mine/MyOrder'
import MyPay from '../pages/mine/MyPay'
import MyCombo from '../pages/mine/MyCombo'

// user下的文件
import UserInfo from '../pages/mine/UserInfo'

export default [{
	path: '/mine',
	name: 'mine',
	meta: {
		title: '个人中心',
		showTabar: true,
	},
	component: Mine
}, {
	path: '/mine/userInfo',
	name: 'userinfo',
	meta: {
		title: '个人中心',
		subTitle: '个人信息',
	},
	component: UserInfo
}, {
	path: '/mine/modifyUserNick',
	name: 'modifyUserNick',
	meta: {
		title: '个人中心',
		subTitle: '修改昵称',
		rightText: '保存',
		funName: 'updateUserNick',
	},
	component: ModifyUserNick
}, {
	path: '/mine/userSettings',
	name: 'userSettings',
	meta: {
		title: '个人中心',
		subTitle: '设置',
	},
	component: UserSettings,
}, {
	path: '/mine/userSettings/ModifyMobile',
	name: 'modifyMobile',
	meta: {
		title: '个人中心',
		subTitle: ' ',
	},
	component: ModifyMobile,
}, {
	path: '/mine/safeguard',
	name: 'safeguard',
	meta: {
		title: '个人中心',
		subTitle: '保障金',
		rightText: '常见问题',
	},
	component: Safeguard,
}, {
	path: '/mine/safeguardComplete',
	name: 'safeguardcomplete',
	meta: {
		title: '个人中心',
		subTitle: '完善信息',
	},
	component: SafeguardComplete,
}, {
	path: '/mine/safeguardGive',
	name: 'safeguardGive',
	meta: {
		title: '个人中心',
		subTitle: '转赠',
		rightText: '记录',
		funName: 'toDetail',
	},
	component: SafeguardGive,
}, {
	path: '/mine/giveSuccess',
	name: 'giveSuccess',
	meta: {
		title: '个人中心',
	},
	component: GiveSuccess,
}, {
	path: '/mine/givenList',
	name: 'givenList',
	meta: {
		title: '个人中心',
		subTitle: '转赠记录',
	},
	component: GivenList,
}, {
	path: '/mine/addFamilyAccount',
	name: 'addFamilyAccount',
	meta: {
		title: '个人中心',
		subTitle: '添加亲情账户',
	},
	component: AddFamilyAccount,
}, {
	path: '/mine/editFamilyAccount',
	name: 'editFamilyAccount',
	meta: {
		title: '个人中心',
		subTitle: '管理亲情账户',
	},
	component: EditFamilyAccount,
}, {
	path: '/mine/updateUserFamilyRate',
	name: 'updateUserFamilyRate',
	meta: {
		title: '个人中心',
		subTitle: '修改比例',
	},
	component: UpdateUserFamilyRate,
}, {
	path: '/mine/pensionAccount',
	name: 'pensionAccount',
	meta: {
		title: '个人中心',
		subTitle: '养老金账户',
		// rightText: '明细',
		// funName: 'toList',
	},
	component: PensionAccount,
}, {
	path: '/mine/myOrder',
	name: 'myOrder',
	meta: {
		title: '个人中心',
		subTitle: '我的订单',
	},
	component: MyOrder,
}, {
	path: '/mine/myPay',
	name: 'myPay',
	meta: {
		title: '个人中心',
		subTitle: '我的买单',
	},
	component: MyPay,
}, {
	path: '/mine/myCombo',
	name: 'myCombo',
	meta: {
		title: '个人中心',
		subTitle: '优惠套餐',
	},
	component: MyCombo,
}, ]