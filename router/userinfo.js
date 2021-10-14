const expres = require('express')
const router = expres.Router()
const userHandler = require('../router_handler/userinfo')

router.get('/userinfo',userHandler.getUserinfo)
module.exports = router