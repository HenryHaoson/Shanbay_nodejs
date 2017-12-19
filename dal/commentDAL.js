let db = require('../db/db');

exports.addComment = function (commentInfo, callback) {
    let sql = "INSERT INTO comment set ";

    let addSql = '';

    for (let key in dongtaiInfo) {
        if (commentInfo[key] !== '') {
            if (addSql.length === 0) {
                addSql += key + " = '" + commentInfo[key] + "'";
            } else {
                addSql += ' , ' + key + " = '" + commentInfo[key] + "'";
            }
        }
    }

    sql += addSql;

    console.log('增加评论信息：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'commentDAL.addComment()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'commentDAL.addComment()');
                return callback(true, '增加动态失败');
            }
            return callback(false, results);
        });
    });
};

exports.queryComment = function (data, callback) {
    let sql = 'select commentId , commentContent ,commentUserId ,commentUserName ,date ,commentedUserId ,commentedUserName  ' +
        'from dongtai where 1=1';

    for (let key in data) {
        if (data[key] !== '') {
            sql += ' and ' + key + " = '" + data[key] + "'";
        }
    }

    console.log('查询动态信息：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'commentDAL.queryComment()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'commentDAL.queryComment()');
                return callback(true, '查询失败');
            }
            return callback(false, results);
        });
    });
};

exports.deleteComment = function (data, callback) {
    let sql = 'delete from comment where 1!=1';
    for (let key in data) {
        if (data[key] !== '') {
            sql += ' or ' + key + " = '" + data[key] + "'";
        }
    }
    console.log('删除评论：' + sql);

    db.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            errAlert('数据库连接失败' + err, 'commentDAL.deleteComment()');
            return callback(true, '数据库连接失败');
        }

        connection.query(sql, function (err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'commentDAL.deleteComment');
                return callback(true, "删除失败");
            }
            return callback(false, results);
        });
    });
};
