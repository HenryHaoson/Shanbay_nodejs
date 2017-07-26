let express = require('express'),
    router = express.Router();
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
        if (results[0].groupId === 0) {
            results = {
                code: 410,
                msg: '傻逼，你没有小组',
                data: {}
            };
            return res.json(results);
        }
        userService.queryUsers({groupId:results[0].groupId},function (err,results) {
           if(err){
               results={
                   code:400,
                   msg:'你加入的是一个幽灵小组',
                   data:{}
               }
               res.json(results);
           }else {
               results={
                   code:400,
                   msg:'获取小组成员成功',
                   data:results
               }
               res.json(results);
           }

        });

    })

});
module.exports = router;