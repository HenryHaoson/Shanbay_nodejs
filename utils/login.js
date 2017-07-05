
let userService = require('../service/userService');

exports.login = function(username, password, callback) {
    let queryData = {
            userName: username.trim(),
            password: password.trim()
        },results = {};

    if (username.trim() === '' || password.trim() == '') {
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
            let tokenData = {
                userId: results[0].userId,
                userName: results[0].userName,
                groupId: results[0].groupId
            };

            phoneNumber = results[0].phoneNumber;

            return callback(200, results);

        } else {
            results = {
                errMsg: '用户名密码错误'
            };
            callback(400, results);

        }
    });
};