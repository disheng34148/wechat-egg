'use strict';

const Controller = require('egg').Controller;
const sign = require('../util/sign.js');

class WechatController extends Controller {
    async wechatConfig() {
        const { ctx } = this;
        const { allowUrl } = this.config;
        try {
            const url = ctx.request.query.url;
            if(!url) {
                ctx.body = {
                    code: 0,
                    data: '',
                    msg: 'url参数为空'
                }
                return;
            }
            if(!url.includes(allowUrl)) {
                ctx.body = {
                    code: 0,
                    data: '',
                    msg: '不安全的域名'
                }
                return;
            }
            const { wechatAppId, wechatDebug } = this.config;
            const ticket = await ctx.service.jsapiTicket.get();
            let config = sign(ticket, url);
            config.appId = wechatAppId;
            config.debug = wechatDebug;
            delete config.jsapi_ticket;
            ctx.body = {
                code: 200,
                data: config,
                msg: 'success'
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                data: '',
                msg: error
            }
        }
    }
}

module.exports = WechatController;
