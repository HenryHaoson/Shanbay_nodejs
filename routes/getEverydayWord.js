let express = require('express'),
    router = express.Router(),
    getEverydayWord = require('../utils/getDalyWord').getDailyWord;

router.post('/', function (req, res) {
    let token =req.body.token || '';
    let count =req.body.count || '';
    console.log(req.body.token);
    getEverydayWord(token , count, function (status, results) {
        res.status(status);
        return res.json(results);
    });
});
module.exports = router;