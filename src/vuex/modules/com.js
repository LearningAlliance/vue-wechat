import * as types from '../types'

/**
 * App通用配置
 */
const state = {
    loading: false,
    showToast: false,
    leftNavStatus: false,
    showSuccess: true,
    showFail: false,
    toastMsg: '操作成功',
    showTimePicker: false,
    alertMsg: '退出登录',
    showAlert: false,
    routeName: '',
    headerRightFun: '',
    // 北京
    // latitude: 39.90923, // 纬度
    // longitude: 116.397428, // 经度

    // 杭州测试
    latitude: 30.31974,
    longitude: 120.1421,
    // latitude: null,
    // longitude: null,
    formattedAddress: null, // 用户详细地址
}

const actions = {
    setLoadingState({
        commit
    }, status) {
        commit(types.COM_LOADING_STATUS, status)
    },
    setNavState({
        commit
    }, status) {
        commit(types.COM_NAV_STATUS, status)
    },
    showToast({
        commit
    }, status) {
        commit(types.COM_SHOW_TOAST, status)
    },
    showSuccess({
        commit
    }, status) {
        commit(types.COM_SHOW_SUCCESS, status)
    },
    showFail({
        commit
    }, status) {
        commit(types.COM_SHOW_FAIL, status)
    },
    toastMsg({
        commit
    }, str) {
        commit(types.COM_TOAST_MSG, str)
    },
    showAlert({
        commit
    }, status) {
        commit(types.COM_SHOW_ALERT, status)
    },
    alertMsg({
        commit
    }, str) {
        commit(types.COM_ALERT_MSG, str)
    },
    showTimePicker({
        commit
    }, status) {
        commit(types.COM_SHOW_TIME_PICKER, status)
    },
    setRouteName({
        commit
    }, name) {
        commit(types.COM_SET_ROUTE_NAME, name)
    },
    setHeaderRightFun({
        commit
    }, funName) {
        commit(types.COM_SET_HEADER_RIGHT_FUN, funName)
    },
    setLatitude({
        commit
    }, latitude) {
        commit(types.COM_SET_LATITUDE, latitude)
    },
    setLongitude({
        commit
    }, longitude) {
        commit(types.COM_SET_LONGITUDE, longitude)
    },
    setFormattedAddress({
        commit
    }, formattedAddress) {
        commit(types.COM_SET_FORMATTED_ADDRESS, formattedAddress);
    },
}

const getters = {
    loading: state => state.loading,
    showToast: state => state.showToast,
    showAlert: state => state.showAlert,
    routeName: state => state.routeName,
    headerRightFun: state => state.headerRightFun,
    latitude: state => state.latitude,
    longitude: state => state.longitude,
    formattedAddress: state => state.formattedAddress,
}


const mutations = {
    [types.COM_LOADING_STATUS](state, status) {
        state.loading = status
    },

    [types.COM_SHOW_TOAST](state, status) {
        state.showToast = status
    },

    [types.COM_SHOW_SUCCESS](state, status) {
        state.showSuccess = status
    },

    [types.COM_SHOW_FAIL](state, status) {
        state.showFail = status
    },

    [types.COM_TOAST_MSG](state, str) {
        state.toastMsg = str
    },

    [types.COM_NAV_STATUS](state, status) {
        state.leftNavStatus = status
    },

    [types.COM_SHOW_TIME_PICKER](state, status) {
        state.showTimePicker = status
    },

    [types.COM_SHOW_ALERT](state, status) {
        state.showAlert = status
    },
    [types.COM_ALERT_MSG](state, str) {
        state.alertMsg = str
    },
    [types.COM_SET_ROUTE_NAME](state, name) {
        state.routeName = name;
    },
    [types.COM_SET_HEADER_RIGHT_FUN](state, funName) {
        state.headerRightFun = funName;
    },
    [types.COM_SET_LATITUDE](state, latitude) {
        state.latitude = latitude;
    },
    [types.COM_SET_LONGITUDE](state, longitude) {
        state.longitude = longitude;
    },
    [types.COM_SET_FORMATTED_ADDRESS](state, formattedAddress) {
        state.formattedAddress = formattedAddress;
    },
}


export default {
    state,
    actions,
    getters,
    mutations
}