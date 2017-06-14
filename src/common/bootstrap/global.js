/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */

/**
 * 生成随机位数码
 */
global.randomCode = (codeLength = 6) => {
    //首先默认code为空字符串
    let code = '';
    //设置随机字符
    let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    //循环codeLength
    for (let i = 0; i < codeLength; i++) {
        //设置随机数范围
        let index = Math.floor(Math.random() * 10);
        //字符串拼接 将每次随机的字符 进行拼接
        code += random[index];
    }
    //将拼接好的字符串赋值给展示的Value
    return code;
};