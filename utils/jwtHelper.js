/**
 * @Author: bitzo
 * @Date: 2017/6/16 15:43
 * @Last Modified by: henry
 * @Last Modified time: 2017/6/16 15:43
 * @Function: generate JWT
 */

let jwt = require('jsonwebtoken'),
    config = require('../config/config');

exports.getToken = function (data) {
    return token = jwt.sign(data, config.jwt_secret, { expiresIn: '1d' });
};

exports.generateToken = function (data,ttl) {
    return token = jwt.sign(data, config.jwt_secret, { expiresIn: ttl });
};

exports.tokenDecode = function (token, secret) {
    return decodedData = jwt.verify(token, secret);
};

// sign asynchronously
exports.sign = function (data,secret,ttl,callback) {

    jwt.sign(data, secret, {expiresIn: ttl}, function(err, token) {
        if (err) {
            return callback(true,'生成token失败');
        }
        return callback(false,token);
    });
};

exports.verify = function (token,secret,callback) {
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            console.log("err occur");
            console.log(err);
            return callback(true,'token过期了');
        }

        return callback(false,decoded);

    });
};
