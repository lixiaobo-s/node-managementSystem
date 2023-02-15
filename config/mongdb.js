//定义数据库的url
const url = "mongodb://localhost:27017";
//定义数据库的名字
const dbName = 'manager';
//拼接完整url
const URL = `${url}/${dbName}`;
//导出
module.exports = {
    URL,
}