import Vue from 'vue'
import Router from 'vue-router'
import collectionRouter from './collection.js'
import discoveryRouter from './discovery.js'
import earingRouter from './earning.js'
import mineRouter from './mine.js'

// 测试页面
import getToken from '../pages/getToken'
import NotFound from '../pages/NotFound'

Vue.use(Router)
Vue.use(require('vue-wechat-title'))

// meta中有 subtitle属性时 才会显示 header,和返回按钮

export default new Router({
  // linkActiveClass: 'active',
  mode: 'history',
  routes: [{
      path: '/',
      name: 'index',
      meta: {
        title: '主页',
      },
      component: getToken
    },
    ...collectionRouter,
    ...discoveryRouter,
    ...earingRouter,
    ...mineRouter, {
      path: '*',
      name: 'notfound',
      meta: {},
      component: NotFound
    }
  ]
})