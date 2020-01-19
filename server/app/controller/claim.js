'use strict';

const Controller = require('egg').Controller;

class ClaimController extends Controller {
    async add() {
        const claimField = {}
        if (this.ctx.request.body.name) claimField.name = this.ctx.request.body.name
        if (this.ctx.request.body.phone) claimField.phone = this.ctx.request.body.phone
        if (this.ctx.request.body.found_id) claimField.found_id = this.ctx.request.body.found_id
        try {
            const result = await this.ctx.model.Claim.create(claimField)
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }

    }
    async findById() {
        let { id } = this.ctx.params
        try {
            let result = await this.ctx.model.Claim.findOne({
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
            let result = await this.ctx.model.Claim.findAll()
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
            let result = await this.ctx.model.Claim.destroy({
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

module.exports = ClaimController;