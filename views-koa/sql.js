// const mysql = require('koa-mysql');

const mysql = require('mysql');

var connection = mysql.createConnection({
    user: "",
    password: "",
    database: "world",
    host: "0.0.0.0:3306"
});

connection.connect();

module.exports = {
    showResult: function (ctx, callback) { 
        var sql = 'SELECT Name FROM city WHERE CountryCode = "AFG"';
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) reject(err);
                // result = JSON.stringify(result);
                // callback(err, result);
                // console.log(result);
                // connection.release();
                resolve(JSON.stringify(result));
                // connection.end();
            });
        });
        
    },
    test:function() {
        return "hello world from test";
    },
    sqlend: function () {
        connection.end();
    }
}



