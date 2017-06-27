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
        let data;
        if (this.id) {
            let pk = await this.modelInstance.getPk();
            data = await this.modelInstance.where({[pk]: this.id}).find();
            return this.success(data);
        }
        if(this.get('user_id')){
            data = await this.modelInstance.where({user_id: this.get('user_id')}).select();
            return this.success(data);
        }

        let title = this.get('title');
        let pageNo = this.get('pageNo') || 1;
        let pageSize = this.get('pageSize') || 10;
        let where = {};
        if (title) where.title = ['like', '%' + title + '%'];
        data = await this.modelInstance.page(pageNo, pageSize).order('id DESC').where(where).countSelect();
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
        if (!this.id) {
            return this.fail('params error');
        }
        let pk = await this.modelInstance.getPk();
        let data = this.post();
        delete data[pk];
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        let rows = await this.modelInstance.where({[pk]: this.id}).update(data);
        return this.success({affectedRows: rows});
    }
}