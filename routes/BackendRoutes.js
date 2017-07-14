let express = require('express'),
    router = express.Router(),
    config = require('../config/config');

let appLogin = require('./login');
let appRegister=require("./register");
let appEverydaySentence=require('./everydaySentence');
let appgetEverydayWord=require('./getEverydayWord');
let appAddNewWord=require('./addNewWord');
let appQueryNewWord=require('./queryNewWord');
let appStudy=require('./study');
let appgetIntegration=require('./getIntegration');

router.use('/login', appLogin);
router.use('/register',appRegister);
router.use('/everydaySentence',appEverydaySentence);
router.use('/getDailyWord',appgetEverydayWord);
router.use('/addNewWord',appAddNewWord);
router.use('/queryNewWord',appQueryNewWord);
router.use('/study',appStudy);
router.use('/getIntegration',appgetIntegration);
module.exports = router;