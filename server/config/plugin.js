'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    mysql: {
        enable: true,
        package: 'egg-mysql'
    },
    // cors: {
    //     enable: true,
    //     package: 'egg-cors'
    // },
    jwt: {
        enable: true,
        package: 'egg-jwt'
    },
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    }
};