const express = require("express")
const router = express.Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


// @route POST
// @defined Sign Up New User
// @access Public
router.post("/signup",(req,res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password){
        return res.status(422).json({error: "Please add all the fields"})
    }
    User.findOne({email})
        .then((prevUser) => {
            if(prevUser){
                return res.status(422).json({error:'Email already exists'})            
            }
            const newUser = new User({
                name,email,password
            })
            
            // Hash password before saving in database
                bcrypt.hash(newUser.password, 12, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json({message: 'Saved Successfully'}))
                    .catch(err => console.log(err));
                });
            
        })
        .catch(err => {
            console.log('Sign Up Error...',err)
        })
})

// @route POST
// @defined Sign In New User
// @access Public
router.post("/signin",(req,res) => {
    const { email, password} = req.body;
    if (!email || !password){
        return res.status(422).json({error: "Please add all the fields."})
    }
    User.findOne({email})
        .then((user) => {
            if(!user){
                return res.status(422).json({error:'Invalid Email or Password.'})            
            }
             // Check password
             bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    console.log("userID: ",user.id)
        
                    // User matched
                    // Create JWT Payload
                    const payload = {
                    id: user.id,
                    name: user.name,
                    };
            // Sign token
                    jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                        success: true,
                        token: "Bearer " + token
                        });
                    }
                    );
                } else {
                    return res.status(422).json({error:'Invalid Email or Password'})
                }
                })
                .catch(err => {
                    console.log(err)
                })
            
        })
        .catch(err => {
            console.log('Sign Up Error...',err)
        })
})
module.exports = router;