require("dotenv").config()
const app = require("./src/app.js")
const connectdb =require("./src/db/db.js")
const {Resume , selfDescription , jobDescription} = require("./src/models/Temp.js")
const GenerateInterviewReport = require("./src/services/AiResumeReport.service.js")

connectdb()
GenerateInterviewReport({Resume , selfDescription , jobDescription})

app.listen(process.env.PORT, ()=>{
    console.log(`SERVER IS RUNNING ON ${process.env.PORT}`)
})