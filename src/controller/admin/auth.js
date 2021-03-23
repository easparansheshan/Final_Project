const User = require('../../models/user');
const jwt = require('jsonwebtoken')

exports.signup= (req,res) => {
    User.findOne({email:req.body.email})
        .exec((error, user) => {
            if(user) return res.status(400).json({
                message : "Admin already registered"
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
                role : 'admin'
            });
            _user.save((error, data) => {
                if(error){
                    return res.status(400).json({
                        message : 'Something wrong'
                    })
                }
                if(data){
                    return res.status(200).json({
                        message: 'Admin created successfully '
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
            if(user.authenticate(req.body.password) && user.role =='admin'){
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

//require sign in as a user

exports.requireSignin = (req,res,next) =>{
    const token = req.headers.authorization.split(" ")[1];
    //verify the user
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
     next();
   // jwt.decode()
}