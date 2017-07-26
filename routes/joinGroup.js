let express = require('express'),
    router = express.Router();
let userService = require('../service/userService');
let groupService = require('../service/groupService');
let jwtHelper = require('../utils/jwtHelper');
let config = require('../config/config');

router.post('/', function (req, res) {
    let token = req.body.token || '';
    let decodeToken = jwtHelper.tokenDecode(token, config.jwt_secret);
    let groupId=req.body.groupId;
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
                msg: '傻逼，你已经有小组了',
                data: {}
            };
            return res.json(results);
        }
        userService.updateUser({userId:decodeToken.userId},{groupId:groupId},function (err,results) {
           if(err){
               results = {
                   code: 410,
                   msg: '你真惨，加不了这个小组',
                   data: {}
               };
               return res.json(results);
           } else {
               results = {
                   code: 200,
                   msg: '加入小组成功',
                   data: {}
               };
               return res.json(results);
           }
        });

    })

});
module.exports = router;