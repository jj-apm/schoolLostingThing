/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1578034092020_5839';

    // add your middleware config here
    config.middleware = [];

    config.sequelize = { // egg-sequelize 配置
        dialect: "mysql", // db type
        database: "lost_thing",
        host: "localhost",
        port: "3306",
        username: "root",
        password: "jjj@669688",
        timezone: '+08:00', // 保存为本地时区
    };
    config.jwt = {
        secret: "1431105276@qq.com" //自定义 token 的加密条件字符串
    };
    config.mysql = {
        client: {
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: 'jjj@669688',
            database: 'lost_thing',
        },
        app: true,
        agent: false,
    };


    //暂时关闭crsf验证
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: ['http://127.0.0.1:7001', 'http://127.0.0.1:7002']
    };
    // 上传文件配置
    config.multipart = {
        mode: 'stream',
        fileSize: '5mb',
    };

    // 跨域配置
    config.cors = {
        origin: 'http://127.0.0.1:8080',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        credentials: true
    };
    //中间件配置
    config.middleware = ['token'];
    config.token = {
            enable: true,
            match: ['/admin/userInfo', '/lost/add', '/claim/add', '/reply/add', '/found/searchKeywords', '/transaction/add', '/thank/add', '/found/add', '/change/add', '/clue/add'], // 只匹配指定路由，反之如果只忽略指定路由，可以用ignore
            // ignore: ['/user/login', '/user/register'] //不要与match一起使用，避免冲突
        }
        // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };


    return {
        ...config,
        ...userConfig,
    };
};