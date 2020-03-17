'use strict';

const Controller = require('egg').Controller;

class TransactionController extends Controller {
    async add() {
        const transactionField = {}
        if (this.ctx.request.body.name) transactionField.name = this.ctx.request.body.name
        if (this.ctx.request.body.desc) transactionField.desc = this.ctx.request.body.desc
        if (this.ctx.request.body.kind_id) transactionField.kind_id = this.ctx.request.body.kind_id
        if (this.ctx.request.body.tphoto) transactionField.tphoto = this.ctx.request.body.tphoto
        if (this.ctx.request.body.price) transactionField.price = this.ctx.request.body.price
        if (this.ctx.payload.result.id) transactionField.user_id = this.ctx.payload.result.id
        try {
            const result = await this.ctx.model.Transaction.create(transactionField)
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }

    }
    async findById() {
        let { id } = this.ctx.query
        try {
            let result = await this.ctx.model.Transaction.findOne({
                where: {
                    id
                },
                include: [{
                    model: this.ctx.model.User
                }, {
                    model: this.ctx.model.Kind
                }]
            })
            if (!result) {
                this.ctx.status = 400
                this.ctx.body = "查找失败"
            } else {
                let total = {}
                total.name = result.name
                total.desc = result.desc
                total.date = result.date
                total.lphoto = result.lphoto
                total.status = result.status
                total.kindName = result.kind.name
                total.userName = result.user.username
                total.phone = result.user.phone
                total.id = result.id
                total.place = result.place
                this.ctx.body = total
            }
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async find() {
        const { pageSize, currentPage, userId } = this.ctx.query
        if (userId) {
            try {
                let result = await this.app.model.Transaction.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Transkind
                    }],
                    where: {
                        user_id: userId
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
                if (!result) {
                    this.ctx.status = 400
                    this.ctx.body = "查找失败"
                } else {
                    this.ctx.body = result
                }
            } catch (e) {
                this.ctx.throw(e)
            }
        } else {
            try {
                const offset = (currentPage - 1) * pageSize;
                const limit = parseInt(pageSize);
                let count = await this.app.model.Transaction.count();
                let result = await this.app.model.Transaction.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Transkind
                    }],
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    offset,
                    limit,
                    distinct: true //这一句可以去重，它返回的 count 不会把你的 include 的数量算进去
                });
                if (!result) {
                    this.ctx.status = 400
                    this.ctx.body = "查找失败"
                } else {
                    let total = []
                    result.map((item, idx) => {
                        let everyItem = {}
                        everyItem.id = item.id
                        everyItem.name = item.name
                        everyItem.desc = item.desc
                        everyItem.lphoto = item.tphoto
                        everyItem.date = item.date
                        everyItem.price = item.price
                        everyItem.userName = item.user.username
                        everyItem.kindName = item.transkind.name
                        everyItem.status = item.status
                        total.push(everyItem)
                    })
                    this.ctx.body = { total, count }
                }
            } catch (e) {
                this.ctx.throw(e)
            }
        }

    }

    async delete() {
        let { id } = this.ctx.params
        try {
            let result = await this.ctx.model.Transaction.destroy({
                where: {
                    id
                }
            })
            if (!result) {
                this.ctx.status = 400
                this.ctx.body = "删除失败"
            } else {
                this.ctx.body = result
            }
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async findNewest() {
        try {
            let result = await this.ctx.model.Transaction.findAll({
                limit: 10,
                order: [
                    ['createdAt', 'DESC']
                ],
                where: {
                    status: 1
                }
            })
            if (!result) {
                this.ctx.status = 400
                this.ctx.body = "删除失败"
            } else {
                this.ctx.body = result
            }
        } catch (e) {
            this.ctx.throw(e)
        }
    }

    async noticeList() {
        let { user_id } = this.ctx.query
        try {
            let result = await this.ctx.model.Transaction.findAll({
                where: {
                    user_id
                },
                include: [{
                    model: this.ctx.model.Clue,
                    include: [
                        { model: this.ctx.model.Notice }
                    ]
                }]
            })
            if (!result) {
                this.ctx.status = 400
                this.ctx.body = "未找到"
            } else {
                this.ctx.body = result
            }
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async update() {
        let { id } = this.ctx.params
        let { status } = this.ctx.request.body
        try {
            let result = await this.ctx.model.Transaction.update({ status }, {
                where: {
                    id
                }
            })
            if (!result) {
                this.ctx.status = 400
                this.ctx.body = "更新失败"
            } else {
                this.ctx.body = result
            }
        } catch (e) {
            this.ctx.throw(e)
        }
    }

    async searchKeywords() {
        let { value, pageSize, currentPage } = this.ctx.request.body;
        pageSize = parseInt(pageSize);
        currentPage = (currentPage - 1) * pageSize;
        let result = [];
        let count = 0;
        if (typeof value == 'number') {
            try {
                count = await this.app.model.Transaction.count({
                    where: {
                        kind_id: value
                    },
                    offset: currentPage,
                    limit: pageSize,
                });
                result = await this.app.model.Transaction.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Kind
                    }],
                    where: {
                        kind_id: value
                    },
                    offset: currentPage,
                    limit: pageSize,
                    distinct: true
                });
                if (!result) {
                    this.ctx.status = 400
                    this.ctx.body = "查找失败"
                } else {
                    let total = []
                    result.map((item, idx) => {
                        let everyItem = {}
                        everyItem.id = item.id
                        everyItem.name = item.name
                        everyItem.desc = item.desc
                        everyItem.lphoto = item.lphoto
                        everyItem.date = item.date
                        everyItem.place = item.place
                        everyItem.userName = item.user.username
                        everyItem.kindName = item.kind.name
                        everyItem.status = item.status
                        total.push(everyItem)
                    })
                    this.ctx.body = { total, count }
                }
            } catch (err) {
                this.ctx.throw(err)
            }
        } else {
            try {
                count = await this.app.model.Transaction.count({
                    where: {
                        name: {
                            [this.app.Sequelize.Op.like]: `%${value}%`
                        }
                    },
                    offset: currentPage,
                    limit: pageSize,
                });
                result = await this.app.model.Transaction.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Kind
                    }],
                    where: {
                        name: {
                            [this.app.Sequelize.Op.like]: `%${value}%`
                        }
                    },
                    offset: currentPage,
                    limit: pageSize,
                    distinct: true
                });
                if (!result) {
                    this.ctx.status = 400
                    this.ctx.body = "查找失败"
                } else {
                    let total = []
                    result.map((item, idx) => {
                        let everyItem = {}
                        everyItem.id = item.id
                        everyItem.name = item.name
                        everyItem.desc = item.desc
                        everyItem.lphoto = item.lphoto
                        everyItem.date = item.date
                        everyItem.place = item.place
                        everyItem.userName = item.user.username
                        everyItem.kindName = item.kind.name
                        everyItem.status = item.status
                        total.push(everyItem)
                    })
                    this.ctx.body = { total, count }
                }
            } catch (err) {
                this.ctx.throw(err)
            }
        }
    }
    async findList() {
        try {
            let result = await this.app.model.Transaction.findAll({
                include: [{
                    model: this.ctx.model.User
                }, {
                    model: this.ctx.model.Kind
                }],
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if (!result) {
                this.ctx.status = 400
                this.ctx.body = "查找失败"
            } else {
                let total = []
                result.map((item, idx) => {
                    let everyItem = {}
                    everyItem.id = item.id
                    everyItem.name = item.name
                    everyItem.desc = item.desc
                    everyItem.lphoto = item.lphoto
                    everyItem.date = item.date
                    everyItem.place = item.place
                    everyItem.userName = item.user.username
                    everyItem.kindName = item.kind.name
                    everyItem.status = item.status
                    everyItem.creatTime = item.createdAt
                    total.push(everyItem)
                })
                this.ctx.body = { total }
            }
        } catch (e) {
            this.ctx.throw(e)
        }
    }
}

module.exports = TransactionController;