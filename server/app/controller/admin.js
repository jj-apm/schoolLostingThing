'use strict';
const Controller = require('egg').Controller;
class AdminController extends Controller {
    async register() {
        const { ctx } = this
        let result = await this.service.admin.register()
        let { code, msg, res } = result
        if (code === 0) {
            ctx.body = {
                code,
                msg: '注册成功',
                res
            }
        } else {
            ctx.body = {
                code,
                msg
            }
        }
    }
    async login() {
            let result = await this.service.admin.login()
            const { ctx } = this
            let { code, msg } = result
            if (code === 0) {
                const token = this.app.jwt.sign({
                    data: result.data
                }, this.app.config.jwt.secret, { expiresIn: '0.5h' });
                ctx.body = {
                        code,
                        msg: result.data.aname + msg,
                        token: 'Bearer ' + token
                    }
                    // })
            } else {
                ctx.body = {
                    code,
                    msg
                }
            }
        }
        //通过token获取用户信息
    async getUserInfo() {
        const { ctx, app } = this;
        ctx.body = {
            code: 0,
            message: '获取用户信息成功!',
            data: {
                'id': ctx.payload.data.id,
                'aname': ctx.payload.data.aname,
                'aphone': ctx.payload.data.aphone
            }
        }
    }
}
module.exports = AdminController