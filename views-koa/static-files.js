const path = require('path');
// mz提供的API和Node.js的fs模块完全相同，
// 但fs模块使用回调，
// 而mz封装了fs对应的函数，并改为Promise。
const mime = require('mime');
const fs = require('fs');


function statciFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        console.log(rpath);
        // 判断 url 以指定前缀开头 就把路径视为一个文件
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length));
            if (await fs.exists(fp)) {
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = statciFiles;