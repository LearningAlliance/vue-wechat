import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import sport from './modules/sport'
import travel from './modules/travel'
import detail from './modules/detail'
import com from './modules/com'
import egg from './modules/egg'
import vip from './modules/vip'
import pay from './modules/pay'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		sport,
		travel,
		detail,
		com,
		egg,
		vip,
		pay,
	}
})