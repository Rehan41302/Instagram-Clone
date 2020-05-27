const User = require("../models/user")
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    // Get the token from request(Coming from client)
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error:"You must be Logged In."})
    }

    const token = authorization.replace("Bearer ","")

    jwt.verify(token,process.env.JWT_SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({error:"You must be Logged In."})
        }

        const {id} = payload

        User.findById(id)
            .then(userData=>{
                req.user = userData
                next()
            }) 
            .catch(err => console.log(err))
    })

}