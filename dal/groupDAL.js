var db = require('../db/db');

exports.addGroup = function (groupInfo, callback) {
    let sql = "INSERT INTO group set ";

    let addSql = '';

    for (let key in groupInfo) {
        if (groupInfo[key] !== '') {
            if (addSql.length === 0) {
                addSql += key + " = '" + groupInfo[key] + "'";
            } else {
                addSql += ' , ' + key + " = '" + groupInfo[key] + "'";
            }
        }
    }

    sql += addSql;

    console.log('增加用户信息：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'groupDAL.addGroup()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'groupDAL.addGroup()');
                return callback(true, '增加用户失败');
            }
            return callback(false, results);
        });
    });
};

exports.queryGroup = function (data, callback) {
    var sql = 'select groupId , groupName ,groupDescription ,groupBirth ,leaderId ,leaderName ,groupUrl ' +
        'from group where 1=1';

    for (let key in data) {
        if (data[key] !== '') {
            sql += ' and ' + key + " = '" + data[key] + "'";
        }
    }

    console.log('查询小组信息：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'groupDAL.queryGroup()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'groupDAL.queryGroup()');
                return callback(true, '查询失败');
            }
            return callback(false, results);
        });
    });
};

exports.deleteGroup = function (data, callback) {
    var sql = 'delete from group where 1=1';
    for (let key in data) {
        if (data[key] !== '') {
            sql += ' and ' + key + " = '" + data[key] + "'";
        }
    }
    console.log('删除小组：'+sql);

    db.mysqlPool.getConnection(function (err,connection){
        if(err){
            errAlert('数据库连接失败'+err,'groupDAL.deleteGroup()');
            return callback(true,'数据库连接失败');
        }

        connection.query(sql,function (err,results) {
            connection.release();

            if(err){
                errAlert('sql语句：'+err,'groupDAL.deleteGroup');
                return callback(true,"删除失败");
            }
            return callback(false,results);
        });
    });
}