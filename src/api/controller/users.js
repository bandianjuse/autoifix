'use strict';

import Base from './base.js';
import Request from 'request';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    /**
     * 查询列表
     */
    async listAction() {
        let values = this.get();
        let model = this.model('users');
        let where = {};
        if(values.account) where.account = ['like', '%' + values.account + '%'];
        if(values.id) where.id = values.id;
        let data = await model.page(values.pageNo || 1, values.pageSize || 10).where(where).fieldReverse('password').order('id DESC').countSelect();
        return this.success(data);
    }

    /**
     * 登录
     */
    async loginAction() {

        let userkey = this.config('userkey');
        let Crypto = think.service('crypto');
        let crypto = new Crypto();
        let values = this.post();
        let model = this.model('users');
        let password = crypto.encrypt(values.password,userkey);
        /*let test = await this.hook('payload_parse',values.account);*/
        let data = await model.where({
            account: values.account,
            password: password
        }).field('id,account,phone,nickname').select();
        await this.session('userInfo', data);
        return this.success(data);
    }

    /**
     * 注册
     */
    async registerAction() {
        let userkey = this.config('userkey');
        let Crypto = think.service('crypto');
        let crypto = new Crypto();
        let values = this.post();
        let model = this.model('users');
        let password = crypto.encrypt(values.password,userkey);
        let insertId = await model.thenAdd(
            {
                account: values.account,
                password: password,
                phone: values.account
            },
            {
                account: values.account
            }
        );

        return this.success(insertId);
    }

    /**
     * 注销
     */
    async logoutAction() {
        await this.session();
        return this.success();
    }

    /**
     * 更新
     */
    async updateAction() {
        let data = this.post();
        if(!data.id) return this.fail('params error');
        let model = this.model('users');
        let pk = await model.getPk();
        let id = data.id;
        delete data[pk];
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        let rows = await model.where({[pk]: id}).update(data);
        return this.success({affectedRows: rows});
    }

    /**
     * 点赞查询
     */
    async thumbupAction() {
        let userId = this.get('user_id');
        let model = this.model('users');
        let data = await model.userThumbUp(userId);
        return this.success(data);
    }

    /**
     * 短信
     */
    async smsAction() {
        let mobile = this.get('mobile');
        let apikey = this.config('sms').apikey;
        let apiurl = this.config('sms').apiurl;
       /* let Request = think.service('request');
        let request = new Request();*/
        let code = randomCode();
        let text = '您的验证码是'+ code;
        let params = {
            apikey: apikey,
            mobile: mobile,
            text: text
        };

        let requestPost = function(params){
            let requestPromise = think.promisify(Request.post, Request);
            return requestPromise(params);
        };
        let response = await requestPost({
            url: apiurl,
            form: params
        });
        if(response.statusCode == 200){
            return this.success(code);
        }else{
            return this.fail(response.body);
        }


    }
}