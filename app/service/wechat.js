const Service = require('egg').Service;

class WechatService extends Service {
    async insertUser(openid) {
        const result = await this.app.mysql.insert('user', {
            openid: openid
        });
        const insertSuccess = result.affectedRows === 1;
        return insertSuccess ? 'ok' : result;
    }
}

module.exports = WechatService;