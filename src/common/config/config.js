'use strict';
/**
 * config
 */
export default {
    //短信接口
    sms: {
        apikey : '7373afade103db6ea53f1237f73852ef',
        api_url : '/sms.yunpian.com/v2/sms/single_send.json',
        tpl_id : '',//指定发送的模板编号
        register : true, //是否为注册验证码短信
    }
};