let express = require('express'),
    router = express.Router(),
    config = require('../config/config');

let appLogin = require('./login');
let appRegister = require("./register");
let appEverydaySentence = require('./everydaySentence');
let appgetEverydayWord = require('./getEverydayWord');
let appAddNewWord = require('./addNewWord');
let appQueryNewWord = require('./queryNewWord');
let appStudy = require('./study');
let appgetIntegration = require('./getIntegration');
let appUpload = require('./upload');
let appCreateGroup = require('./createGroup');
let appLeaveGroup = require('./leaveGroup');
let appGetGroupMembers = require('./getGroupMembers');
let appDeleteGroup = require('./deleteGroup');
let appJoinGroup = require('./joinGroup');
let appGetGroups = require('./getGroups');
let appGetGroupComments = require('./getGroupComments');
//dongtai
let appDeleteDongtai = require('./dongtai/deleteDongtai');
let appAddDongtai = require('./dongtai/addDongtai');
let appSendGroupComment = require('./group/sendGroupComment');

let appCommonUpload = require('./commonUpload');
let appFetchDOngtai=require('./dongtai/fetchDongtai');

router.use('/login', appLogin);
router.use('/register', appRegister);
router.use('/everydaySentence', appEverydaySentence);
router.use('/getDailyWord', appgetEverydayWord);
router.use('/addNewWord', appAddNewWord);
router.use('/getNewWord', appQueryNewWord);
router.use('/study', appStudy);
router.use('/getIntegration', appgetIntegration);
router.use('/upload', appUpload);
router.use('/createGroup', appCreateGroup);
router.use('/leaveGroup', appLeaveGroup);
router.use('/getGroupMembers', appGetGroupMembers);
router.use('/deleteGroup', appDeleteGroup);
router.use('/joinGroup', appJoinGroup);
router.use('/getGroups', appGetGroups);
router.use('/getGroupComments', appGetGroupComments);
//dongtai
router.use('/deleteDongtai', appDeleteDongtai);
router.use('/addDongtai', appAddDongtai);
router.use('/fetchDongtai',appFetchDOngtai);

router.use('/sendGroupComment', appSendGroupComment);

router.use('/commonUpload', appCommonUpload);
module.exports = router;