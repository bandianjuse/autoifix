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
    async guideAll(pk) {
        this.relation = {
            users: {
                type: think.model.HAS_ONE,
                key : 'user_id',
                fKey: 'id',
                field: 'account,avatar'
            },
            category: {
                type: think.model.MANY_TO_MANY,
                rModel: 'guide_category',
                rfKey: 'category_id'
            },
            tool: {
                type: think.model.HAS_ONE,
                key : 'tool_id',
                fKey: 'id',
                field: 'title,thumbnail'
            }
        };
        return await this.where({[this.pk] : pk}).find();
    }
}