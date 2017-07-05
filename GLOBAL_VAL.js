
global.APP_PATH = __dirname;

global.errAlert = function (errMsg, location) {
    console.log('=====ERROR=========================================================================');
    console.log('| ' + location + ' : ');
    console.log('| ');
    console.log('| ' + errMsg);
    console.log('| ');
    console.log('===================================================================================');
};

global.appRequire = function(path) {
    return require(require('path').resolve(__dirname, path));
};