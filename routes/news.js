const router = require('koa-router')();
router.prefix('/news');

const news=require('./news/index.js');

router.use(news.routes());  // 匹配 '/' 路由

module.exports = router;

