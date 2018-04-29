let dongtaiDAL = require('../dal/dongtaiDAL');


exports.addDongtai = function (data, callback) {
    let queryData = {
        'dongtaiContent': data.dongtaiContent || '',
        'userId': data.userId || '',
        'userName': data.userName || '',
        'picUrls': data.picUrls || ''
    };


    dongtaiDAL.addDongtai(queryData, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })

};


exports.queryDongtai = function (data, callback) {
    let queryData = {
    };


    dongtaiDAL.addDongtai(queryData, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })

};


exports.deleteDongtai = async function (data, callback) {
    let queryData = {
        'dongtaiId': data.dongtaiId || ''
    };

    await dongtaiDAL.queryDongtai(queryData, function (err, results) {
        if (err) {
            results = {
                code: 401,
                msg: '数据库访问失败',
                data: {}
            };
            return callback(true, results);
        }
        if (data.userId !== results.userId) {
            results = {
                code: 402,
                msg: '没有权限',
                data: {}
            };
            return callback(true, results);
        }
    });

    dongtaiDAL.deleteDongtai(data, function (err, results) {
        if (err) {
            results = {
                code
            };
            return callback(true, results);
        }
        results = {
            code: 200,
            msg: '删除动态成功',
            data: {}
        };

        return callback(false, results);
    });

};
