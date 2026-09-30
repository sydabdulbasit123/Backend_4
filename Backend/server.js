require("dotenv").config()
const app = require("./src/app.js")
const connectdb =require("./src/db/db.js")
const {Resume , selfDescription , jobDescription} = require("./src/models/Temp.js")
const GenerateInterviewReport = require("./src/services/AiResumeReport.service.js")

connectdb()
//ai response....

console.log("AI CALL STARTING...");

GenerateInterviewReport({
  Resume,
  selfDescription,
  jobDescription,
})
  .then((result) => {
    console.log("AI RESPONSE RECEIVED:");
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error("AI ERROR:");
    console.error(error);
  });

console.log("AI CALL SENT...");


//
app.listen(process.env.PORT, ()=>{
    console.log(`SERVER IS RUNNING ON ${process.env.PORT}`)
})