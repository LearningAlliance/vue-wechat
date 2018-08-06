import * as user from './modules/user.js'
import * as trade from './modules/trade.js'
import * as common from './modules/common.js'

// 调用示例， 先应用api.js 再 api.user.login
export default {
	user,
	trade,
	common,
}