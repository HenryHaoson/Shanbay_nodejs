var db = require('../db/db');

exports.queryWord = function (data,callback) {
    var sql = 'select wordId , wordContent ' +
        'from word where 1!=1 ';
    // for (let key in data) {
    //     if (data[key] !== '') {
    //         sql += ' and ' + key + " = '" + data[key] + "'";
    //     }
    // }
    for(let i=0;i<data.length;i++){
        sql += ' or ' + 'wordId' + " = '" + data[i] + "'";
    }

    console.log('打卡单词：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'wordDAL.queryWord()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'wordDAL.queryWord()');
                return callback(true, '查询失败');
            }
            return callback(false, results);
        });
    });
};