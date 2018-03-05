let userService = require('../service/userService');
let jwtHelper = require('./jwtHelper');
let integrationService = require('../service/IntegrationService');

exports.login = function (username, password, callback) {
    let queryData = {
        userName: username.trim(),
        password: password.trim()
    }, results = {};

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
        console.log(results);
        if (results && results.length === 1) {
            //   要加密的数据，以后用户请求时使用，可以解析出数据来使用。
            let tokenData = {
                userId: results[0].userId,
                // userName: results[0].userName,
            };
            let token = jwtHelper.generateToken(tokenData, '1000d');
            results = {
                code: 200,
                msg: "登陆成功",
                data: {
                    token: token,
                    userData: results[0]
                }
            };

            //注意：不能写成400，一定要是200
            return callback(200, results);

        } else {
            results = {
                code: 400,
                msg: '用户名密码错误',
                data: {}
            };
            callback(400, results);

        }
    });
};

exports.loginWithGithub = function (username, password, callback) {
    let queryData = {
        userName: username.trim(),
        password: password.trim()
    }, results = {};

    if (username.trim() == '' || password.trim() == '') {
        results = {
            errMsg: '用户名或密码不能为空'
        };
        return callback(400, results);
    }

    userService.queryUsers({userName: username}, function (err, results) {
        if (err) {
            results = {
                errMsg: '服务器错误'
            };
            return callback(500, results);
        }
        console.log(results);
        if (results && results.length === 0) {
            userService.addUser({userName: username, password: password}, function (err, results) {
                if (err) {
                    results = {
                        code: 400,
                        msg: '服务器错误',
                        data: {}
                    };
                    return callback(500, results);
                } else {
                    results = {
                        code: 200,
                        msg: '注册成功',
                        data: {}
                    };
                    //注册后查找userId
                    userService.queryUsers({userName: username}, function (err, queryresults) {
                        if (queryresults && queryresults.length === 1) {
                            //添加用户的积分信息
                            integrationService.addIntegration({userId: queryresults[0].userId}, function (err, integrationresult) {
                                if (err) {
                                    results = {
                                        code: 400,
                                        msg: '添加积分信息出错',
                                        data: {}
                                    };
                                    return callback(200, results);
                                } else {
                                    //   要加密的数据，以后用户请求时使用，可以解析出数据来使用。
                                    let tokenData = {
                                        userId: queryresults[0].userId,
                                        // userName: results[0].userName,
                                    };
                                    let token = jwtHelper.generateToken(tokenData, '1000d');
                                    results = {
                                        code: 200,
                                        msg: "登陆成功",
                                        data: {
                                            token: token,
                                            userData: queryresults[0]
                                        }
                                    };

                                    //注意：不能写成400，一定要是200
                                    return callback(200, results);
                                }
                            });
                        }
                    });

                }
            });
        }
        else if (results && results.length === 1) {
            //   要加密的数据，以后用户请求时使用，可以解析出数据来使用。
            let tokenData = {
                userId: results[0].userId,
                // userName: results[0].userName,
            };
            let token = jwtHelper.generateToken(tokenData, '1000d');
            results = {
                code: 200,
                msg: "登陆成功",
                data: {
                    token: token,
                    userData: results[0]
                }
            };

            //注意：不能写成400，一定要是200
            return callback(200, results);

        } else {
            results = {
                code: 400,
                msg: '用户名密码错误',
                data: {}
            };
            return callback(400, results);

        }
    });
};

