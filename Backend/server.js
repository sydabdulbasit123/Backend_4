require("dotenv").config()
const app = require("./src/app")
const connectdb =require("./src/db/db")

connectdb()

app.listen(process.env.PORT, ()=>{
    console.log(`SERVER IS RUNNING ON ${process.env.PORT}`)
})