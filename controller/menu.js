const menuType = require("../model/Menu");
//获取惨淡的信息
async function getMenu() {
    let res = await menuType.find();
    return res;
}
module.exports = {
    getMenu
}