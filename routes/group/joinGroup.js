let express = require('express'),
    router = express.Router();
let userService = require('../../service/userService');
let jwtHelper = require('../../utils/jwtHelper');
let config = require('../../config/config');

router.post('/', function (req, res) {
    let token = req.body.token || '';
    let decodeToken = jwtHelper.tokenDecode(token, config.jwt_secret);
    console.log(decodeToken);
    let addData = {
        userId: decodeToken.userId,
        groupId: req.body.groupId,
    };
    let results = {};

    userService.updateUser({userid:addData.userId},{groupId:addData.groupId}, function (err, results) {
        if (err) {
            results = {
                code: 401,
                msg: '加入小组失败',
                data: {}
            };
            // return callback(500, results);
            res.json(results);
        } else {
            results = {
                code: 200,
                msg: '加入小组成功',
                data: {}
            };
            res.json(results);
        }
    })
});
module.exports = router;