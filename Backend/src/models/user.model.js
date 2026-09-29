const mongooes = require("mongoose")

const userSchema = new mongooes.Schema({
    username:{
        type:String,
        unique:[true, "username is already taken"],
        required:true
    },
    email:{
        type:String,
        unique:[true, "user already exists with this email"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const userModel = mongooes.model("user", userSchema)
module.exports= userModel