/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    wechatDebug: true,
    wechatBaseUrl: 'https://api.weixin.qq.com/cgi-bin/',
    wechatAppId: 'wxf87dbe690bc1c3c2',
    wechatAppSecret: 'cfddfb5e61b4a8c7a63d0dcc51a2395e'
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '106.52.56.220',   // Redis host
      password: '',
      db: 0,
    },
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587627894252_1179';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  const onerror = {
    json(err, ctx) {
      ctx.body = {
        code: 9999,
        data: '',
        msg: err
      };
      ctx.status = 500;
    },
  }

  return {
    ...config,
    ...userConfig,
  };
};
