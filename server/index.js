require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const AuthRoutes = require("./routes/auth")
const PostRoutes = require("./routes/post")


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// MongoDB Config
mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// MongoDB Connection
mongoose.connection.on('connected',() => {
    console.log('Database Connected...')
})
mongoose.connection.on('error',(err) => {
    console.log('DB Connection Error... ',err)
})



// Auth Routes
app.use("/api/auth",AuthRoutes)
// Post Routes
app.use("/api/post",PostRoutes)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port: ',PORT)
})