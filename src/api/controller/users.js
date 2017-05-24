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
        if (this.isGet()) return this.fail('params error');
        let values = this.post();
        let model = this.model('users');
        let data = await model.where({
            account: values.account,
            password: values.password
        }).field('id,account,phone,nickname').select();
        await this.session('userInfo', data);
        return this.success(data);
    }

    /**
     * 注册
     */
    async registerAction() {
        if (this.isGet()) return this.fail('params error');
        let values = this.post();
        let model = this.model('users');
        let insertId = await model.thenAdd(
            {
                account: values.account,
                password: values.password,
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
        this.checkAuth();
        await this.session();
        return this.success();
    }

    /**
     * 更新
     */
    async updateAction() {
        let data = this.post();
        if(!data.id) return this.fail('params error');
        let model = this.model('users')
        let pk = await model.getPk();
        let id = data.id;
        delete data[pk];
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        let rows = await model.where({[pk]: id}).update(data);
        return this.success({affectedRows: rows});
    }
}