import store from '../vuex/store'
import {
    Toast
} from 'mint-ui'

/** 
 *   Toast公共方法
 */
export function toast(str, icon, cb) {
    store.dispatch('showToast', true)
    if (icon == 'success') {
        store.dispatch('showSuccess', true)
        store.dispatch('showFail', false)
    } else {
        store.dispatch('showSuccess', false)
        store.dispatch('showFail', true)
    }
    store.dispatch('toastMsg', str);
    setTimeout(() => {
        store.dispatch('showToast', false);
        cb && cb();
    }, 1500);
}

/**
 * dialog公共方法
 */

export function alert(str, cb) {
    // store.dispatch('showAlert', true)
    // store.dispatch('alertMsg', str)
    // setTimeout(() => {
    //     store.dispatch('showAlert', false);
    //     cb && cb();
    // }, 1500);
    let instance = Toast(str);
    setTimeout(() => {
        instance.close();
        cb && cb();
    }, 1500);
}

export function alertButtom(str, cb) {
    let instance = Toast({
        message: str,
        position: 'bottom'
    });
    setTimeout(() => {
        instance.close();
        cb && cb();
    }, 1500);
}

Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

export function dateFormat(d, format) {
    return new Date(d).format(format);
}

export function getRequest(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = encodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return decodeURI(unescape(r[2]));
    return null;
}