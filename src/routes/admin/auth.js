const express =  require('express');
const { sign } = require('jsonwebtoken');
const { signup, signin, requireSignin } = require('../../controller/admin/auth');
const router = express.Router();


router.post('/admin/signup', signup)
router.post('/admin/signin' ,signin )



module.exports =router;