import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../pages/Home'
// import Sport from '../pages/Sport'
// import Travel from '../pages/Travel'
// import Detail from '../pages/Detail'
// import User from '../pages/User'
// import Login from '../pages/Login'
// import Regist from '../pages/Regist'
// import UserInfo from '../pages/UserInfo'
// import Set from '../pages/Set'
// import Post from '../pages/Post'
// import UserMsg from '../pages/UserMsg'
// import Navbar from '../pages/Navbar'

// 测试页面
import getToken from '../pages/getToken'

import Collection from '../pages/Collection'
import Discovery from '../pages/Discovery'
import Earning from '../pages/Earning'
import Mine from '../pages/Mine'
import NotFound from '../pages/NotFound'

// user下的文件
import UserInfo from '../pages/mine/UserInfo'

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
  }, {
    path: '/collection',
    name: 'collection',
    meta: {
      title: '收藏',
      showTabar: true,
    },
    component: Collection
  }, {
    path: '/discovery',
    name: 'discovery',
    meta: {
      title: '发现',
      showTabar: true,
    },
    component: Discovery
  }, {
    path: '/earning',
    name: 'earning',
    meta: {
      title: '赚赚',
      showTabar: true,
    },
    component: Earning
  }, {
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
    path: '*',
    name: 'notfound',
    meta: {},
    component: NotFound
  }]
})

// export default new Router({
//   linkActiveClass: 'active',
//   mode: 'history',
//   routes: [{
//     path: '/',
//     name: 'home',
//     meta: {
//       title: '主页'
//     },
//     component: Home
//   }, {
//     path: '/home',
//     name: 'home',
//     meta: {
//       title: '主页2'
//     },
//     component: Home
//   }, {
//     path: '/sport',
//     name: 'sport',
//     component: Sport
//   }, {
//     path: '/travel',
//     name: 'travel',
//     component: Travel
//   }, {
//     path: '/sport/:id',
//     name: 'detail',
//     component: Detail
//   }, {
//     path: '/travel/:id',
//     name: 'detail',
//     component: Detail
//   }, {
//     path: '/user',
//     name: 'user',
//     component: User
//   }, {
//     path: '/user/login',
//     component: Login
//   }, {
//     path: '/user/regist',
//     component: Regist
//   }, {
//     path: '/user/info',
//     component: UserInfo
//   }, {
//     path: '/user/set',
//     component: Set
//   }, {
//     path: '/user/post',
//     component: Post
//   }, {
//     path: '/user/msg',
//     component: UserMsg
//   }, {
//     path: '/user/navbar',
//     meta: {
//       title: '个人信息'
//     },
//     component: Navbar
//   }, {
//     path: '*',
//     name: 'notfound',
//     component: NotFound
//   }]
// })