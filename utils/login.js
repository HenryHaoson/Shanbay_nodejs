
let userService = require('../service/userService');
let jwtHelper=require('./jwtHelper');

exports.login = function(username, password, callback) {
    let queryData = {
            userName: username.trim(),
            password: password.trim()
        },results = {};

    if (username.trim() == '' || password.trim() == '') {
        results = {
            errMsg: '用户名或密码不能为空'
        };
        return callback(400, results);
    }

    userService.queryUsers(queryData, function (err, results) {
        if (err) {
            results = {
                errMsg: '服务器错误'
            };
            return callback(500, results);
        }
        console.log(results)
        if (results && results.length === 1) {
         //   要加密的数据，以后用户请求时使用，可以解析出数据来使用。
            let tokenData = {
                userId: results[0].userId,
                userName: results[0].userName,
            };
            let token=jwtHelper.generateToken(tokenData,'1000d');
            results={
                code:200,
                msg:"登陆成功",
                data: {
                    token: token,
                    userData: results[0]
                }
            }

            //注意：不能写成400，一定要是200
            return callback(200, results);

        } else {
            results = {
                code:400,
                msg: '用户名密码错误',
                data:{}
            };
            callback(400, results);

        }
    });
};