let express = require('express'),
    router = express.Router();
let wordService = require('../service/newWordService');
let jwtHelper=require('../utils/jwtHelper');
let config=require('../config/config');

router.post('/', function (req, res) {
    let token=req.body.token || '';
    let decodeToken=jwtHelper.tokenDecode(token,config.jwt_secret);
    console.log(decodeToken);
    let addData = {
        userId: decodeToken.userId,
        wordId: req.body.wordId,
        wordContent: req.body.wordContent
    };
    let results = {};

    wordService.addNewWord(addData,function (err, results) {
        if (err) {
            results = {
                code: 401,
                msg: '已经添加过此单词',
                data: {}
            };
            // return callback(500, results);
            res.json(results);
        }else {
            results = {
                code:200,
                msg:'生词添加成功',
                data:{}
            };
            res.json(results);
        }
    })
});
module.exports = router;