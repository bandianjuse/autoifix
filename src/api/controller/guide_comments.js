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
        if (this.id) {
            let pk = await this.modelInstance.getPk();
            data = await this.modelInstance.where({ [pk]: this.id }).find();
            return this.success(data);
        }
        if(this.get('pid')){
            this.modelInstance.getList()
            data = await this.modelInstance.where({ pid: this.get('pid') }).select();
            return this.success(data);
        }
        let values = this.get();
        data = await this.modelInstance.page(values.page, values.pageSize || 10).countSelect();
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
        let auth = await this.checkAuth();
        if(auth){
            return this.fail('没有权限！');
        }
        let pk = await this.modelInstance.getPk();
        let rows = await this.modelInstance.where({ [pk]: this.id }).delete();
        return this.success({ affectedRows: rows });
    }

    /**
     * 更新数据
     */
    async putAction() {
        let auth = await this.checkAuth();
        if(auth){
            return this.fail('没有权限！');
        }
        let pk = await this.modelInstance.getPk();
        let data = this.post();
        delete data[pk];
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        let rows = await this.modelInstance.where({ [pk]: this.id }).update(data);
        return this.success({ affectedRows: rows });
    }
}