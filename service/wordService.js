var wordDAL = require('../dal/wordDAL');

/**
 * data: {
 *  [userId] : 1,
 *  [userName]: 'name',
 *  [password]: 'password',
 *  [groupId]:123
 * }
 */
exports.queryWord = function (data, callback) {
    // let queryData = {
    //     'wordId': data.wordId || '',
    //     'wordContent': data.wordContent || ''
    // };

    wordDAL.queryWord(data, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })

};
