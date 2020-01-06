const Service = require('egg').Service;
const bcrypt = require('bcrypt')
class UserService extends Service {
    async register() {
        try {
            let { aname, apassword, aphone } = this.ctx.request.body
            let result = await this.app.model.Admin.findOne({
                where: {
                    aname
                }
            })
            if (result) {
                return {
                    code: 1,
                    res: '用户名已被注册'
                }
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(apassword, salt, (err, hash) => {
                        if (err) throw err;
                        return this.app.model.User.create({ aname, apassword: hash, aphone }).then(res => {
                            if (res) {
                                return {
                                    code: 1,
                                    res
                                }
                            }
                        }).catch(err => {
                            return {
                                code: 2,
                                res: err
                            }
                        })
                    })
                })
            }
        } catch (err) {
            throw err
        }
    }
    async login() {
        try {
            let { aname, apassword } = this.ctx.request.body
            let result = this.app.model.User.findOne({
                where: {
                    aname
                }
            })
            if (!result) {
                return {
                    code: 1,
                    res: '用户名或密码输入错误'
                }
            } else {
                bcrypt.compare(apassword, result.apassword)
                    .then(isMatch => {
                        if (isMatch) {
                            return {
                                code: 0,
                                res: '登录成功',
                                data: result
                            }
                        }
                    })
            }
        } catch (err) {
            return {
                code: 2,
                res: err
            }
        }
    }

}