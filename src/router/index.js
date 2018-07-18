import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home'
import Sport from '../pages/Sport'
import Travel from '../pages/Travel'
import Detail from '../pages/Detail'
import User from '../pages/User'
import Login from '../pages/Login'
import Regist from '../pages/Regist'
import UserInfo from '../pages/UserInfo'
import Set from '../pages/Set'
import Post from '../pages/Post'
import UserMsg from '../pages/UserMsg'
import Navbar from '../pages/Navbar'
import NotFound from '../pages/NotFound'

Vue.use(Router)
Vue.use(require('vue-wechat-title'))

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    meta: {
      title: '主页'
    },
    component: Home
  }, {
    path: '/home',
    name: 'home',
    meta: {
      title: '主页2'
    },
    component: Home
  }, {
    path: '/sport',
    name: 'sport',
    component: Sport
  }, {
    path: '/travel',
    name: 'travel',
    component: Travel
  }, {
    path: '/sport/:id',
    name: 'detail',
    component: Detail
  }, {
    path: '/travel/:id',
    name: 'detail',
    component: Detail
  }, {
    path: '/user',
    name: 'user',
    component: User
  }, {
    path: '/user/login',
    component: Login
  }, {
    path: '/user/regist',
    component: Regist
  }, {
    path: '/user/info',
    component: UserInfo
  }, {
    path: '/user/set',
    component: Set
  }, {
    path: '/user/post',
    component: Post
  }, {
    path: '/user/msg',
    component: UserMsg
  }, {
    path: '/user/navbar',
    meta: {
      title: '个人信息'
    },
    component: Navbar
  }, {
    path: '*',
    name: 'notfound',
    component: NotFound
  }]
})