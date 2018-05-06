let express = require('express'),
    router = express.Router();
let commentDAL = require('../../dal/commentDAL');
let jwtHelper = require('../../utils/jwtHelper');
let config = require('../../config/config');

router.post('/', function (req, res) {
    let token = req.body.token || '';
    let decodeToken = jwtHelper.tokenDecode(token, config.jwt_secret);
    console.log(decodeToken);
    let queryData = {
        "dongtaiId":req.body.dongtaiId || '',
    };
    let results = {};

    commentDAL.queryComment(queryData, function (err, results) {
        if (err) {
            results = {
                code: 400,
                msg: '获取失败',
                data: {}
            };
            res.json(results)
        } else {
            results = {
                code: 200,
                msg: '获取成功',
                data: {results}
            };
            res.json(results)
        }
    })
});
module.exports = router;