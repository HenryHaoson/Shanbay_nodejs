let express = require('express'),
    router = express.Router();
let everydaySenteceService = require('../service/everydaySentenceService');

router.get('/', function (req, res) {
    let results = {};

    everydaySenteceService.queryEverydaySentence(function (err, results) {
        if (err) {
            results = {
                code: 400,
                msg: '服务器错误',
                data: {}
            };
            // return callback(500, results);
            res.json(results);
        }
        if (results && results.length !== 0) {
            results={
                code:200,
                msg:'获取成功',
                data:results[0]
            }
            res.json(results);
            // return callback(200,results)
        }
        else {
            results = {
                code: 400,
                msg: '获取异常'
            }
            res.json(results);
            // return callback(400, results);
        }
    })
});
module.exports = router;