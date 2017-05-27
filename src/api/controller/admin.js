'use strict';

import Base from './base.js';

export default class extends Base {

    /**
     * 登录
     */
    async loginAction() {

        let userkey = this.config('userkey');
        let Crypto = think.service('crypto');
        let crypto = new Crypto();
        let values = this.post();
        let model = this.model('admin');
        let password = crypto.encrypt(values.password,userkey);

        let data = await model.where({
            account: values.account,
            password: password
        }).field('id,account').select();
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
        let model = this.model('admin');
        let password = crypto.encrypt(values.password,userkey);
        let insertId = await model.thenAdd(
            {
                account: values.account,
                password: password
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
     * 检查是否登录
     */
    async checkLoginAction() {
        return this.success();
    }


}