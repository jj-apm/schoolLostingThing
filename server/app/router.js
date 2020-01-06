'use strict';

/**
 * @param {Egg.Application} app - egg application 
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/user/login', controller.admin.login);
    router.post('/user/registor', controller.admin.register);
};