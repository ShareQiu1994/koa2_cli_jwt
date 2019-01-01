var router = require('koa-router')();
const jwt = require('jsonwebtoken');
const util = require('util')
const verify = util.promisify(jwt.verify) //解密 获取token用户信息

router.get('/', async (ctx, next) => {  //get请求
    await ctx.render('api/index'); //渲染art-template模板  
});

router.post('/login', async (ctx, next) => {
    const user = ctx.request.body
    if (user && user.name) {
        let userToken = {
            name: user.name
        }
        const token = jwt.sign(userToken, 'jwt demo', { expiresIn: '1h' })  //登录成功后 token签名 有效期为1小时
        ctx.body = {
            message: '获取token成功',
            code: 1,
            token   //将token返回  客户端将token 存进请求头 Authorization 中
        }
    } else {
        ctx.body = {
            message: '参数错误',
            code: -1
        }
    }
});

router.get('/userInfo', async (ctx, next) => {
    const token = ctx.header.authorization  // 获取jwt
    if (token) {
        let payload = await verify(token.split(' ')[1], 'jwt demo')  // // 解密，获取payload
        ctx.body = {
            payload
        }
    } 
})

router.get('/get', async (ctx, next) => {  //get请求
    ctx.body = [{
        title: '台风山竹席卷广东，最大风力18级',
        data: 80
    },
    {
        title: '广东GDP今年有望突破万亿大关',
        data: 50
    }];
});

router.get('/update', async (ctx, next) => {  //get请求
    ctx.body = {
        title: '修改成功(模拟)',
        numbe: 1,
        status: 200
    };
});

router.get('/delete', async (ctx, next) => {  //get请求
    ctx.body = {
        title: '删除成功(模拟)',
        numbe: 1,
        status: 200
    };
});

module.exports = router;