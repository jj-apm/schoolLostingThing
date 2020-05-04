'use strict';

const Controller = require('egg').Controller;

class ThankController extends Controller {
    async add() {
        const thankField = {}
        if (this.ctx.request.body.title) thankField.title = this.ctx.request.body.title
        if (this.ctx.request.body.desc) thankField.desc = this.ctx.request.body.desc
        if (this.ctx.payload.result.id) thankField.user_id = this.ctx.payload.result.id
        try {
            let result = await this.ctx.model.Thank.create(thankField)
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async find() {
        try {
            let result = await this.ctx.model.Thank.findAll({
                where: {
                    status: 0,
                    is_delete: true
                },
                include: [
                    { model: this.ctx.model.User }
                ]
            })
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async find2() {
        try {
            let result = await this.ctx.model.Thank.findAll({
                where: {
                    status: 1,
                    is_delete: true
                },
                include: [
                    { model: this.ctx.model.User }
                ],
                order: [
                    ['date', 'DESC']
                ],
                limit: 5,
            })
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async find3() {
        try {
            let result = await this.ctx.model.Thank.findAll({
                where: {
                    status: 1,
                    is_delete: true
                },
                include: [
                    { model: this.ctx.model.User }
                ],
                order: [
                    ['date', 'DESC']
                ]
            })
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async editStatus() {
        let { id } = this.ctx.params
        let { status } = this.ctx.request.body
        try {
            let result = await this.ctx.model.Thank.update({ status }, {
                where: {
                    id
                }
            })
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async deleteList() {
        let { id } = this.ctx.params
        let { value } = this.ctx.request.body
        try {
            let result = await this.app.model.Thank.update({ is_delete: value }, {
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
}

module.exports = ThankController;