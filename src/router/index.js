import Vue from 'vue'
import Router from 'vue-router'
import collectionRouter from './collection.js'
import discoveryRouter from './discovery.js'
import earingRouter from './earning.js'
import mineRouter from './mine.js'

// 测试页面
import getToken from '../pages/getToken'
import NotFound from '../pages/NotFound'
import Redirect from '../pages/Redirect'

Vue.use(Router)
Vue.use(require('vue-wechat-title'))

// meta中有 subtitle属性时 才会显示 header,和返回按钮

// 路由配置
// meta: {
//   wxConfig: true,
//   jsApiList: ['getLocation'], 
//   getLocation, //获取地理位置（火星坐标）
// }

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
    }, {
      path: '/redirect',
      name: 'redirect',
      meta: {
        title: '',
      },
      component: Redirect,
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
  ],
  scrollBehavior(to, from, savedPosition) {
    console.log(to.meta.keepAlive, from.meta.keepAlive);
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0,
      }
    }
  }
})