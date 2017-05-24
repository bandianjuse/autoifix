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
   * 登录
   */
  loginAction(){
    this.allowMethods = 'post';
  }

  /**
   * 注册
   */
  registerAction() {
    this.allowMethods = 'post';
    this.rules = {
      account: "required|mobile:zh-CN",
      password: "required|length:6,20"
    }
  }

  /**
   * 更新
   */
  async updateAction(){
    let auth = await this.checkAuth();
    if(auth) return this.fail('没有权限！');
    this.allowMethods = 'post';
  }

  /**
   * 点赞记录
   */
  async thumbupAction() {
    let auth = await this.checkAuth();
    if(auth) return this.fail('没有权限！');
  }
}