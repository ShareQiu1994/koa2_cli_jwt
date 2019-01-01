var router = require('koa-router')();

router.get('/', async (ctx,next)=>{  //get请求
    await ctx.render('news/index'); //渲染art-template模板  
});

router.get('/get', async (ctx,next)=>{  //get请求
    ctx.body = '新闻增加';
});

router.get('/update', async (ctx,next)=>{  //get请求
    ctx.body = '新闻修改';
});

router.get('/delete', async (ctx,next)=>{  //get请求
    ctx.body = '新闻删除';
});

module.exports = router;