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
            if(this.get('all')){
                data = await this.modelInstance.guideAll(this.id);
                return this.success(data);
            }else{
                let pk = await this.modelInstance.getPk();
                data = await this.modelInstance.where({ [pk]: this.id }).find();
                return this.success(data);
            }
        }

        let title = this.get('title');
        let thumbupNum = this.get('thumbup_num');
        let state = this.get('state');
        let userId = this.get('user_id');
        let pageNo = this.get('pageNo') || 1;
        let pageSize = this.get('pageSize') || 10;
        let where = {};
        let order = ''
        if (title) where.title = ['like', '%' + title + '%'];
        if (state) where.state = state;
        if(userId) where.user_id = userId;
        if(thumbupNum) order = 'thumbup_num DESC';

        data = await this.modelInstance.page(pageNo, pageSize).where(where).order(order).countSelect();
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
            return this.fail('data is empty');
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
        let rows = await this.modelInstance.where({ [pk]: this.id }).delete();
        return this.success({ affectedRows: rows });
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
        let rows = await this.modelInstance.where({ [pk]: this.id }).update(data);
        return this.success({ affectedRows: rows });
    }


}