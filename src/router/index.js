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

// 我的页面
import ModifyUserNick from '../pages/Mine/ModifyUserNick'
import UserSettings from '../pages/Mine/Settings'
import ModifyMobile from '../pages/Mine/ModifyMobile'

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
  }, {
    path: '*',
    name: 'notfound',
    meta: {},
    component: NotFound
  }]
})