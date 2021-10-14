// 导入数据库模块
const db = require('../db/index')
// 导入加密库bcryptjs
const bcrypt = require('bcryptjs')
// 导入生成token的包
const jwt = require('jsonwebtoken')
// 导入token的密钥对象
const config = require('../config')
exports.regUser = (req,res)=>{
    const userinfo = req.body
    // if(!userinfo.username || !userinfo.password){
    //     return res.cc('错误格式的密码或者用户名')
    // }
    userinfo.password = bcrypt.hashSync(userinfo.password,10)
    const sql = 'select * from ev_users where username = ?'
    db.query(sql,userinfo.username,(err,results)=>{
        // 错误返回错误信息
        if(err){
            return res.cc(err)
        }
        // 如果有返回解说说明重名
        if(results.length > 0){
            return res.cc('用户名被占用！')
        }
        const addStr = 'insert into ev_users set ?'
        
        db.query(addStr,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if(err){
                return res.cc(err)
            }
        })
        res.cc('注册成功！',0)
    })
  
}

exports.login = (req,res)=>{
    // 接受表单的数据
    const userinfo = req.body
    // 定义sql语句
    const sql = 'select * from ev_users where username=?'
    // 通过sql语句，根据用户名查询信息 
    db.query(sql,userinfo.username,(err,results)=>{
        // 执行sql失效
        if(err){
            return res.cc(err)
        }
        // 执行sql成功 获取到的数据条数不等于1
        if(results.length !==1 ) return res.cc('登陆失败,没有该用户')
        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult){
            return res.cc('密码错误')
        }
        // 生成剔除密码和头像的 用户对象
        const user = {...results[0],password:'',user_pic:''}
        console.log(user); 
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'})
        res.send({
            status:0,
            message:'登陆成功',
            token:'Bearer '+tokenStr
        })
    })
}

// /router_handler/user.js 向外共享路由处理函数