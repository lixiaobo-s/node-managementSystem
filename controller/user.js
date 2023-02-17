const User = require("../model/User")
const { v4: uuidv4 } = require('uuid');
async function login(username, password) {
    //向数据库中查找数据
    const user = await User.findOne({
        username: username,
        userpassword: password
    }, { userpassword: 0 })
    //返回有唯一id则查询到
    if (user._id) {
        return user;
    }
    return false;
}
//查询用户id是否存在，或者电话邮箱等
async function quryuser(data) {
    let res = await User.find(data);
    return res;
}
async function userAll(currentPage, pageSize, userId, userName) {
    let obj = {};

    if (userId) {
        obj.userId = userId
    }
    //模糊查询
    if (userName) {
        obj.username = { $regex: userName }
    }    //分页查询
    const userAll = await User.find(obj, { userpassword: 0 }).limit(pageSize).skip((currentPage - 1) * pageSize);
    if (userAll) {
        return userAll;
    }
    return false;
}
//新增
async function addUser(data) {
    let obj = {
        userId: uuidv4(),
        ...data,
    }
    let res = await User.create(obj);
    return res;
}
//更新
async function updatedById(data) {
    const { username, userEmail, role, state, userId } = data;

    const res = await User.updateOne(
        { userId }, // 查找条件
        { username, userEmail, state, role } // 修改后的值
    )
    return res;
}
//删除
async function deleteById(userid) {
    await User.deleteOne({ userId: userid })
}
//批量删除
async function deleteUserMany(data) {
    let res = await User.remove({
        userId: {
            $in: data
        }
    });
    return res;
}

module.exports = {
    login,
    userAll,
    updatedById,
    deleteById,
    deleteUserMany,
    addUser,
    quryuser
}