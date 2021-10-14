const joi = require('joi')
/*
1. string()值必须是字符串
2. alphanum()值必须是a-z A-Z 0-9的字符串
3. min()最小长度
4. max()最大长度
5. required()必填项
6. pattern()正则表达式
 */
// 用户名验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码验证规则
const password = joi.string()
                .pattern(/^[\S]{6,12}/)    
                .required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
    body:{
        username,
        password
    }
}
