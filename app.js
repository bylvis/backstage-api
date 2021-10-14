// 导入express
const express = require('express')
// 导入跨域解决方案cors
const cors = require('cors')
// 导入router
const router = require('./router/user')
const userinfoRouter = require('./router/userinfo')
// 导入验证规则包
const joi = require('joi')

// 创建服务器实例
const app = express()
// 配置解析表单格式中间件
app.use(express.urlencoded({extended:false}))
// 为所有路由声名一个全局中间件，给res挂载一个res.cc()函数
app.use((req,res,next)=>{
    // status=0为成功 ，1为失败 默认1
    // err可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = (err,status=1)=>{
        res.send({
            status,
            // 是否是一个错误对象 如果是 把他的message属性给message不是就把它本身交给message
            message:err instanceof Error ? err.message:err
        })
    }
    next()
})
// 导入配置文件
const config = require('./config')
// 导入解析token的中间件
const expressJWT = require('express-jwt')
// 使用unless({path:[/^\/api\//]})指定不需要token验证的接口 api的都不要 其他的都要
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))
// 配置路由中间件 统一访问前缀/api
app.use('/api',router)
// 配置用户信息的中间件 统一访问前缀/my
app.use('/my',userinfoRouter)
// 配置跨域中间件
app.use(cors())
// 配置全局错误中间件 错误才会执行
app.use((err,req,res,next)=>{
    // 数据验证失败
    if(err instanceof joi.ValidationError) return res.cc(err)
    if(err.name === 'UnauthorizedError'){
        return res.cc('token无效！身份认证失败！')
      }
    // 未知错误
    res.cc(err)
})
// 启动服务器
app.listen(80,(req,res)=>{
    console.log('express is running at http://127.0.0.1')
})