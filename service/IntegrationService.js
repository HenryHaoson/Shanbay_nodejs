var integrationDAL = require('../dal/IntegrationDAL');

/**
 * data: {
 *  [userId] : 1,
 *  [userName]: 'name',
 *  [password]: 'password',
 *  [groupId]:123
 * }
 */
exports.queryIntegration = function (data, callback) {
    let queryData = {
        'userId': data.userId || '',
        'personIntegration':data.personIntegration || ''
    };

    integrationDAL.queryIntegration(queryData, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })

};

exports.addIntegration = function (data, callback) {
    let queryData = {
        'userId': data.userId || '',
        'personIntegration':data.personIntegration || '0'
    };
    integrationDAL.addIntegration(queryData, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })

};

exports.updateIntegration = function (accountID, callback) {
    //此处代码暂时没用
    let updateInfo = {
        personIntegration:'personIntegration+1'
    };

    integrationDAL.updateIntegration(accountID, updateInfo, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })
};