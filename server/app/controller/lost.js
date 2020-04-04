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
        const { pageSize, currentPage, userId } = this.ctx.query
        if (userId) {
            try {
                let result = await this.app.model.Lost.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Kind
                    }],
                    where: {
                        user_id: userId
                    },
                    order: [
                        ['date', 'DESC']
                    ]
                });
                if (!result) {
                    this.ctx.status = 400
                    this.ctx.body = "查找失败"
                } else {
                    this.ctx.body = result
                }
            } catch (e) {
                this.ctx.throw(e)
            }
        } else {
            try {
                const offset = (currentPage - 1) * pageSize;
                const limit = parseInt(pageSize);
                let count = await this.app.model.Lost.count({ where: { status: 1 } });
                let result = await this.app.model.Lost.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Kind
                    }],
                    order: [
                        ['date', 'DESC']
                    ],
                    where: {
                        status: 1
                    },
                    offset,
                    limit,
                    distinct: true //这一句可以去重，它返回的 count 不会把你的 include 的数量算进去
                });
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
                        total.push(everyItem)
                    })
                    for (var item of total) {
                        if (item.desc.length > 20) {
                            item.desc = item.desc.slice(0, 20) + '...'
                        }
                    }
                    this.ctx.body = { total, count }
                }
            } catch (e) {
                this.ctx.throw(e)
            }
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
    async findNewest() {
        try {
            let result = await this.ctx.model.Lost.findAll({
                limit: 10,
                order: [
                    ['date', 'DESC']
                ],
                where: {
                    status: 1
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

    async noticeList() {
        let { user_id } = this.ctx.query
        try {
            let result = await this.ctx.model.Lost.findAll({
                where: {
                    user_id
                },
                include: [{
                    model: this.ctx.model.Clue,
                    include: [
                        { model: this.ctx.model.Notice }
                    ]
                }]
            })
            if (!result) {
                this.ctx.status = 400
                this.ctx.body = "未找到"
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

    async searchKeywords() {
        let { value, pageSize, currentPage, startTime, endTime } = this.ctx.request.body;
        pageSize = parseInt(pageSize);
        currentPage = (currentPage - 1) * pageSize;
        let result = [];
        let count = 0;
        if (startTime && endTime) {
            try {
                count = await this.app.model.Lost.count({
                    where: {
                        date: {
                            [this.app.Sequelize.Op.between]: [startTime, endTime]
                        }
                    },
                    offset: currentPage,
                    limit: pageSize,
                });
                result = await this.app.model.Lost.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Kind
                    }],
                    where: {
                        date: {
                            [this.app.Sequelize.Op.between]: [startTime, endTime]
                        }
                    },
                    order: [
                        ['date', 'DESC']
                    ],
                    offset: currentPage,
                    limit: pageSize,
                    distinct: true
                });
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
                        total.push(everyItem)
                    })
                    this.ctx.body = { total, count }
                }
            } catch (err) {
                this.ctx.throw(err)
            }
        } else if (typeof value == 'number') {
            try {
                count = await this.app.model.Lost.count({
                    where: {
                        kind_id: value
                    },
                    offset: currentPage,
                    limit: pageSize,
                });
                result = await this.app.model.Lost.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Kind
                    }],
                    where: {
                        kind_id: value
                    },
                    order: [
                        ['date', 'DESC']
                    ],
                    offset: currentPage,
                    limit: pageSize,
                    distinct: true
                });
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
                        total.push(everyItem)
                    })
                    this.ctx.body = { total, count }
                }
            } catch (err) {
                this.ctx.throw(err)
            }
        } else {
            try {
                count = await this.app.model.Lost.count({
                    where: {
                        name: {
                            [this.app.Sequelize.Op.like]: `%${value}%`
                        }
                    },
                    offset: currentPage,
                    limit: pageSize,
                });
                result = await this.app.model.Lost.findAll({
                    include: [{
                        model: this.ctx.model.User
                    }, {
                        model: this.ctx.model.Kind
                    }],
                    where: {
                        name: {
                            [this.app.Sequelize.Op.like]: `%${value}%`
                        }
                    },
                    order: [
                        ['date', 'DESC']
                    ],
                    offset: currentPage,
                    limit: pageSize,
                    distinct: true
                });
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
                        total.push(everyItem)
                    })
                    this.ctx.body = { total, count }
                }
            } catch (err) {
                this.ctx.throw(err)
            }
        }
    }
    async findList() {
        try {
            let result = await this.app.model.Lost.findAll({
                include: [{
                    model: this.ctx.model.User
                }, {
                    model: this.ctx.model.Kind
                }],
                order: [
                    ['date', 'DESC']
                ],
                where: {
                    is_delete: true
                }
            });
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
                    everyItem.creatTime = item.createdAt
                    everyItem.is_delete = item.is_delete
                    total.push(everyItem)
                })
                this.ctx.body = { total }
            }
        } catch (e) {
            this.ctx.throw(e)
        }
    }
    async deleteList() {
        let { id } = this.ctx.params
        let { value } = this.ctx.request.body
        try {
            let result = await this.app.model.Lost.update({ is_delete: value }, {
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

module.exports = LostController;