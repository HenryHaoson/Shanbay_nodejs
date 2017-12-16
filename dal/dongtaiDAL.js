var db = require('../db/db');

exports.addDongtai = function (dongtaiInfo, callback) {
    let sql = "INSERT INTO dongtai set ";

    let addSql = '';

    for (let key in groupInfo) {
        if (dongtaiInfo[key] !== '') {
            if (addSql.length === 0) {
                addSql += key + " = '" + dongtaiInfo[key] + "'";
            } else {
                addSql += ' , ' + key + " = '" + dongtaiInfo[key] + "'";
            }
        }
    }

    sql += addSql;

    console.log('增加动态信息：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'dongtaiDAL.addDongtai()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'dongtaiDAL.addDongtai()');
                return callback(true, '增加动态失败');
            }
            return callback(false, results);
        });
    });
};

exports.queryDongtai = function (data, callback) {
    var sql = 'select dongtaiId , groupName ,groupDescription ,groupBirth ,leaderId ,leaderName ,groupUrl ' +
        'from dongtai where 1=1';

    for (let key in data) {
        if (data[key] !== '') {
            sql += ' and ' + key + " = '" + data[key] + "'";
        }
    }

    console.log('查询小组信息：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'dongtaiDAL.queryDongtai()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'dongtaiDAL.queryDongtai()');
                return callback(true, '查询失败');
            }
            return callback(false, results);
        });
    });
};

exports.deleteDongtai = function (data, callback) {
    var sql = 'delete from dongtai where 1!=1';
    for (let key in data) {
        if (data[key] !== '') {
            sql += ' or ' + key + " = '" + data[key] + "'";
        }
    }
    console.log('删除动态：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败' + err, 'dongtaiDAL.deleteDongtai()');
            return callback(true, '数据库连接失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'dongtaiDAL.deleteDongtai');
                return callback(true, "删除失败");
            }
            return callback(false, results);
        });
    });
}