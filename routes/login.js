let express = require('express'),
    router = express.Router(),
    login = require('../utils/login').login;

router.post('/', function (req, res) {
    var username = req.body.userName || '',
        password = req.body.password || '';

    login(username, password, function (status, results) {
        res.status(status);
        return res.json(results);
    });
});
module.exports = router;