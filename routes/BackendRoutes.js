let express = require('express'),
    router = express.Router(),
    config = require('../config/config');

let appLogin = require('./login');

router.use('/login', appLogin);
module.exports = router;