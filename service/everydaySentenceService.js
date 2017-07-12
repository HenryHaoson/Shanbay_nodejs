var everydaySentenceDAL = require('../dal/everydaySentenceDAL');

exports.queryEverydaySentence = function (callback) {
    everydaySentenceDAL.queryEverydaySentence(function (err, results) {
        if (err) {
            return callback(true, results);
        }

        return callback(false, results);
    })
};