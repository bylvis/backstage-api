const express = require('express')
const router = express.Router()
// 导入路由处理函数模块
const userHandler = require('../router_handler/user')
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则对象 结构赋值
const {reg_login_schema} = require('../schema/user')

// 注册新用户 第二个参数是验证表单数据的局部中间件
// 验证通过，会把这次请求流转给后面的路由处理函数
// 验证不通过，终止，抛出一个全局的error，进入全局错误处理中间件执行
router.post('/reguser',expressJoi(reg_login_schema),userHandler.regUser)

// 登录
router.post('/login',expressJoi(reg_login_schema),userHandler.login)

module.exports = router