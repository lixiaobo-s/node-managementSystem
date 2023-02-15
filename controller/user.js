const User = require("../model/User")
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
async function userAll(currentPage, pageSize, userId, userName) {
    let obj = {};
    if (userId) {
        obj.userId = userId
    }
    if (userName) {
        obj.username = { $regex: `/${userName}/i` }
    }
    console.log(obj);
    //分页查询
    const userAll = await User.find(obj, { userpassword: 0 }).limit(pageSize).skip((currentPage - 1) * pageSize);
    if (userAll) {
        return userAll;
    }
    return false;
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
module.exports = {
    login,
    userAll,
    updatedById,
    deleteById
}