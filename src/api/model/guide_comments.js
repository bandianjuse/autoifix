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
    init(...args){
        super.init(...args);
       /* this.relation = {
            category: {
                type : think.model.BELONG_TO,
                field: 'name',
            },
        }*/
    }
    getList(){
        //return this.cache('getList', 1000).where({id : 1}).find();
    }
}