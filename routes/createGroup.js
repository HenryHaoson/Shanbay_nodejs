let express = require('express'),
    router = express.Router();
let groupService = require('../service/groupService');
let userService = require('../service/userService');
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
        if (results[0].groupId !== 0) {
            results = {
                code: 410,
                msg: '已加入小组，不能创建小组',
                data: {}
            };
            return res.json(results);
        }
        let leaderName = results[0].userName;
        let addData = {
            leaderId: decodeToken.userId,
            leaderName: leaderName,
            groupName: req.body.groupName,
            groupBirth: req.body.groupBirth,
            groupDescription: req.body.groupDescription
        };
        console.log(addData);

        groupService.addGroup(addData, function (err, results) {
            if (err) {
                results = {
                    code: 400,
                    msg: '创建小组失败',
                    data: {}
                };
                res.json(results);
            } else {
                let groupId = results.insertId;
                userService.updateUser(decodeToken.userId, {groupId: groupId}, function (err, results) {
                    if (err) {
                        results = {
                            code: 400,
                            msg: '创建小组失败',
                            data: {}
                        };
                        res.json(results);
                    } else {
                        results = {
                            code: 200,
                            msg: '创建小组成功',
                            data: {
                                groupId: groupId
                            }
                        };
                        res.json(results);
                    }
                });

            }
        })

    })

});
module.exports = router;