'use strict';

/**
 * hook config
 * https://thinkjs.org/doc/middleware.html#toc-df6
 */
export default {
    payload_parse: ['append', 'passport'], //在前面追加解析 xml
}