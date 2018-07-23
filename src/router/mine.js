import Mine from '../pages/Mine'
// 我的页面
import ModifyUserNick from '../pages/mine/ModifyUserNick'
import UserSettings from '../pages/mine/Settings'
import ModifyMobile from '../pages/mine/ModifyMobile'

// 保障金部分
import Safeguard from '../pages/mine/Safeguard'
// 保障金-完善信息
import SafeguardComplete from '../pages/mine/SafeguardComplete'

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
}]