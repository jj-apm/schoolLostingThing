'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {
    async add() {
        const goodsField = {}
        if (this.ctx.request.body.goods_name) goodsField.goods_name = this.ctx.request.body.goods_name
        if (this.ctx.request.body.photo) goodsField.photo = this.ctx.request.body.photo
        if (this.ctx.request.body.score) goodsField.score = this.ctx.request.body.score
        try {
            const result = await this.ctx.model.Goods.create(goodsField)
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async find() {
        try {
            let result = await this.ctx.model.Goods.findAll()
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async editCount() {
        let { id } = this.ctx.params
        let { count } = this.ctx.request.body
        try {
            let result = await this.ctx.model.Goods.update({ count }, {
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

module.exports = GoodsController;