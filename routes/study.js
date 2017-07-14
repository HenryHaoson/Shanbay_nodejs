let express = require('express'),
    router = express.Router();
let integratinoService = require('../service/IntegrationService');
let jwtHelper=require('../utils/jwtHelper');
let config=require('../config/config');

router.post('/', function (req, res) {
    var token=req.body.token || '';
    let decodeToken=jwtHelper.tokenDecode(token,config.jwt_secret);
    console.log(decodeToken);
    let integrationData = {

    };
    var results = {};

    integratinoService.updateIntegration(decodeToken.userId,function (err, results) {
        if (err) {
            results = {
                code: 400,
                msg: '打卡失败',
                data: {}
            };
            // return callback(500, results);
            res.json(results);
        }else {
            results = {
                code:200,
                msg:'打卡成功',
                data:{}
            }
            res.json(results);
        }
    })
});
module.exports = router;