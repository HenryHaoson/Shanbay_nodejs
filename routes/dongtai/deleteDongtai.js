let express = require('express'),
    router = express.Router();
let dongtaiService = require('../../service/dongtaiService');
let jwtHelper=require('../../utils/jwtHelper');
let config=require('../../config/config');

router.post('/', function (req, res) {
    let token=req.body.token || '';
    let decodeToken=jwtHelper.tokenDecode(token,config.jwt_secret);
    console.log(decodeToken);
    let deleteData = {
        userId: decodeToken.userId,
        dongtaiId: req.body.dongtaiId
    };
    let results = {};

    dongtaiService.deleteDongtai(deleteData,function (err, results) {
        if (err) {
            res.json(results);
            return callback(200, results);
        }else {
            results = {
                code:200,
                msg:'删除动态成功',
                data:{}
            };
            res.json(results);
        }
    })
});
module.exports = router;