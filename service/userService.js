var userDAL = require('../dal/userDAL');

/**
 * data: {
 *  [userId] : 1,
 *  [userName]: 'name',
 *  [password]: 'password',
 *  [groupId]:123
 * }
 */
exports.queryUsers = function (data, callback) {
    let queryData = {
        'userId': data.userId || '',
        'userName': data.userName || '',
        'password': data.password || '',
        'groupId': data.groupId || ''
    };

    userDAL.queryUsers(queryData, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })

};

exports.addUser = function (data, callback) {
    let queryData = {
        'userName': data.userName || '',
        'password': data.password || '',
    };

    userDAL.addUser(queryData, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })

};
exports.updateUser = function (conditionData, data, callback) {
    let updateData = {
        'userName': data.userName || '',
        'password': data.password || '',
        'groupId': data.groupId || '',
        'headUrl': data.headUrl || ''
    };

    userDAL.updateUser(conditionData, updateData, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })

};