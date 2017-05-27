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
     * 查询数据
     */
    async getAction() {
        let data;
        if (this.id) {
            let pk = await this.modelInstance.getPk();
            data = await this.modelInstance.where({ [pk]: this.id }).find();
            return this.success(data);
        }
        if (this.get('pid')) {
            data = await this.modelInstance.where({ pid: this.get('pid') }).select();
            return this.success(data);
        }
        let values = this.get();
        data = await this.modelInstance.field('id,pid,name').select();
        return this.success(data);
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
        let pk = await this.modelInstance.getPk();
        let rows = await this.modelInstance.where({ [pk]: this.id }).delete();
        return this.success({ affectedRows: rows });
    }

    /**
     * 更新数据
     */
    async putAction() {
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