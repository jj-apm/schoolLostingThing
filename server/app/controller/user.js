'use strict';
const Controller = require('egg').Controller;
const bcrypt = require('bcrypt')
class UserController extends Controller {
    async register() {
        let { username, password, stu_num, phone, status } = this.ctx.request.body
        console.log(this.ctx.request.body);

        let { ctx } = this
        let result = await this.app.model.User.findOne({
                where: {
                    [this.app.Sequelize.Op.or]: [
                        { stu_num },
                        { username }
                    ]
                }
            })
            // console.log(result);

        if (result) {
            ctx.body = '该用户已被注册'
            ctx.status = 400
        } else {
            const hash = bcrypt.hashSync(password, 10);
            return await this.app.model.User.create({ username, password: hash, stu_num, phone, status }).then(res => {
                ctx.body = {
                    res,
                    msg: '注册成功'
                }
            }).catch(err => {
                ctx.body = {
                    err
                }
            })
        }
    }
    async login() {
        let { stu_num, password, verify_code } = this.ctx.request.body
            // let { stu_num, password } = this.ctx.request.body
        let { ctx } = this
        // ctx.set('Content-Type', 'application/json');
        let result = await this.app.model.User.findOne({
            where: {
                stu_num
            }
        })
        if (!result) {
            ctx.body = '该用户不存在'
            ctx.status = 400
        } else {
            let isMatch = bcrypt.compareSync(password, result.password)
            if (isMatch) {
                const token = this.app.jwt.sign({ result }, this.app.config.jwt.secret, { expiresIn: '10h' });
                if (verify_code.toLowerCase() != ctx.session.verify_code.toLowerCase()) {
                    ctx.body = '验证码错误'
                    ctx.status = 400
                } else {
                    ctx.body = {
                        msg: '登录成功',
                        token: 'Bearer ' + token
                    }
                }
            } else {
                ctx.body = '密码错误'
                ctx.status = 400
            }
        }
    }
    async resetPassword() {
        let { newPassword } = this.ctx.request.body
        let { id } = this.ctx.params
        try {
            const hash = bcrypt.hashSync(newPassword, 10);
            let result_reset = await this.app.mysql.update('users', { password: hash }, { where: { id } });
            console.log(result_reset);
            if (result_reset.changedRows == 1) {
                this.ctx.body = {
                    msg: '密码修改成功'
                }
            } else {
                this.ctx.body = '密码修改失败!'
                this.ctx.status = 400
            }
        } catch (err) {
            this.ctx.body = { msg: err }
        }

    }
    async getUserInfo() {
        const { ctx } = this;
        ctx.body = {
            code: 0,
            message: '获取用户信息成功!',
            data: ctx.payload,
        };
    }
    async updateScore() {
        let { id } = this.ctx.params
        let { score } = this.ctx.request.body
        try {
            let result = await this.ctx.model.User.update({ score }, {
                where: {
                    id
                }
            })
            this.ctx.body = result
        } catch (e) {
            this.ctx.throw(e)
        }
    }

    async userList() {
        try {
            let result = await this.ctx.model.User.findAll({
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
    async personalInfo() {
        let { id } = this.ctx.params
        try {
            let result = await this.ctx.model.User.findOne({
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
module.exports = UserController