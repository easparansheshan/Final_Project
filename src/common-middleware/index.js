const jwt = require ('jsonwebtoken'); 
//require sign in as a user

exports.requireSignin = (req,res,next) =>{

    if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
    //verify the user
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    
   
    }else{
        return res.status(400).json({messgae : 'Authiriztion required'});
    
    };
    next();
    // jwt.decode()
};
//user middle ware
exports.userMiddleware = (req,res,next) => {
    if(req.user.role !=='user'){
        return res.status(400).json({message: 'User Access Denied'})
    }
    next();
}
//admin middle ware
exports.adminMiddleware = (req,res,next) => {
    if(req.user.role !=='admin'){
        return res.status(400).json({message: 'Admin Access Denied'})
    }
    next();
}
