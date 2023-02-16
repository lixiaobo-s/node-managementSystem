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
    name: {
        type: String,
        require: true,
        unique: true //唯一不可重复
    },
    children: Array,
})
const Menu = mongose.model("Menu", menus)
module.exports = Menu;