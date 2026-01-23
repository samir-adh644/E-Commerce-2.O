const jwt = require('jsonwebtoken')  
const {promisify} = require("util")
const {users}= require("../model")

exports.isAuthneticated = async(req,res,next) =>{
    try{
    const token = req.cookies.jwtToken
    if(!token||token==null || token == undefined){
        return res.status(401).json({message: "Authentication Failed"});
    }

    const verifiedResult = await promisify(jwt.verify)(token,'admin')
    const data = await users.findByPk(verifiedResult.id)
    if(!data){
        return res.status(404).json({message:"Invalid User"})
    }

    req.userId = verifiedResult.id
    next();


} catch(err){
    return res.status(401).json({message:"Invalid User"})

}
}