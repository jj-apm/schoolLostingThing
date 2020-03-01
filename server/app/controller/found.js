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
        try {
            let result = await this.ctx.model.Found.findAll({
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
                    everyItem.type = item.type
                    total.push(everyItem)
                })
                this.ctx.body = total
            }
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async delete() {
        let { id } = this.ctx.params
        try {
            let result = await this.ctx.model.Found.destroy({
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
}

module.exports = FoundController;