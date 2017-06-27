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
     * 用户点赞
     */
    async userThumbUp(para) {
        this.relation = {
            guide: {
                type: think.model.MANY_TO_MANY,
                field: 'id,title,thumbnail',
                rModel: 'users_thumbup',
                rfKey: 'guide_id',
                where : para.guide_id ? 'guide_id='+para.guide_id : ''
            }
        };
        return await this.field('id').page(para.pageNo, para.pageSize).where({id : para.user_id}).order('id DESC').countSelect();
    }
}