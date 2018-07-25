import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
import config from '../config/index'
import md5 from 'js-md5'

import * as _ from '../util/tool'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

if (process.env.NODE_ENV == "development") {
	// 测试地址
	axios.defaults.baseURL = config.baseUrlDev;
} else {
	// 正式地址
	axios.defaults.baseURL = config.baseUrlPro;
}

//POST传参序列化
axios.interceptors.request.use((config) => {
	console.log(config);
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

function initRequest(params = {}, options = {}) {
	let defaultOptions = {
		head: {
			withPid: true,
			withTimestamp: true,
			withSign: true,
		},
		body: {
			withToken: true,
			withUid: true,
		}
	};
	// 合并选项
	let newOption = {
		head: { ...defaultOptions.head,
			...options.head
		},
		body: { ...defaultOptions.body,
			...options.body
		}
	};
	let {
		withPid,
		withTimestamp,
		withSign
	} = newOption.head;
	let {
		withToken,
		withUid
	} = newOption.body;
	let headers = {};
	let pid = config.pId;
	let timestamp = (parseInt(Math.random() * 10000000000000)).toString();
	let pCode = config.pCode;
	let sign = md5((`${timestamp}${pid}${pCode}`).toLowerCase());
	if (withPid) {
		headers.pid = pid;
	}
	if (withTimestamp) {
		headers.timestamp = timestamp;
	}
	if (withSign) {
		headers.sign = sign;
	}
	// headers = {
	// 	pid,
	// 	timestamp,
	// 	sign
	// };
	// TODO 测试用数据
	let token = 'e98e257d-09f8-4c64-ad37-d70a5cc981d9';
	let uid = '1';
	if (withToken) {
		params.token = token;
		params.uid = uid;
	}
	return {
		params,
		headers,
	}
}

export function get(url, data, options = {}) {
	return new Promise((resolve, reject) => {
		let {
			params,
			headers
		} = initRequest(data, options);
		axios.get(url, {
				params: params,
				headers,
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

export function post(url, data, options = {}) {
	console.log(url, data, options);
	return new Promise((resolve, reject) => {
		let {
			params,
			headers,
		} = initRequest(data, options);
		// axios.post(url, params, {
		// 		headers,
		// 		method: 'get',
		// 	})
		axios.request({
				url,
				data: params,
				method: 'post',
				headers,
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