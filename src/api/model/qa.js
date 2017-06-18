'use strict';
/**
 * relation model
 */
export default class extends think.model.relation {
    /**
     * init
     * @param  {} args []
     * @return {}         []
     */
    init(...args) {
        super.init(...args);
    }

    /**
     * 综合查询
     */
    async qaAll(para) {
        this.relation = {
            qa_comments: {
                type: think.model.HAS_MANY,
                key : 'id',
                fKey: 'qa_id',
                //field: 'account,avatar'
            },
        };
        //return await this.where({[this.pk] : pk}).find();
        return await this.page(para.pageNo, para.pageSize).where(para.where).countSelect();
    }

    
}