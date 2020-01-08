'use strict';
const Service = require('egg').Service;
const bcrypt = require('bcrypt')
class AdminService extends Service {
    async register() {
        let { aname, apassword, aphone } = this.ctx.request.body
        let result = await this.app.model.Admin.findOne({
            where: {
                aname
            }
        })

        if (result) {
            return {
                code: 1,
                msg: '用户名已被注册'
            }
        } else {
            const hash = bcrypt.hashSync(apassword, 10);
            return await this.app.model.Admin.create({ aname, apassword: hash, aphone }).then(res => {
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
        let { aname, apassword } = this.ctx.request.body
        let result = await this.app.model.Admin.findOne({
            where: {
                aname
            }
        })
        if (!result) {
            return {
                code: 1,
                msg: '该用户名不存在'
            }
        } else {
            let isMatch = bcrypt.compareSync(apassword, result.apassword)
            if (isMatch) {
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
module.exports = AdminService