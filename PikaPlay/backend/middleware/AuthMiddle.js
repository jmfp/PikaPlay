const jwt = require('jsonwebtoken')

const UserModel = require('../models/Users')

const protect = async (req, res, next) =>{
    //console.log(req.headers)
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1];
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            req.user = await UserModel.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({message: 'not authorized'})
        }
    }if(!token){
        res.status(401).json({message: 'no token'})
    }
}

module.exports = {protect}