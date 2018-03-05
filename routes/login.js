let express = require('express'),
    router = express.Router(),
    login = require('../utils/login').login,
    loginWithGithub = require('../utils/login').loginWithGithub;

router.post('/', function (req, res) {
    var username = req.body.userName || '',
        password = req.body.password || '',
        channel = req.body.channel || '';
    if (channel === '') {
        login(username, password, function (status, results) {
            res.status(status);
            return res.json(results);
        });
    } else if (channel !== '' && channel === "github") {
        loginWithGithub(username, password, function (status, results) {
            res.status(status);
            return res.json(results);
        });
    }
});
module.exports = router;