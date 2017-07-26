let express = require('express'),
    router = express.Router();
let userService = require('../service/userService');
let groupService = require('../service/groupService');
let jwtHelper = require('../utils/jwtHelper');
let config = require('../config/config');

router.post('/', function (req, res) {
    let token = req.body.token || '';
    let decodeToken = jwtHelper.tokenDecode(token, config.jwt_secret);
    console.log(decodeToken);
    userService.queryUsers({userId: decodeToken.userId}, function (err, results) {
        if (err) {
            results = {
                code: 400,
                msg: '身份校验失败',
                data: {}
            };
            res.json(results);
        }
        if (results[0].groupId === 0) {
            results = {
                code: 410,
                msg: '傻逼，你没有小组',
                data: {}
            };
            return res.json(results);
        }
        groupService.queryGroup({groupId: results[0].groupId}, function (err, results) {
            if (err) {
                results = {
                    code: 400,
                    msg: '验证小组组长错误',
                    data: {}
                };
                res.json(results);
            } else {
                if (results[0].leaderId === decodeToken.userId) {
                    results = {
                        code: 410,
                        msg: '你是组长啊，先解散群',
                        data: {}
                    };
                    res.json(results);
                } else {
                    userService.updateUser(decodeToken.userId, {groupId: 0}, function (err, results) {
                        if (err) {
                            results = {
                                code: 410,
                                msg: '数据库没有能够修改你的信息',
                                data: {}
                            };
                            return res.json(results);
                        } else {
                            results = {
                                code: 200,
                                msg: '退出小组成功',
                                data: {}
                            };
                            return res.json(results);
                        }
                    });

                }
            }
        });


    })

});
module.exports = router;