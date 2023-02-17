const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')
const users = require('./routes/users')
const menus = require("./routes/menu")
const jwtKoa = require("koa-jwt")
const { tokenErr } = require("./utils/util");
// error handler
onerror(app)

//配置跨域
app.use(
  cors({
    origin: function (ctx) {
      return 'http://127.0.0.1:5173'
    },

    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 1000,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  await next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 200; //返回前台的状态码
      // ctx.body = 'Protected resource, use Authorization header to get access\n';
      ctx.body = tokenErr({ data: '', msg: 'TOKEN_OVERDUE!' });
    } else {
      throw err;
    }
    // console.log(err);
  });
});
app.use(
  jwtKoa({
    secret: 'zhangsan'
  }).unless({
    path: [/^\/users\/login/, /^\/users\/addUser/],  //登录接口不需要验证
  })
)
app.use(users.routes(), users.allowedMethods())
app.use(menus.routes(), menus.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
