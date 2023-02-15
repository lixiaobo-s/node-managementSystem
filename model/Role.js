const mongose = require("../config/db");
const UserSchema = mongose.Schema({
    states: {
        type: Array,
        require: true,
        unique: true
    },
    roles: {
        type: Array,
        require: true,
        unique: true
    },
    userListinfo: {
        type: Object,
        require: true,
        unique: true,
    },
    sex: {
        type: Object,
        require: true,
        unique: true,
    }
})
//定义模型
const Role = mongose.model("Role", UserSchema);
module.exports = Role;