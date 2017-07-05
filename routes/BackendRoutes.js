let express = require('express'),
    router = express.Router(),
    config = require('../config/config');

let appLogin = appRequire('./login');

router.use('/login', appLogin);
module.exports = router;