const mongooes =require("mongoose")

const BlackTistTokenSchema = new mongooes.Schema({
    token:{
        type:String,
        required:true
    }
})
const BlacklistTokenModel = mongooes.model("blacklistToken", BlackTistTokenSchema)
module.exports= BlacklistTokenModel