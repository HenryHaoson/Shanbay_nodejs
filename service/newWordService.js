var newWordDAL = require('../dal/newWordDAL');

/**
 * data: {
 *  [userId] : 1,
 *  [wordId]: 'name',
 *  [wordContent]: 'password',
 * }
 */
exports.queryNewWord= function (data, callback) {
    let queryData = {
        'userId': data.userId || ''
    };

    newWordDAL.queryNewWord(queryData, function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })

};

exports.addNewWord = function (data, callback) {
    let addData = {
        'userId': data.userId || '',
        'wordId': data.wordId || '',
        'wordContent': data.wordContent || ''
    };

    newWordDAL.addNewWord(addData, function (err, results) {
        if (err) {
            return callback(true, results);
        }
        return callback(false, results);
    })

};