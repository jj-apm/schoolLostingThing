'use strict';
/**上传文件管理controller层
 * @param uploadFilesController
 */
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

class UploadController extends Controller {
    async uploadMoreImg() {
        let { ctx } = this
        try {
            const parts = ctx.multipart({ autoFields: true });
            let files = []
            let fileData = []
            let stream;
            while ((stream = await parts()) != null) {
                const filename = stream.filename.toLowerCase();
                const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
                const writeStream = fs.createWriteStream(target);
                await pump(stream, writeStream);
                files.push(filename);
            }
            fileData = files.map(item => {
                return 'http://127.0.0.1:7001/public/uploads/' + item
            })
            ctx.body = {
                code: 0,
                message: '上传成功！',
                url: fileData
            }
        } catch (e) {
            ctx.body = {
                code: 5,
                message: e
            }
        }
    }
    async uploadImg() {
        const { ctx } = this;
        try {
            let result = await this.service.upload.uploadImg();
            ctx.body = {
                code: 0,
                message: '上传成功！',
                url: 'http://127.0.0.1:7001/public/uploads/' + result
            }
        } catch (e) {
            ctx.body = {
                code: 5,
                message: e
            }
        }
    }
    async deleteImg() {
        const { ctx } = this;
        try {
            await this.service.upload.deleteImg();
            ctx.body = {
                code: 0,
                message: '删除成功！'
            }
        } catch (e) {
            ctx.body = {
                code: 5,
                message: e
            }
        }
    }
}
module.exports = UploadController;