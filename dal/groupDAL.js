var db = require('../db/db');

exports.addGroup = function (groupInfo, callback) {
    let sql = "INSERT INTO user set ";

    let addSql = '';

    for (let key in userInfo) {
        if (userInfo[key] !== '') {
            if(addSql.length === 0) {
                addSql += key + " = '" + userInfo[key] + "'";
            } else {
                addSql += ' , ' + key + " = '" + userInfo[key] + "'";
            }
        }
    }

    sql += addSql;

    console.log('增加用户信息：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'userDAL.addUserInfo()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'userDAL.addUserInfo()');
                return callback(true, '增加用户失败');
            }
            return callback(false, results);
        });
    });
};