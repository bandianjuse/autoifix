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
    async category(keys,pageNo,pageSize) {
        this.relation = {
            guide: {
                type: think.model.MANY_TO_MANY,
                rModel: 'guide_category',
                rfKey: 'guide_id',
                where : 'state=1'
            }
        };

        return await this.page(pageNo, pageSize).where({id: ['IN', keys]}).countSelect();
    }

    
}