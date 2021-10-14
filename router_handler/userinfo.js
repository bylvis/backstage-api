const db = require('../db/index') 
exports.getUserinfo = (req,res)=>{
    const sql = 'select id,username,nickname,email,user_pic,password from ev_users where id=?'
    // req.user是token解析成功 express-jwt挂载上去的
    db.query(sql,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length!==1){
            return res.cc('获取用户信息失败！')
        }
        res.send({
            status:0,
            message:'获取用户基本信息成',
            data:results[0]
        })
    })
    
}

// module.exports = router