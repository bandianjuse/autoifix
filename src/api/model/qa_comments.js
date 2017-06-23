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
     * 用户信息加评论查询
     */
    async userCommentsQuery(para) {
        this.relation = {
            users: {
                type: think.model.BELONG_TO,
                key : 'user_id',
                fKey: 'id',
                field : 'id,account,nickname,avatar'
                //field: 'account,avatar'
            },
        };
        //return await this.where({[this.pk] : pk}).find();
        return await this.page(para.pageNo, para.pageSize).order('id DESC').where({qa_id : para.qa_id}).countSelect();
    }

    
}