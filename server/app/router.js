'use strict';

/**
 * @param {Egg.Application} app - egg application 
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/user/register', controller.user.register);
    router.post('/user/login', controller.user.login);
    router.get('/user/userInfo/:id', controller.user.personalInfo);
    router.post('/user/resetPassword/:id', controller.user.resetPassword);
    router.get('/userList', controller.user.userList);
    router.post('/user/score/:id', controller.user.updateScore);
    router.post('/lost/add', controller.lost.add);
    router.post('/lost/editStatus/:id', controller.lost.update);
    router.delete('/lost/:id', controller.lost.delete);
    router.get('/lost', controller.lost.find);
    router.get('/lostById', controller.lost.findById);
    router.post('/searchKeywords', controller.lost.searchKeywords);
    router.get('/lost/newest', controller.lost.findNewest);
    router.get('/lost/lostList', controller.lost.findList);
    router.post('/lost/delete/:id', controller.lost.deleteList);
    router.post('/found/delete/:id', controller.found.deleteList);

    router.post('/change/add', controller.change.add);
    router.get('/change', controller.change.find);
    router.post('/goods/add', controller.goods.add);
    router.get('/goods', controller.goods.find);
    router.post('/goods/count/:id', controller.goods.editCount);
    router.post('/transaction/add', controller.transaction.add);
    router.get('/transaction', controller.transaction.find);
    router.post('/found/add', controller.found.add);
    router.get('/found/newest', controller.found.findNewest);
    router.post('/found/editStatus/:id', controller.found.update);
    router.get('/found', controller.found.find);
    router.get('/foundById', controller.found.findById);
    router.post('/foundSearch', controller.found.foundSearch)
    router.get('/found/foundList', controller.found.findList);
    router.post('/kind/add', controller.kind.add);
    router.post('/transkind/add', controller.tkind.add);
    router.post('/kind/:id', controller.kind.update);
    router.delete('/kind/:id', controller.kind.delete);
    router.get('/kind', controller.kind.findList);
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

    router.post('/thank/add', controller.thank.add);
    router.get('/thank/list', controller.thank.find);
    router.get('/thank/list2', controller.thank.find2);
    router.get('/thank/list3', controller.thank.find3);
    router.post('/thank/status/:id', controller.thank.editStatus);
    router.post('/thank/delete/:id', controller.thank.deleteList);
    router.post('/claim/add', controller.claim.add);
    router.get('/claim/:id', controller.claim.findById);
    router.get('/claim', controller.claim.find);
    router.delete('/claim/:id', controller.claim.delete);
    router.post('/upload', controller.upload.uploadImg);
    router.post('/uploadMore', controller.upload.uploadMoreImg);
    router.post('/upload/delete', controller.upload.deleteImg)
    router.get('/verify/getVerCode', controller.verify.getVerCode)


};