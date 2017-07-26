var newWordDAL = require('../dal/groupDAL');

/**
 * data: {
 *  [userId] : 1,
 *  [wordId]: 'name',
 *  [wordContent]: 'password',
 * }
 */
exports.queryGroup= function (data, callback) {
    let queryData = {
        'groupId': data.groupId || ''
    };

    newWordDAL.queryGroup(queryData, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })

};

exports.addGroup = function (data, callback) {
    let addData = {
        'groupName': data.groupName || '',
        'groupDescription': data.groupDescription || '',
        'leaderId': data.leaderId || '',
        'leaderName': data.leaderName || '',
        'groupBirth': data.groupBirth || ''
    };

    newWordDAL.addGroup(addData, function (err, results) {
        if (err) {
            return callback(true, results);
        }
        return callback(false, results);
    })

};