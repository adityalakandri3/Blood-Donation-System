const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//hashing the password
const hashedPassword= async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    return hashPassword;
}

//matching the password 
const matchPassword = async(password,existingPassword)=>{
    const isMatch = await bcrypt.compare(password,existingPassword);
    return isMatch
}

const AuthCheck = async(req,res,next)=>{
    const token = req.body.token||req.query.token||req.headers['x-access-token']||req.headers['authorization']

    //checking if token is there
    if(!token){
        return res.status(400).json({
            status:false,
            message:'Token is required for verification'
        })
    }
    try {
        //token verification and sending the next middleware
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:`Invalid Token,${error.message}`
        })
    }
    return next();
}


module.exports = {hashedPassword,matchPassword,AuthCheck}