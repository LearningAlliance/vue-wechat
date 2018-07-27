/**
 * 格式化时间
 * 
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
    if (!str) return ''
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return ''
    } else if ((time / 1000 < 30)) {
        return '刚刚'
    } else if (time / 1000 < 60) {
        return parseInt((time / 1000)) + '秒前'
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前'
    } else {
        return parseInt(time / 31536000000) + '年前'
    }
}

// 订单状态（1-待支付，2-已支付，3-已使用，4-已取消，5-退款中，6-已退款）
export const formatOrderState = (key) => {
    if (key == null || key == undefined) {
        return '';
    }
    switch (key) {
        case 1:
            return '待支付';
            break;
        case 2:
            return '已支付';
            break;
        case 3:
            return '已使用';
            break;
        case 4:
            return '已取消';
            break;
        case 5:
            return '退款中';
            break;
        case 6:
            return '已退款';
            break;
        default:
            return '';
            break;
    }
}