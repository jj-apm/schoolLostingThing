'use strict';

const Controller = require('egg').Controller;

class ReplyController extends Controller {
    async add() {
        const replyField = {}
        if (this.ctx.payload.result.id) replyField.user_id = this.ctx.payload.result.id
        if (this.ctx.request.body.info) replyField.info = this.ctx.request.body.info
        if (this.ctx.request.body.comment_id) replyField.comment_id = this.ctx.request.body.comment_id
        if (this.ctx.request.body.replyuser_id) replyField.replyuser_id = this.ctx.request.body.replyuser_id
        if (this.ctx.request.body.date) replyField.date = this.ctx.request.body.date
        if (this.ctx.payload.result.username) replyField.username = this.ctx.payload.result.username
        if (this.ctx.request.body.replyuser_name) replyField.replyuser_name = this.ctx.request.body.replyuser_name
        try {
            const result = await this.ctx.model.Reply.create(replyField)
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }

    }
    async findReply() {
        let { user_id } = this.ctx.query
        try {
            let result = await this.ctx.model.Reply.findAll({
                where: {
                    replyuser_id: user_id
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
            let result = await this.ctx.model.Reply.findAll({
                include: [
                    { model: this.ctx.model.Clue }
                ]
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
    async delete() {
        let { id } = this.ctx.params
        try {
            let result = await this.ctx.model.Reply.destroy({
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

module.exports = ReplyController;