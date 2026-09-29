const mongooes = require("mongoose");

async function connectdb() {
  try {
    await mongooes.connect(process.env.MONGODB_URI);
    console.log("DB connected!!");
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectdb;