'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    /**
     * index action logic
     * @return {} []
     */
    indexAction(){

    }

    /**
     * 权限验证
     */
    async checkAuth() {
        let value = await this.session('userInfo');
        return think.isEmpty(value);
    }

    /**
     * 新增
     */
    async postAction() {
        let auth = await this.checkAuth();
        if(auth) return this.fail('没有权限！');
    }

    /**
     * 删除数据
     */
    async deleteAction() {
        let auth = await this.checkAuth();
        if(auth) return this.fail('没有权限！');
    }

    /**
     * 更新数据
     */
    async putAction() {
        let auth = await this.checkAuth();
        if(auth) return this.fail('没有权限！');
    }
}