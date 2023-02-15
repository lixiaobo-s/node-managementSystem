const router = require('koa-router')()
const util = require("../utils/util")
const { login, userAll, updatedById, deleteById } = require("../controller/user")
const { getStates } = require("../controller/role")
const jwt = require('jsonwebToken')
router.prefix('/users')
//加密密钥
const secretKey = 'zhangsan';
//登录验证
router.post("/login", async (ctx) => {
  try {
    //获取用户信息
    const { username, password } = ctx.request.body;
    //验证登录信息
    let res = await login(username, password);
    if (res._id) {
      //包含的规则
      let rules = {
        username,
        password
      }

      const token = jwt.sign(rules, secretKey, { expiresIn: 60 * 60 });
      res = { ...res._doc, token };
      ctx.body = util.success({ data: res, msg: '登录成功！' })
    }
  } catch (error) {
    console.log(error);
    ctx.body = util.fail({ data: '', msg: '账号或密码错误' })
  }
})
//获取列表
router.get("/getuserInfo", async (ctx) => {
  const { currentPage, pageSize, userName, userId } = ctx.query;
  //获取全部条数
  let numbers = await userAll(0, 0, userId, userName)
  let res = await userAll(currentPage, pageSize, userId, userName);
  return ctx.body = util.nsuccess({ data: res, totals: numbers.length })
});
router.get("/getRole", async (ctx) => {
  let role = await getStates()
  return ctx.body = util.nsuccess({ data: role })
})

router.put('/updataUser', async (ctx) => {
  const res = await updatedById(ctx.request.body);
  if (res.matchedCount != 0) {
    ctx.body = util.success({ data: '', msg: '修改成功！' })
    return;
  }
  ctx.body = util.fail({ data: '', msg: '修改失败！' })
})
router.delete('/deleteUser', async (ctx) => {
  const userid = ctx.query.userid;
  const res = await deleteById(userid);
  ctx.body = util.success({ data: '', msg: '删除成功！' })
})

// 查询指定的数据
// router

module.exports = router
