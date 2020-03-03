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
        let { id } = this.ctx.query
        try {
            let result = await this.ctx.model.Lost.findOne({
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
        const {pageSize,currentPage}=this.ctx.query
            try{
                const offset=(currentPage-1)*pageSize;
                const limit=parseInt(pageSize);
                let total=await this.app.model.Lost.count();
                let result=await this.app.model.Lost.findAll({
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