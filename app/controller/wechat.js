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
            if(!allowUrl.includes(url)) {
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

    async wechatUser(openid) {
        const { ctx } = this;
        const insertResult = await ctx.service.wechat.insertUser(openid);
        ctx.body = {
            code: insertResult ? 200 : 0,
            data: '',
            msg: insertResult ? 'success' : insertResult
        }
    }
}

module.exports = WechatController;
