let express = require('express'),
    router = express.Router(),
    getEverydayWord = require('../utils/getDalyWord').getDalyWord;

router.post('/', function (req, res) {
    var token = req.body.token || '';
    var count =req.body.count || '';
    getEverydayWord(token, count, function (status, results) {
        res.status(status);
        return res.json(results);
    });
});
module.exports = router;