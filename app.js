const Koa = require('koa')
const app = new Koa()
const path = require('path')
const render = require('koa-art-template')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')
const news = require('./routes/news')
const api = require('./routes/api')

// error handler
onerror(app)

// app.use(jwtKoa({secret:'jwt demo'}).unless({
//   path: [/^\/api\/login/,// ] //数组中的路径不需要通过jwt验证
// }))
// middlewares
app.use(cors());
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

render(app, {
  root: path.join(__dirname, './template'), //模板文件目录
  extname: '.html', //后缀格式
  debug: process.env.NODE_ENV !== 'production'
});

// logger
app.use(async (ctx, next) => {
  ctx.state = { //配置全局变量
    __HOST__: `http://${ctx.request.header.host}`
  }
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(news.routes(), news.allowedMethods());
app.use(api.routes(), api.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
