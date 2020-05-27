const mongoose = require("mongoose")
const Schema = mongoose.Schema
const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        default: "no photo"
    },
    postedBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
})

module.exports = Post = mongoose.model("Post", postSchema)
