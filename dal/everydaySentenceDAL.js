var db = require('../db/db');

exports.queryEverydaySentence = function (callback) {
    var sql = 'select sentenceDate , sentenceEn , sentenceCh ,sentenceAuthor ,sentenceImage ' +
        'from everydaySentence where 1=1';


    console.log('每日一句查询：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'everydaySentenceDAL.queryEverydaySentence()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'everydaySentenceDAL.queryEverydaySentence()');
                return callback(true, '查询失败');
            }
            return callback(false, results);
        });
    });
};