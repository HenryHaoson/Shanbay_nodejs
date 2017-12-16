var db = require('../db/db');

exports.queryNewWord = function (data, callback) {
    var sql = 'select wordId , userId ,wordContent  ' +
        'from newWord where 1=1';

    for (let key in data) {
        if (data[key] !== '') {
            sql += ' and ' + key + " = '" + data[key] + "'";
        }
    }

    console.log('查询生词信息：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'newWordDAL.queryNewWord()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'newWordDAL.queryNewWord()');
                return callback(true, '查询失败');
            }
            return callback(false, results);
        });
    });
};
/**
 * 新增生词
 * @param wordInfo
 * @param callback
 */
exports.addNewWord = function (wordInfo, callback) {
    let sql = "INSERT INTO newWord set ";

    let addSql = '';

    for (let key in wordInfo) {
        if (wordInfo[key] !== '') {
            if(addSql.length === 0) {
                addSql += key + " = '" + wordInfo[key] + "'";
            } else {
                addSql += ' , ' + key + " = '" + wordInfo[key] + "'";
            }
        }
    }

    sql += addSql;

    console.log('增加生词信息：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'newWordDAL.addNewWord()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'newWordDAL.addNewWord()');
                return callback(true, '增加用户失败');
            }
            return callback(false, results);
        });
    });
};