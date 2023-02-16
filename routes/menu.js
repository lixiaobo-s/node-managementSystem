const { getMenu } = require("../controller/menu");
const router = require('koa-router')()
const { nsuccess } = require("../utils/util")
router.prefix('/menus');

router.get("/getmenus", async (ctx) => {
    let res = await getMenu();
    return ctx.body = nsuccess({ data: res });
})
module.exports = router