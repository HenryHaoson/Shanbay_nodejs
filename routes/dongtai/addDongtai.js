let express = require('express'),
    router = express.Router();
let dongtaiService = require('../../service/dongtaiService');
let jwtHelper = require('../../utils/jwtHelper');
let config = require('../../config/config');

router.post('/', function (req, res) {
    let token = req.body.token | '';
    let decodeToken = jwtHelper.tokenDecode(token, config.jwt_secret);
    let userId = decodeToken.userId;
    let addData = {
        userId: userId,
        userName: req.body.userName,
        dongtaiContent: req.body.dongtaiContent,
        picUrls: req.body.picUrls
    };
    dongtaiService.addDongtai(addData, function (err, results) {
        if (err) {
            res.json(results);
            return callback(200, results);
        } else {
            results = {
                code :200,
                msg:'删除动态成功',
                data:results
            };
            return callback(200,results);
        }
    })

});

module.exports = router;
