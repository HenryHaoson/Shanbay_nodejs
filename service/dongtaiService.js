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


exports.deleteDongtai = function (data, callback) {
    let queryData = {
        'dongtaiId' : data.dongtaiId || ''
    };

    dongtaiDAL.queryDongtai()

    dongtaiDAL.deleteDongtai(data, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    });

};
