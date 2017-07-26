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
let appUpload=require('./upload');
let appCreateGroup=require('./createGroup');

router.use('/login', appLogin);
router.use('/register',appRegister);
router.use('/everydaySentence',appEverydaySentence);
router.use('/getDailyWord',appgetEverydayWord);
router.use('/addNewWord',appAddNewWord);
router.use('/getNewWord',appQueryNewWord);
router.use('/study',appStudy);
router.use('/getIntegration',appgetIntegration);
router.use('/upload',appUpload);
router.use('/createGroup',appCreateGroup);
module.exports = router;