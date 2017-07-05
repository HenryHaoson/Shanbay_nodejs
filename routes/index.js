var express = require('express');
var router = express.Router();
var login = require('../utils/login').login;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function (req, res) {
    var username = req.body.userName || '',
        password = req.body.password || '';

    login(username, password, function (status, results) {
        res.status(status);
        return res.json(results);
    });
});

module.exports = router;
