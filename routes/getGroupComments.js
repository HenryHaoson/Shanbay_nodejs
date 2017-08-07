let express = require('express'),
    router = express.Router();
let groupCommentService = require('../service/groupCommentService');
let jwtHelper=require('../utils/jwtHelper');
let config=require('../config/config');

router.post('/', function (req, res) {
    let token=req.body.token || '';
    let decodeToken=jwtHelper.tokenDecode(token,config.jwt_secret);
    let groupId=req.body.groupId || '';
    console.log(decodeToken);

    groupCommentService.queryGroupComment(groupId,function (err, results) {
        if (err) {
            results = {
                code: 400,
                msg: '服务器错误',
                data: {}
            };
            // return callback(500, results);
            res.json(results);
        }else {
            results = {
                code:200,
                msg:'获取小组评论成功',
                data:results
            };
            res.json(results);
        }
    })
});
module.exports = router;