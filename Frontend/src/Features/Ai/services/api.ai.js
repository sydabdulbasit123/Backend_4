import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials: true,
// })
export async function interviewReport(formdata) {
  try {
    const response = await axios.post("/api/interview/", formdata
  );

    return response.data;
  } catch (err) {
    console.log("REGISTER ERROR:", err.response?.data);
    throw err;
  }
}
export async function getinterviewReport(){
  try {
    const response = await axios.get("/api/interview/interview")
    return response.data
  } catch (err) {
     console.log("ERROR:", err);
    throw err
  }
}
export async function getallinterviewReport(){
  try {
    const response = await axios.get("/api/interview/allreports")
    return response.data
  } catch (err) {
     console.log("ERROR:", err);
    throw err
  }
}
export async function GenerateResume(){
  try{
    const response = await axios.post("/api/resume/generate")
    return response.data
  }
  catch(err){
    console.log("ERROR:", err);
    throw err
  }
}