let express = require('express'),
    router = express.Router();
let formidable = require('formidable');
let fs = require('fs');
let path = require("path");
let jwtHelper = require('../utils/jwtHelper');
let config = require('../config/config');
let userService = require('../service/userService');
router.post('/', function (req, res) {
    console.log('开始文件上传....');
    let form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./public/images/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制
    form.maxFieldsSize = 1024 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和

    form.parse(req, function (err, fields, files) {
        console.log("uploading");
        console.log(fields);
        let token = fields.token;
        let decodeToken = jwtHelper.tokenDecode(token, config.jwt_secret);
        for (let i in files) {
            console.log(i);
            console.log(files[i])
        }
        let filename = files.file.name;
        // 对文件名进行处理，以应对上传同名文件的情况
        let nameArray = filename.split('.');
        let type = nameArray[nameArray.length - 1];
        let name = '';
        for (let i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        let rand = Math.random() * 100 + 900;
        let num = parseInt(rand, 10);

        let fileName = name + num + '.' + type;
        let newpath = './public/images/' + fileName;
        // console.warn('oldpath:'+oldpath+' newpath:'+newpath);
        fs.rename(files.file.path, newpath, function (err) {
            if (err) {
                console.error("改名失败" + err);
                return res.json({'code': 400, 'msg': 'upload failed', 'data': {}});
            }

            results = {
                code: 200,
                msg: '上传图片成功',
                data: {
                    picUrl: 'images/' + fileName
                }
            };
            return res.json(results);
        });

    });

});

module.exports = router;