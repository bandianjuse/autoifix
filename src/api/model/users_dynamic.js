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
        this.relation = {
            guide: {
                type: think.model.HAS_ONE,
                key : 'guide_id',
                fKey: 'id',
                field: 'id,title,thumbnail',
            },
            qa: {
                type: think.model.HAS_ONE,
                key : 'qa_id',
                fKey: 'id',
                field: 'id,title,thumbnail',
            },
            tool: {
                type: think.model.HAS_ONE,
                key : 'tool_id',
                fKey: 'id',
                field: 'id,title,thumbnail',
            },
        };
    }

    /**
     * 用户动态
     */
    async userDynamic() {
        return await this.order('id DESC').limit(6).select();
    }
}