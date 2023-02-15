const CODE = {
    SUCCESS: 0, // 没有错误
    PARAM_ERROR: 1001, //参数不正确
    USER_ACCOUNT_ERROR: 2001, //用户账号密码错误
    USER_LOGIN_ERROR: 3001, //用户未登录
    BUSINESS_ERROR: 4001, //业务请求失败
    AUTH_ERROR: 5001, //认证失败或TOKEN过期
    HINt_SUCCESS: 666,//成功但无提示
};

const log = require("./r-log4js")
// 返回分页信息
function pager({ pageNum = 1, pageSize = 10 }) {

    return {
        page: {
            pageNum: pageNum * 1,
            pageSize: pageSize * 1,
        },
        skipIndex: (pageNum * 1 - 1) * pageSize * 1,//从数据库第几条开始
    }
}
//封装返回信息
function success(data = "", code = CODE.SUCCESS) {
    //返回信息
    return {
        code, data
    }
}
function fail(data = "", code = CODE.BUSINESS_ERROR) {
    return {
        code,
        data,
    }
};
function tokenErr(data = "", code = CODE.AUTH_ERROR) {
    return {
        code,
        data
    }
};
function nsuccess(data = "", code = CODE.HINt_SUCCESS) {
    return {
        code,
        data
    }
}
module.exports = {
    pager,
    success,
    fail,
    tokenErr,
    nsuccess
}