'use strict';

const Controller = require('egg').Controller;
const sign = require('../util/sign.js');

class WechatController extends Controller {
    async index() {
        const { ctx } = this;
        try {
            const url = ctx.request.query.url;
            if(!url) return;
            const { wechatAppId, wechatDebug } = this.config;
            const ticket = await ctx.service.jsapiTicket.get();
            let config = sign(ticket, url);
            console.log(config)
            sign.appId = wechatAppId;
            sign.debug = wechatDebug;
            delete sign.jsapi_ticket;
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
