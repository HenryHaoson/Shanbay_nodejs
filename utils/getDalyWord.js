let wordService = require('../service/wordService');
let jwtHelper=require('./jwtHelper');
let config=require('../config/config');

//生成随机数
function random(min, max){
    return Math.floor(Math.random(new Date()) * max + min);
}
function randomCount(count) {
    let a=new Array();
    for(i=0;i<count;){
        let ran=random(0,999);
        if(a.indexOf(ran)===-1){
            a.push(ran);
            i++;
        }
    }
    return a;
}
exports.getDalyWord = function(token,count, callback) {
    //解析token
    let decodeToken=jwtHelper.tokenDecode(token,config.jwt_secret);
    console.log(decodeToken);
    //生成count数量的不重复的随机数
    let a=new Array();
    a=randomCount(count);
        wordService.queryWord(a, function (err, results) {
            if (err) {
                results = {
                    errMsg: '服务器错误'
                };
                return callback(500, results);
            }
            console.log(results);
            if (results && results.length === count) {
                //   要加密的数据，以后用户请求时使用，可以解析出数据来使用。
                console.log(results);
                results={
                    code:200,
                    msg:"获取成功",
                    data:results
                }
                callback(200,results);
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