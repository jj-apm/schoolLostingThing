'use strict';

const Controller = require('egg').Controller;

class LostController extends Controller {
    async add() {
        const lostField = {}
        if (this.ctx.request.body.name) lostField.name = this.ctx.request.body.name
        if (this.ctx.request.body.place) lostField.place = this.ctx.request.body.place
        if (this.ctx.request.body.desc) lostField.desc = this.ctx.request.body.desc
        if (this.ctx.request.body.others) lostField.others = this.ctx.request.body.others
        if (this.ctx.request.body.kind_id) lostField.kind_id = this.ctx.request.body.kind_id
        if (this.ctx.request.body.date) lostField.date = this.ctx.request.body.date
        if (this.ctx.request.body.lphoto) lostField.lphoto = this.ctx.request.body.lphoto
        if (this.ctx.payload.result.id) lostField.user_id = this.ctx.payload.result.id
        try {
            const result = await this.ctx.model.Lost.create(lostField)
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }

    }
    async findById() {
        let { id } = this.ctx.params
        try {
            let result = await this.ctx.model.Lost.findOne({
                where: {
                    id
                }
            })
            if (!result) {
                this.ctx.status = 400
                this.ctx.body = "查找失败"
            } else {
                this.ctx.body = result
            }
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async find() {
        try {
            let result = await this.ctx.model.Lost.findAll()
            if (!result) {
                this.ctx.status = 400
                this.ctx.body = "查找失败"
            } else {
                this.ctx.body = result
            }
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async delete() {
        let { id } = this.ctx.params
        try {
            let result = await this.ctx.model.Lost.destroy({
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
            let result = await this.ctx.model.Lost.update({ status }, {
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

module.exports = LostController;