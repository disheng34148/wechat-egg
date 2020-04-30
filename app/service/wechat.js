const Service = require('egg').Service;

class WechatService extends Service {
    async getFromWechat(code) {
        const { wechatAppId } = this.config;
        const { data: {openid} } = await this.ctx.curl(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechatAppId}&secret=SECRET&code=${code}&grant_type=authorization_code`, {
            dataType: 'json'
        });
        await this.app.mysql.insert('user', {
            openid: openid
        })
        return openid;
    }

    async getFromSql() {
    }
}

module.exports = WechatService;