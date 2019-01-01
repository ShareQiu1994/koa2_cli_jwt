const router = require('koa-router')();
const jwtKoa = require('koa-jwt')
router.prefix('/api');


const api=require('./api/index.js');

/*token 错误处理*/
router.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
            ctx.body = '受保护的资源，使用授权头获取访问权限';
        }else{
            throw err;
        }
    })
})

/*指定路由不需要token认证*/
router.use(jwtKoa({secret:'jwt demo'}).unless({
  path: [/^\/api\/?$/,/^\/api\/login/] //数组中的路径不需要通过jwt验证
}));

router.use(api.routes());  // 匹配 '/' 路由

module.exports = router;