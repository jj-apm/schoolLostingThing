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


    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };


    return {
        ...config,
        ...userConfig,
    };
};