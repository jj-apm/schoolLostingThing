'use strict';

const Controller = require('egg').Controller;

class FoundController extends Controller {
    async add() {
        const foundField = {}
        if (this.ctx.request.body.name) foundField.name = this.ctx.request.body.name
        if (this.ctx.request.body.place) foundField.place = this.ctx.request.body.place
        if (this.ctx.request.body.desc) foundField.desc = this.ctx.request.body.desc
        if (this.ctx.request.body.kind_id) foundField.kind_id = this.ctx.request.body.kind_id
        if (this.ctx.request.body.date) foundField.date = this.ctx.request.body.date
        if (this.ctx.request.body.fphoto) foundField.fphoto = this.ctx.request.body.fphoto
        if (this.ctx.payload.result.id) foundField.user_id = this.ctx.payload.result.id
        try {
            const result = await this.ctx.model.Found.create(foundField)
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }

    }
    async findById() {
        let { id } = this.ctx.query
        try {
            let result = await this.ctx.model.Found.findOne({
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
                total.fphoto = result.fphoto
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
                let result = await this.app.model.Found.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Kind
                    }],
                    where: {
                        user_id: userId
                    }
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
                let count = await this.app.model.Found.count();
                let result = await this.app.model.Found.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Kind
                    }],
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
            } catch (e) {
                this.ctx.throw(e)
            }
        }
    }
    async update() {
        let { id } = this.ctx.params
        let { status } = this.ctx.request.body
        try {
            let result = await this.ctx.model.Found.update({ status }, {
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
    async foundSearch() {
        let { value, pageSize, currentPage } = this.ctx.request.body;
        pageSize = parseInt(pageSize);
        currentPage = (currentPage - 1) * pageSize;
        let result = [];
        let count = 0;
        if (typeof value == 'number') {
            try {
                count = await this.app.model.Found.count({
                    where: {
                        kind_id: value
                    },
                    offset: currentPage,
                    limit: pageSize,
                });
                result = await this.app.model.Found.findAll({
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
                count = await this.app.model.Found.count({
                    where: {
                        name: {
                            [this.app.Sequelize.Op.like]: `%${value}%`
                        }
                    },
                    offset: currentPage,
                    limit: pageSize,
                });
                result = await this.app.model.Found.findAll({
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
}

module.exports = FoundController;