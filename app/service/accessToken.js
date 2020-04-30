const Service = require('egg').Service;

class AccessTokenService extends Service {
    async getFromWechat() {
        const { wechatBaseUrl, wechatAppId, wechatAppSecret } = this.config;
        // const { data: {access_token} } = await this.ctx.curl(`${wechatBaseUrl}token?grant_type=client_credential&appid=${wechatAppId}&secret=${wechatAppSecret}`, {
        //     dataType: 'json'
        // });
        // console.log(access_token)
        const result = await this.ctx.curl(`${wechatBaseUrl}token?grant_type=client_credential&appid=${wechatAppId}&secret=${wechatAppSecret}`, {
            dataType: 'json'
        });
        console.log(result)
        await this.app.redis.set('accessToken', access_token, 'Ex', 7200);
        return access_token;
    }

    async getFromRedis() {
        const access_token = await this.app.redis.get('accessToken');
        return access_token;
    }

    async get() {
        let accessToken = await this.getFromRedis();
        if(!accessToken) {
            accessToken = await this.getFromWechat();
        }
        return accessToken;
    }
}

module.exports = AccessTokenService;