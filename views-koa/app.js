const koa = require('koa');
const fs = require('fs');
const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();
const nunjucks = require('nunjucks');
const controller = require('./controller.js');
let staticFiles = require('./static-files');
let templating = require('./templating');


const app = new koa();
// 1、记录url 以及 页面访问时间
app.use(async (ctx, next) => {
    console.log(`process ${ctx.request.method} ${ctx.request.url}`);
    var start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
})
const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);

if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('./static/', __dirname + '/static'));
}

// 2、解析POST
app.use(bodyparser());
// 3、给 ctx 加上 render()
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));
// 4、处理路由
app.use(router.routes());
app.use(controller());




// addControllers(router);
// 在端口3000监听:
app.listen(3001);
console.log('app started at port 127.0.0.1:3001');