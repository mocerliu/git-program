const fs = require('fs');


var myecharts = async (ctx, next) => {
    ctx.response.body = fs.createReadStream();
}