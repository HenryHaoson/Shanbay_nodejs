let express = require('express'),
    router = express.Router();
let commentDAL = require('../../dal/commentDAL');
let jwtHelper = require('../../utils/jwtHelper');
let config = require('../../config/config');

router.post('/', function (req, res) {
    let token = req.body.token || '';
    let decodeToken = jwtHelper.tokenDecode(token, config.jwt_secret);
    console.log(decodeToken);
    let addData = {
        "commentUserId" : decodeToken.userId || '',
        "commentUserName": req.body.commentUserName || '',
        "dongtaiId":req.body.dongtaiId || '',
        "commentedUserId" : req.body.commentedUserId || '',
        "commentedUserName": req.body.commentedUserName || '',
        "commentContent":req.body.commentContent || ''
    };
    let results = {};

    commentDAL.addComment(addData, function (err, results) {
        if (err) {
            results = {
                code: 400,
                msg: '评论失败',
                data: {}
            };
            res.json(results)
        } else {
            results = {
                code: 200,
                msg: '评论成功',
                data: {}
            };
            res.json(results)
        }
    })
});
module.exports = router;