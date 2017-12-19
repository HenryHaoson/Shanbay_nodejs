let express = require('express'),
    router = express.Router();
let userService = require('../service/userService');
let integrationService=require('../service/IntegrationService');

router.post('/', function (req, res) {
    let username = req.body.userName || '',
        password = req.body.password || '';
    let results = {};
    if (username.trim() == '' || password.trim() == '') {
        results = {
            code: 400,
            msg: '用户名或密码不能为空',
            data: {}
        };
        // return callback(400, results);
        res.json(results);
    }
    userService.queryUsers({userName: username}, function (err, results) {
        if (err) {
            results = {
                code: 400,
                msg: '服务器错误',
                data: {}
            };
            // return callback(500, results);
            res.json(results);
        }
        if (results && results.length === 1) {
            results = {
                code: 400,
                msg: '用户名已存在'
            };

            res.json(results);
            // return callback(200, results);

        } else if (results && results.length === 0) {
            userService.addUser({userName: username, password: password}, function (err, results) {
                if (err) {
                    results = {
                        code: 400,
                        msg: '服务器错误',
                        data: {}
                    };
                    res.json(results);
                    // return callback(500, results);
                } else {
                    results = {
                        code: 200,
                        msg: '注册成功',
                        data: {}
                    };
                    //注册后查找userId
                    userService.queryUsers({userName:req.body.userName},function (err,queryresults) {
                          if (queryresults && queryresults.length === 1) {
                              //添加用户的积分信息
                            integrationService.addIntegration({userId:queryresults[0].userId},function (err,callback) {
                                if (err) {
                                    results = {
                                        code: 400,
                                        msg: '添加积分信息出错',
                                        data: {}
                                    };
                                    res.json(results);
                                }else {
                                    res.json(results);
                                }
                            });
                         }
                    });

                }
            });
        }
        else {
            results = {
                code: 400,
                msg: '注册异常'
            };
            res.json(results);
            // return callback(400, results);
        }
    })
});
module.exports = router;