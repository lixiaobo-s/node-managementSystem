//导入数据库连接
const mongose = require("../config/db");
//配置字段格式
const UserSchema = mongose.Schema({
    userId: {
        type: Number,
        require: true,
        unique: true //唯一不可重复
    },
    username: {
        type: String,
        require: true,
        unique: true //唯一不可重复
    },
    userpassword: {
        type: String,
        require: true,
    },
    userEmail: String, // 用户邮箱
    mobile: String, // 手机号
    sex: Number, // 性别 0:男  1：女
    deptId: [], // 部门
    job: String, // 岗位
    state: {
        type: Number,
        default: 1,
    }, // 1: 在职 2: 离职 3: 试用期
    role: {
        type: Number,
        default: 1,
    }, // 用户角色 0：系统管理员  1： 普通用户
    roleList: [], //系统角色
    createTime: {
        type: Date,
        default: Date.now(),
    }, //创建时间
    lastLoginTime: {
        type: Date,
        default: Date.now(),
    }, //更新时间
},
    {
        timestamps: true, // 时间戳
        versionKey: false, // 清除版本信息
    })
//定义模型
const User = mongose.model("User", UserSchema);
module.exports = User;

