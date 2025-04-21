const bcrypt = require('bcrypt');

const hashedPassword= async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    return hashPassword;
}

const matchPassword = async(password,existingPassword)=>{
    const isMatch = await bcrypt.compare(password,existingPassword);
    return isMatch
}


module.exports = {hashedPassword,matchPassword}