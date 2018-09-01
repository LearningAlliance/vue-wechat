import * as user from './modules/user.js'
import * as trade from './modules/trade.js'
import * as common from './modules/common.js'
import * as collection from './modules/collection'
import * as discovery from './modules/discovery'

// 调用示例， 先应用api.js 再 api.user.login
export default {
	user,
	trade,
	common,
	collection,
	discovery,
}