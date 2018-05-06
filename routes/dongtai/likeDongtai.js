let express = require('express'),
    router = express.Router();
let dongtaiLikeDAL = require('../../dal/dongtaiLikeDAL');
let jwtHelper = require('../../utils/jwtHelper');
let config = require('../../config/config');

router.post('/', function (req, res) {
    let token = req.body.token || '';
    let decodeToken = jwtHelper.tokenDecode(token, config.jwt_secret);
    console.log(decodeToken);
    let addData = {
        "userId" : decodeToken.userId || '',
        "userName": req.body.userName || '',
        "dongtaiId":req.body.dongtaiId || ''
    };
    let results = {};

    dongtaiLikeDAL.addLike(addData, function (err, results) {
        if (err) {
            results = {
                code: 400,
                msg: 'like失败',
                data: {}
            };
            res.json(results)
        } else {
            results = {
                code: 200,
                msg: 'success',
                data: {}
            };
            res.json(results)
        }
    })
});
module.exports = router;