let wordService = require('../service/wordService');
let jwtHelper = require('./jwtHelper');
let config = require('../config/config');

//生成随机数
function random(min, max) {
    return Math.floor(Math.random(new Date()) * max + min);
}
function randomCount(count) {
    let a = new Array();
    for (let i = 0; i < count;) {
        let ran = random(0, 999);
        if (a.indexOf(ran) === -1) {
            a.push(ran);
            i++;
        }
    }
    return a;
}
exports.getDailyWord = function (token, count, callback) {

    let decodeToken=jwtHelper.tokenDecode(token,config.jwt_secret);

    console.log(count);
    let a;
    a = randomCount(count);
    console.log(a[0]);
    wordService.queryWord(a, function (err, results) {
        if (err) {
            results = {
                errMsg: '服务器错误'
            };
            return callback(500, results);
        }
        console.log(results);
        console.log(results.length);
        if (results.length == count) {
            console.log(results);
            results = {
                code: 200,
                msg: "获取成功",
                data: results
            };
            callback(200, results);
        } else {
            results = {
                code: 400,
                msg: '数据库无此单词',
                data: {}
            };
            callback(400, results);
        }
    });
};