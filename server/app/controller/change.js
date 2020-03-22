'use strict';

const Controller = require('egg').Controller;

class ChangeController extends Controller {
    async add() {
        const changeField = {}
        if (this.ctx.request.body.username) changeField.username = this.ctx.request.body.username
        if (this.ctx.request.body.goods_id) changeField.goods_id = this.ctx.request.body.goods_id
        try {
            const result = await this.ctx.model.Change.create(changeField)
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async find() {
        try {
            let result = await this.ctx.model.Change.findAll()
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }

    }
}

module.exports = ChangeController;