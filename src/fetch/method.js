import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
import config from '../config/index'

import * as _ from '../util/tool'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

if (process.env.NODE_ENV == "development") {
	// 测试地址
	axios.defaults.baseURL = config.baseUrlDev;
} else {
	// 正式地址
	axios.defaults.baseURL = config.baseUrlPro;
}

//POST传参序列化
axios.interceptors.request.use((config) => {
	store.dispatch('setLoadingState', true);
	if (config.method === 'post') {
		config.data = qs.stringify(config.data);
	}
	return config;
}, (error) => {
	_.toast("网络异常", 'fail');
	return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
	console.log('interceptors', res);
	setTimeout(() => {
		store.dispatch('setLoadingState', false);
	}, 100);
	if (res.data.resultCode == 0) {
		// 请求成功时
		// _.toast(res.data.msg);
		return res;
	}
	// TODO 此处可做其他判断，
	// 暂时 只对 resultCode不为0的 弹出错误信息
	_.toast(res.data.resultMsg, 'fail');
	return Promise.reject(res);
}, (error) => {
	setTimeout(() => {
		store.dispatch('setLoadingState', false);
	}, 100);
	_.toast("网络异常", 'fail');
	return Promise.reject(error);
});

export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			})
			.catch((error) => {
				reject(error)
			})
	})
}