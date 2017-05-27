'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {

  /**
   * 权限验证
   */
  async checkAuth() {
    let value = await this.session('userInfo');
    return think.isEmpty(value);
  }


  async uploadAction(){
    let auth = await this.checkAuth();
    if(auth) return this.fail('没有权限！');
  }


}