let dal = require('../dal/groupCommentDAL');

exports.queryGroupComment = function (groupId, callback) {
    dal.queryComment(groupId, function (err, results) {
        if (err) {
            return callback(true, results)
        } else {
            return callback(false, results)
        }
    });
};

exports.addGroupComment = function (groupComment,callback) {
  dal.addComment(groupComment,function (err,results) {
      if (err) {
          return callback(true, results)
      } else {
          return callback(false, results)
      }
  });
};
