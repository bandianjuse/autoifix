'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '47.91.156.50',
      port: '3306',
      database: 'autoifix',
      user: 'nethken',
      password: 'LRz5QKw3iYkUIPUG',
      prefix: 'ai_',
      encoding: 'utf8'
    },
    mongo: {

    }
  },
  cache: {
    on: true,
    type: 'redis',
    timeout: 3600
  }
};