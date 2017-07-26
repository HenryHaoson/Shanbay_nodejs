var groupDAL = require('../dal/groupDAL');

exports.queryGroup = function (data, callback) {
    let queryData = {
        'groupId': data.groupId || ''
    };

    groupDAL.queryGroup(queryData, function (err, results) {
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

    groupDAL.addGroup(addData, function (err, results) {
        if (err) {
            return callback(true, results);
        }
        return callback(false, results);
    });

};

exports.deleteGroup = function (data, callback) {
    let deleteData = {
        'groupId': data.groupId || '',
        'groupName': data.groupName || '',
        'groupDescription': data.groupDescription || '',
        'leaderId': data.leaderId || '',
        'leaderName': data.leaderName || '',
        'groupBirth': data.groupBirth || ''
    };
    groupDAL.deleteGroup(deleteData, function (err, results) {
        if (err) {
            return callback(true, results);
        }
        return callback(false, results);
    });


};