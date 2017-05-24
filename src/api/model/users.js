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
     * 用户动态
     */
    async userThumbUp(pk) {
        this.relation = {
            guide: {
                type: think.model.MANY_TO_MANY,
                field: 'id,title,thumbnail',
                rModel: 'users_thumbup',
                rfKey: 'guide_id'
            }
        };
        return await this.field('id').where({[this.pk] : pk}).find();
    }
}