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

  /**
   * 登录
   */
  loginAction(){
    this.allowMethods = 'post';
  }

  /**
   * 注册
   */
  async registerAction() {
    let auth = await this.checkAuth();
    if(auth) return this.fail('没有权限！');
    this.allowMethods = 'post';
    this.rules = {
      account: "required",
      password: "required"
    }
  }

  /**
   * 检查是否登录
   */
  async checkLoginAction() {
    let auth = await this.checkAuth();
    if(auth) return this.fail('没有权限！');
  }

}