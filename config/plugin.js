'use strict';

/** @type Egg.EggPlugin */
exports.redis = {
  enable: true,
  package: 'egg-redis'
}

exports.alinode = {
  enable: true,
  package: 'egg-alinode',
  env: ['prod']
}

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}