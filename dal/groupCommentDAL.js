let db = require('../db/db');
 exports.queryComment=function (groupId,callback) {
    let sql = 'select user.userName , user.headUrl , groupComment.date , groupComment.content from user ,groupComment ' +
        'where user.userId = groupComment.userId and groupComment.groupId = '+groupId ;
    console.log('查询小组评论信息'+sql);
    
   db.mysqlPool.getConnection(function (err,connection) {
      if(err){
          errAlert('数据库连接失败！' + err, 'groupCommentDAL.queryComment()');
          return callback(true, '连接数据库失败');
      } 
      connection.query(sql,function (err,results ){
          connection.release();

          if (err) {
              errAlert('sql语句：' + err, 'groupCommentDAL.queryComment()');
              return callback(true, '查询小组评论失败');
          }
          return callback(false, results);
      });
   });
};