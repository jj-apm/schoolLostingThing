'use strict';

const Controller = require('egg').Controller;

class NoticeController extends Controller {
    async add() {
        const noticeField = {}
        if (this.ctx.request.body.info) noticeField.info = this.ctx.request.body.info
        if (this.ctx.request.body.from_id) noticeField.from_id = this.ctx.request.body.from_id
        if (this.ctx.request.body.to_id) noticeField.to_id = this.ctx.request.body.to_id
        if (this.ctx.request.body.username) noticeField.username = this.ctx.request.body.username
        if (this.ctx.request.body.comment_id) noticeField.comment_id = this.ctx.request.body.comment_id
        try {
            const result = await this.ctx.model.Notice.create(noticeField)
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }

    }
    async findById() {
        let { user_id } = this.ctx.query
        try {
            let result = await this.ctx.model.Notice.findAll({
                where: {
                    to_id: user_id
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
            let result = await this.ctx.model.Notice.findAll({
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
            let result = await this.ctx.model.Notice.destroy({
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

module.exports = NoticeController;