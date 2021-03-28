const express =  require('express');
const { signup, signin, signout } = require('../controller/auth');
const { requireSignin } = require('../common-middleware');
const { validateSignupRequest, isRequestValidated,validateSigninRequest } = require('../validators/auth');
const router =  express.Router();


router.post('/signup',validateSignupRequest ,isRequestValidated, signup);
router.post('/signin' ,validateSigninRequest,isRequestValidated,signin );
router.post('/signout', requireSignin, signout)

/*router.post('/profile',requireSignin, (req,res) => {
    res.status(200).json({user: 'profile'})
});*/

module.exports =router;