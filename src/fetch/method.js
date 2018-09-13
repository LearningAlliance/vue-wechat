import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
import config from '../config/index'
import md5 from 'js-md5'
import {
	MessageBox,
	Indicator,
} from 'mint-ui';
import noToastCode from './noToastCode.js'
import * as _ from '../util/tool'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

if (process.env.NODE_ENV == "development") {
	// 测试地址
	axios.defaults.baseURL = config.baseUrlDev;
} else {
	// 正式地址
	axios.defaults.baseURL = config.baseUrlPro;
}

//POST传参序列化
axios.interceptors.request.use((config) => {
	// console.log(config);
	store.dispatch('setLoadingState', true);
	// Indicator.open();
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
	// console.log('interceptors', res);
	// setTimeout(() => {
	store.dispatch('setLoadingState', false);
	// Indicator.close();
	// }, 100);
	if (res.data.resultCode == 0 || res.data.status == '1') {
		// 请求成功时
		// _.toast(res.data.msg);
		return res;
	} else if (res.data.resultCode == 9985) {
		MessageBox.confirm('当前token已过期，是否重新获取?').then(action => {
			if (action) {
				if (process.env.NODE_ENV == "development") {
					// 测试用获取token
					post('/userServer/business/UserInfoAction', {
						action: 'qryToken',
						data: JSON.stringify({
							user: 13333333333
						}),
					}, {
						body: {
							withToken: false,
							withUid: false,
						}
					}).then((res) => {
						// console.log('getToken', res);
						let {
							token,
							uid
						} = res.data;
						localStorage.setItem('token', token);
						localStorage.setItem('uid', uid);
						location.reload();
					}).cathc((err) => {
						reject(err);
						// location.reload();
					})
				} else {
					let oldUrl = encodeURIComponent(location.href.split('?')[0]);
					location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb3101479b8367c05&redirect_uri=${oldUrl}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
				}
			}
		}).catch((err) => {

		});
	} else {
		// resultCode 2011 2014
		let code = res.data.resultCode || -1;
		code = Number(code);
		if (!(noToastCode.indexOf(code) > -1)) {
			_.toast(res.data.resultMsg, 'fail');
		}
	}
	// TODO 此处可做其他判断，
	// 暂时 只对 resultCode不为0的 弹出错误信息
	return Promise.reject(res);
}, (error) => {
	setTimeout(() => {
		store.dispatch('setLoadingState', false);
		// Indicator.close();
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
	delete newOption.head['withPid'];
	delete newOption.head['withTimestamp'];
	delete newOption.head['withSign'];
	headers = { ...headers,
		...newOption.head
	};
	// headers['Content-Type'] = 'multipart/form-data';
	// headers = { ...headers,
	// 	...{
	// 		'Content-Type': 'multipart/form-data'
	// 	}
	// };
	// headers = {
	// 	pid,
	// 	timestamp,
	// 	sign
	// };
	// TODO 测试用数据
	// let token = 'e98e257d-09f8-4c64-ad37-d70a5cc981d9';
	// let uid = '1';
	let token = localStorage.getItem('token') || null;
	let uid = localStorage.getItem('uid') || null;
	if (withToken) {
		params.token = token;
		params.uid = uid;
	}
	if (withUid) {
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
	// console.log(url, data, options);
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