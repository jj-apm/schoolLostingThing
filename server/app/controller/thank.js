'use strict';

const Controller = require('egg').Controller;

class ThankController extends Controller {
    async add() {
        const thankField = {}
        if (this.ctx.request.body.title) thankField.title = this.ctx.request.body.title
        if (this.ctx.request.body.desc) thankField.desc = this.ctx.request.body.desc
        if (this.ctx.payload.result.username) thankField.username = this.ctx.payload.result.username
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
                    status: 0
                }
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
                    status: 1
                }
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
}

module.exports = ThankController;