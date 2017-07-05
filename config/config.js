//数据库配置
let config= {
    // 基本配置
    app_name : `Shanbay`,
    app_version : `0.1.0`,
    app_description : `扇贝2号`,
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'shanbay',
        connectionLimit: 100,
        supportBigNumbers: true,
    }
}
module.exports=config;