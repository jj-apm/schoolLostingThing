'use strict';
const Service = require('egg').Service;
const bcrypt = require('bcrypt')
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
            const hash = bcrypt.hashSync(userpassword, 10);
            return await this.app.model.User.create({ username, userpassword: hash, stu_num, userphone }).then(res => {
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
            let isMatch = bcrypt.compareSync(userpassword, result.userpassword)
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
    async resetPassword() {
        let { stu_num, userpassword } = this.ctx.request.body
        let result = await this.app.model.User.findOne({
            where: {
                stu_num
            }
        })
        if (result) {
            const hash = bcrypt.hashSync(userpassword, 10);
            let result_reset = await this.app.mysql.update('users', { userpassword: hash }, { where: { stu_num } });
            console.log(result_reset);

            if (result_reset.changedRows === 1) {
                return {
                    code: 0,
                    msg: '密码重置成功'
                }
            } else {
                return {
                    code: 1,
                    msg: '重置密码失败!'
                }
            }
        }

    }

}
module.exports = UserService