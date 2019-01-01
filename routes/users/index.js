var router = require('koa-router')();

router.get('/', async (ctx,next)=>{  //get请求
    await ctx.render('users/index'); //渲染art-template模板  
}) 

module.exports = router;

