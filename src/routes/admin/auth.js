const express =  require('express');
const { sign } = require('jsonwebtoken');
const { signup, signin, requireSignin } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated,validateSigninRequest } = require('../../validators/auth');

const router = express.Router();


router.post('/admin/signup',validateSignupRequest,isRequestValidated, signup)
router.post('/admin/signin',validateSigninRequest,isRequestValidated ,signin )



module.exports =router;