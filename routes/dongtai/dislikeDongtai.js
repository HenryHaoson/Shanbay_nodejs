let express = require('express'),
    router = express.Router();
let dongtaiLikeDAL = require('../../dal/dongtaiLikeDAL');
let jwtHelper = require('../../utils/jwtHelper');
let config = require('../../config/config');

router.post('/', function (req, res) {
    let token = req.body.token || '';
    let decodeToken = jwtHelper.tokenDecode(token, config.jwt_secret);
    console.log(decodeToken);
    let deleteData = {
        "userId" : decodeToken.userId || '',
        "dongtaiId":req.body.dongtaiId || ''
    };
    let results = {};

    dongtaiLikeDAL.deleteLike(deleteData, function (err, results) {
        if (err) {
            results = {
                code: 400,
                msg: 'dislike失败',
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
