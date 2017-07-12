let express = require('express'),
    router = express.Router();
let wordService = require('../service/newWordService');
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

    wordService.queryNewWord(queryData,function (err, results) {
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
                msg:'生词查询成功',
                data:results
            }
            res.json(results);
        }
    })
});
module.exports = router;