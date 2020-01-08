'use strict';

/**
 * @param {Egg.Application} app - egg application 
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/admin/login', controller.admin.login);
    router.post('/admin/register', controller.admin.register);
    router.get('/admin/userInfo', controller.admin.getUserInfo);
    router.post('/user/register', controller.user.register);
    router.post('/user/login', controller.user.login);
    router.get('/user/userInfo', controller.user.getUserInfo);
    router.get('/user/resetPassword', controller.user.resetPassword);
};