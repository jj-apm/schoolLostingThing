'use strict';

/**
 * @param {Egg.Application} app - egg application 
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/user/register', controller.user.register);
    router.post('/user/login', controller.user.login);
    router.get('/user/userInfo', controller.user.getUserInfo);
    router.post('/user/resetPassword', controller.user.resetPassword);
    router.post('/lost/add', controller.lost.add);
    router.post('/lost/editStatus/:id', controller.lost.update);
    router.delete('/lost/:id', controller.lost.delete);
    router.get('/lost', controller.lost.find);
    router.get('/lostById', controller.lost.findById);
    router.post('/searchKeywords', controller.lost.searchKeywords);

    router.post('/found/add', controller.found.add);
    router.post('/found/editStatus/:id', controller.found.update);
    router.get('/found', controller.found.find);
    router.get('/foundById', controller.found.findById);
    router.post('/foundSearch', controller.found.foundSearch)
    router.post('/kind/add', controller.kind.add);
    router.post('/kind/:id', controller.kind.update);
    router.delete('/kind/:id', controller.kind.delete);
    router.get('/kind', controller.kind.find);
    router.get('/kind/:id', controller.kind.findById);
    router.post('/clue/add', controller.clue.add);
    router.get('/clue', controller.clue.find);
    router.get('/clue/:id', controller.clue.findById);
    router.delete('/clue/:id', controller.clue.delete);
    router.get('/notice', controller.clue.getNotice);
    router.post('/notice/editType/:id', controller.clue.editNoticeStatus);
    router.post('/reply/add', controller.reply.add)
    router.get('/reply', controller.reply.find)
    router.get('/notice/reply', controller.reply.findReply)

    router.post('/claim/add', controller.claim.add);
    router.get('/claim/:id', controller.claim.findById);
    router.get('/claim', controller.claim.find);
    router.delete('/claim/:id', controller.claim.delete);
    router.post('/upload', controller.upload.uploadImg);
    router.post('/upload/delete', controller.upload.deleteImg)
    router.get('/verify/getVerCode', controller.verify.getVerCode)


};