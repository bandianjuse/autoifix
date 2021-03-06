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
     * 查询数据
     */
    async getAction() {
        return this.fail();
    }

    /**
     * 新增数据
     * @return {Promise} []
     */
    async postAction() {
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
        if (!this.id) {
            return this.fail('params error');
        }
        let pk = await this.modelInstance.getPk();
        let rows = await this.modelInstance.where({[pk]: this.id}).delete();
        return this.success({affectedRows: rows});
    }

    /**
     * 更新数据
     */
    async putAction() {
        return this.fail();
    }
}