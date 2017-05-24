'use strict';

import Base from './base.js';

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
     * 登录
     */
    async loginAction() {
        let userkey = this.config('userkey');
        let Crypto = think.service('crypto');
        let crypto = new Crypto();
        let values = this.post();
        let model = this.model('users');
        let password = crypto.encrypt(values.password,userkey);
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
}