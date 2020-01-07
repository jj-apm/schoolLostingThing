'use strict';
const Service = require('egg').Service;
class UserService extends Service {
    async register() {
        let { username, userpassword, stu_num, userphone } = this.ctx.request.body
        let result = await this.app.model.User.findOne({
            where: {
                stu_num
            }
        })
        if (result) {
            return {
                code: 1,
                msg: '用户名已被注册'
            }
        } else {

            return await this.app.model.User.create({ username, userpassword, stu_num, userphone }).then(res => {
                if (res) {
                    return {
                        code: 0,
                        res
                    }
                } else {
                    return {
                        code: 2,
                        msg: '出现错误'
                    }
                }
            }).catch(err => {
                return {
                    code: 3,
                    res: err
                }
            })
        }
    }
    async login() {
        let { stu_num, userpassword } = this.ctx.request.body
        let result = await this.app.model.User.findOne({
            where: {
                stu_num
            }
        })
        if (!result) {
            return {
                code: 1,
                msg: '该学号不存在'
            }
        } else {
            if (userpassword == result.userpassword) {
                return {
                    code: 0,
                    msg: '登录成功',
                    data: result
                }
            } else {
                return {
                    code: 2,
                    msg: '密码错误'
                }
            }
        }
    }

}
module.exports = UserService