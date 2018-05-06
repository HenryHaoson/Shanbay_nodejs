let db = require('../db/db');

exports.addLike = function (data, callback) {
    let sql = "INSERT INTO dongtaiLike set ";

    let addSql = '';

    for (let key in data) {
        if (data[key] !== '') {
            if (addSql.length === 0) {
                addSql += key + " = '" + data[key] + "'";
            } else {
                addSql += ' , ' + key + " = '" + data[key] + "'";
            }
        }
    }

    sql += addSql;

    console.log('增加动态like信息：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'dongtaiLikeDAL.addLike()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'dongtaiLikeDAL.addLike()');
                return callback(true, '增加动态like失败');
            }
            return callback(false, results);
        });
    });
};
exports.deleteLike = function (data, callback) {
    let sql = 'delete from dongtaiLike where 1!=1';
    for (let key in data) {
        if (data[key] !== '') {
            sql += ' or ' + key + " = '" + data[key] + "'";
        }
    }
    console.log('删除动态like：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败' + err, 'dongtaiLikeDAL.deleteLike()');
            return callback(true, '数据库连接失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'dongtaiLikeDAL.deleteLike');
                return callback(true, "删除失败");
            }
            return callback(false, results);
        });
    });
};

exports.queryDongtai = function (data, callback) {
    let sql = 'select * ' +
        'from dongtaiLike where 1=1';

    for (let key in data) {
        if (data[key] !== '') {
            sql += ' and ' + key + " = '" + data[key] + "'";
        }
    }

    console.log('查询动态信息：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'dongtaiLikeDAL.queryLike()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'dongtaiLikeDAL.queryLike()');
                return callback(true, '查询失败');
            }
            return callback(false, results);
        });
    });
};
