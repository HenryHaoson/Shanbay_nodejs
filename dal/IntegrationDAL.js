var db = require('../db/db');

exports.queryIntegration = function (data, callback) {
    var sql = 'select userId , personIntegration ' +
        'from userIntegration where 1=1';

    for (let key in data) {
        if (data[key] !== '') {
            sql += ' and ' + key + " = '" + data[key] + "'";
        }
    }

    console.log('查询用户积分信息：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'IntegrationDAL.queryIntegration()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'IntegrationDAL.queryIntegration()');
                return callback(true, '查询失败');
            }
            return callback(false, results);
        });
    });
};
/**
 * 新增用户
 * @param userInfo
 * @param callback
 */
exports.addIntegration = function (data, callback) {
    let sql = "INSERT INTO userIntegration set ";

    let addSql = '';

    for (let key in data) {
        if (data[key] !== '') {
            if(addSql.length === 0) {
                addSql += key + " = '" + data[key] + "'";
            } else {
                addSql += ' , ' + key + " = '" + data[key] + "'";
            }
        }
    }

    sql += addSql;

    console.log('增加积分信息：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'IntegrationDAL.queryIntegration()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'IntegrationDAL.addIntegration()');
                return callback(true, '增加积分失败');
            }
            return callback(false, results);
        });
    });
};

exports.updateIntegration = function (userId, data, callback) {
    let sql = 'update userIntegration set personIntegration = personIntegration+1',
        updateSQL = '';

    // for (let key in data) {
    //     if (data[key] !== '') {
    //         if(updateSQL.length === 0) {
    //             updateSQL += key + " = '" + data[key] + "'";
    //         } else {
    //             updateSQL += ' , ' + key + " = '" + data[key] + "'";
    //         }
    //     }
    // }

    sql += updateSQL + " where userId = '" + userId + "'";

    console.log('修改积分信息：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'IntegrationDAL.queryIntegration()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'IntegrationDAL.queryIntegration()');
                return callback(true, '修改失败');
            }
            return callback(false, results);
        });
    });
};