var sql = require('../sql');

var home = async (ctx, next) => {
    // ctx.response.body = '<h1>Index</h1>';
    ctx.render('home.html', {
        title: 'welcome',
        bar_data:'[10, 10,10, 10, 10, 10]'
    })
};

var hello = async (ctx, next) => {
    var name = ctx.params.name;
    // ctx.response.body = `<h1>Hello, ${name}!</h1>`;

}


var sql_result = async (ctx, next) => {
    // var arr = "";
    // sql.showResult(ctx, function (err,result) {
    //     arr = JSON.stringify(result);
    //     ctx.render('sql.html', {
    //         arr: arr,
    //         title: sql
    //     });

    // });
    // var testbody = sql.test();
    // ctx.response.body = testbody;

    var arr = "";
    arr = await sql.showResult(ctx, function () { });
    ctx.render('sql.html', {
        arr: arr,
        title: sql
    });
    sql.sqlend();
}

var signin = async (ctx, next) => {
    var email = ctx.request.body.email || "",
        password = ctx.request.body.password || "";
    if (email === 'admin' && password === '123456') {
        ctx.render('signin-ok.html', {
            title: 'signin in ok',
            name:'mr admin'
        });
    } else {
        // faild 
        ctx.render('signin-failed.html', {
            titel:'signin in failed'
        })
    }
}

module.exports = {
    'GET /sql':sql_result,
    'GET /home': home,
    'POST /signin':signin,
    'GET /hello/:name':hello
}