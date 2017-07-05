let mysql = require('mysql'),
    config = require('../config/config'),
    dbPool = mysql.createPool(config.mysql);

exports.mysqlPool = dbPool;