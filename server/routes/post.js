const express = require("express")
const router = express.Router();
const Post = require("../models/post")
const requireLogin = require("../middleware/requireLogin")


// @route GET
// @defined Read All Posts 
// @access Public 
router.get("/allposts", (req,res) => {
    Post.find()
        .populate("postedBy","_id name")
        .then(posts => {
            res.json({posts})
        })
        .catch(err => {console.log(err)}) 
})


// @route GET
// @defined Read My Posts 
// @access Private 
router.get("/myposts", requireLogin, (req,res) => {
    Post.find({postedBy: req.user.id})
        .populate("postedBy","_id name")
        .then(myPosts => {
            res.json({myPosts})
        })
        .catch(err => {console.log(err)}) 
})


// @route POST
// @defined Create Post 
// @access Private 
router.post("/createpost", requireLogin,(req,res) => {
    const {title, body} = req.body;
    if (!title || !body){
        return res.status(422).json({error: "Please add all the fields"})
    }

    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy: req.user,
    })
    post.save()
        .then(result => {
            res.json({post:result})
        })
        .catch(err => {console.log(err)})

})

module.exports = router