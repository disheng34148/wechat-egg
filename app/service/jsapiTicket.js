const Service = require('egg').Service;

class JsapiTicketService extends Service {
    async getFromWechat() {
        const { wechatBaseUrl } = this.config;
        const accessToken = await this.ctx.service.accessToken.get();
        const { data: {ticket} } = await this.ctx.curl(`${wechatBaseUrl}ticket/getticket?access_token=${accessToken}&type=jsapi`, {
            dataType: 'json'
        });
        await this.app.redis.set('jsapiTicket', ticket, 'Ex', 7200);
        return ticket;
    }

    async getFromRedis() {
        const ticket = await this.app.redis.get('jsapiTicket');
        return ticket;
    }

    async get() {
        let ticket = await this.getFromRedis();
        if(!ticket) {
            ticket = await this.getFromWechat();
        }
        return ticket;
    }
}

module.exports = JsapiTicketService;