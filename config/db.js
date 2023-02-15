//引入mongoose
const mongoose = require("mongoose");
//引入封装好的日志
const log4js = require("../utils/r-log4js");
//引入数据库，地址配置、
const monUrl = require("./mongdb");
//链接数据库
mongoose.connect(monUrl.URL);
const conn = mongoose.connection;
//监听成功
conn.on("open", () => {
    log4js.info('数据库连接成功！')
})
conn.on("error", () => {
    log4js.error('数据库连接失败！')
})
module.exports = mongoose;