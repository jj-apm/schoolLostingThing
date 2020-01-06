const Controller = require('egg').Controller;
class AdminControler extends Controller {
    async register() {
        let result = await this.service.user.register()
        let { code, res } = result
        if (code == 0) {
            jwt.sign({
                res
            }, this.app.config.jwt.secret, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err
                this.ctx.body = {
                    code,
                    msg: res,
                    token: 'Bearer ' + token
                }
            })
        } else {
            this.ctx.body = {
                code,
                msg: res
            }
        }
    }
    async login() {
        let result = this.app.service.user.login()
        let { code, res } = result
        if (code == 0) {
            jwt.sign({
                data: result.data
            }, this.app.config.jwt.secret, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err
                this.ctx.body = {
                    code,
                    msg: result.data.aname + res,
                    token: 'Bearer ' + token
                }
            })
        } else {
            this.ctx.body = {
                code,
                msg: res
            }
        }
    }
}