// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAMap from 'vue-amap';
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import {
	WechatPlugin
} from 'vux'

import store from './vuex/store'
import * as filters from './util/filter'
import '../static/css/my-mint.scss'; //全局修改mint-UI样式
import config from './config'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);

// import Mint from 'mint-ui';
// Vue.use(Mint);

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

// FastClick.attach(document.body)

Vue.use(WechatPlugin)

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
	key: config.aMapKey,
	plugin: ['AMap.Map', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.PlaceSearchLayer', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'AMap.Geocoder'],
	uiVersion: '1.0.11', // ui库版本，不配置不加载,
	// 默认高德 sdk 版本为 1.4.4
	v: '1.4.4',
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	...App
})