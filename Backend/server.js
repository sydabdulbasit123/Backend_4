require("dotenv").config()
const app = require("./src/app.js")
const connectdb =require("./src/db/db.js")


connectdb()

app.listen(process.env.PORT, ()=>{
    console.log(`SERVER IS RUNNING ON ${process.env.PORT}`)
})