let express = require('express'),
    router = express.Router();
let dongtaiService = require('../../service/dongtaiService');
let jwtHelper=require('../../utils/jwtHelper');
let config=require('../../config/config');

router.post('/', function (req, res) {
    let token=req.body.token || '';
    let decodeToken=jwtHelper.tokenDecode(token,config.jwt_secret);
    console.log(decodeToken);
    let queryData = {
    };
    let results = {};

    dongtaiService.queryDongtai(queryData,function (err, results) {
        if (err) {
            res.json(results);
            return callback(200, results);
        }else {
            results = {
                code:200,
                msg:'success',
                data:{results}
            };
            return callback(200, results);
        }
    })
});
module.exports = router;