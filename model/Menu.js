const mongose = require("../config/db");
const menus = mongose.Schema({
    menuId: {
        type: String,
        require: true,
        unique: true //唯一不可重复
    },
    url: {
        type: String,
        require: true,
        unique: true //唯一不可重复
    },
    path: {
        type: String,
        require: true,
        unique: true //唯一不可重复
    },
    name: {
        type: String,
        require: true,
        unique: true //唯一不可重复
    },
    //图标
    icon: {
        type: String,
    },
    children: Array,
})
const Menu = mongose.model("Menu", menus)
module.exports = Menu;