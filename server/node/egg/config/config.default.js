'use strict';

module.exports = appInfo => {
  const config = {};
  
  // 一定要配置  cookie need secret key to sign and encrypt
  config.keys = appInfo.name // package.json 里的 name

  // mysql 配置
  var mySqlConfig = require('./mysql')
  config.mysql = {
    client: mySqlConfig,
  }

  // 跨域头
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  }
  
  // 跨域 新增，编辑时缺，会报错。
  config.security = {
    csrf: {
      enable: false,
    },
  }
  
  // 一页多少条
  config.PAGE_LIMIT = 10

  /**
   * some description
   * @member Config#test
   * @property {String} key - some description
   */
  config.test = {
    key: appInfo.name + '_123456',
  };

  return config;
};
