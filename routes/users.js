const router = require('koa-router')();
router.prefix('/users');

const index=require('./users/index.js');
const bar=require('./users/bar.js');


router.use(index.routes());  // 匹配 '/' 路由
router.use('/bar',bar.routes()); 

module.exports = router;

