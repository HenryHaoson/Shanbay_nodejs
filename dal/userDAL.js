var db = require(APP_PATH + '/db/db');

exports.queryUsers = function (data, callback) {
    var sql = 'select userId , userName ,password , groupId' +
        'from userinfo where 1=1';

    for (let key in data) {
        if (data[key] !== '') {
            sql += ' and ' + key + " = '" + data[key] + "'";
        }
    }

    console.log('查询用户信息：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'userDAL.queryUsers()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'userDAL.queryUsers()');
                return callback(true, '查询失败');
            }
            return callback(false, results);
        });
    });
};