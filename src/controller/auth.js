const User = require('../models/user.js');
const jwt = require('jsonwebtoken');


exports.signup= (req,res) => {

   


    User.findOne({email:req.body.email})
        .exec((error, user) => {
            if(user) return res.status(400).json({
                message : "User already registered"
            });
            const {
                firstName,
                lastName,
                email,
                password
            
            } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username : Math.random().toString(),
               
            });
            _user.save((error, data) => {
                if(error){
                    return res.status(400).json({
                        message : 'Something wrong'
                    })
                }
                if(data){
                    return res.status(200).json({
                        message: 'user created successfully '
                    })
                }
            })
        })
}

exports.signin = (req,res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(error)return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                //create token
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET ,{expiresIn: '1h'})
                const {firstName,lastName,email,role,fullName} = user;
                res.status(200).json({
                    token,
                    user: {
                        firstName,lastName,email,role,fullName
                    }
                })
            }else{
                return res.status(400).json({
                    message : 'Invalid Password'
                })
            }
        }else{
            return res.status(400).json({
                message: "Something wrong"
            })
        }
    })
}

