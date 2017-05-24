'use strict';
/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.rest {
    /**
     * init
     * @param  {Object} http []
     * @return {}      []
     */
    init(http) {
        super.init(http);
    }

    /**
     * before magic method
     * @return {Promise} []
     */
    __before() {

    }

    /**
     * 权限验证
     */
    async checkAuth() {
        let value = await this.session('userInfo');
        return think.isEmpty(value);
    }

    /**
     * 查询数据
     */
    async getAction() {
        let data;

        data = await this.modelInstance.userDynamic();
        return this.success(data);
    }

    /**
     * 新增数据
     * @return {Promise} []
     */
    async postAction() {
        let auth = await this.checkAuth();
        if(auth){
            return this.fail('没有权限！');
        }

        let pk = await this.modelInstance.getPk();
        let data = this.post();
        delete data[pk];
        if (think.isEmpty(data)) {
            return this.fail('数据不能为空！');
        }
        let insertId = await this.modelInstance.add(data);
        return this.success({ id: insertId });
    }

    /**
     * 删除数据
     */
    async deleteAction() {
        return this.fail();
    }

    /**
     * 更新数据
     */
    async putAction() {
        return this.fail();
    }
}