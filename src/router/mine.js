import Mine from '../pages/Mine'
// 我的页面
import ModifyUserNick from '../pages/Mine/ModifyUserNick'
import UserSettings from '../pages/Mine/Settings'
import ModifyMobile from '../pages/Mine/ModifyMobile'

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
	name: 'ModifyMobile',
	meta: {
		title: '个人中心',
		subTitle: ' ',
	},
	component: ModifyMobile,
}, ]