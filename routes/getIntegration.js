let express = require('express'),
    router = express.Router();
let wordService = require('../service/IntegrationService');
let jwtHelper=require('../utils/jwtHelper');
let config=require('../config/config');

router.post('/', function (req, res) {
    var token=req.body.token || '';
    let decodeToken=jwtHelper.tokenDecode(token,config.jwt_secret);
    console.log(decodeToken);
    let queryData = {
        userId: decodeToken.userId,
    };
    var results = {};

    wordService.queryIntegration(queryData,function (err, results) {
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
                msg:'生成积分成功',
                data:results
            }
            res.json(results);
        }
    })
});
module.exports = router;