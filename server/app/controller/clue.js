'use strict';

const Controller = require('egg').Controller;

class ClueController extends Controller {
    async add() {
        const clueField = {}
        if (this.ctx.payload.result.username) clueField.username = this.ctx.payload.result.username
        if (this.ctx.request.body.info) clueField.info = this.ctx.request.body.info
        if (this.ctx.request.body.lost_id) clueField.lost_id = this.ctx.request.body.lost_id
        try {
            const result = await this.ctx.model.Clue.create(clueField)
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }

    }
    async findById() {
        let { id } = this.ctx.params
        try {
            let result = await this.ctx.model.Clue.findOne({
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
            let result = await this.ctx.model.Clue.findAll()
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
            let result = await this.ctx.model.Clue.destroy({
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

module.exports = ClueController;