import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
})
export async function interviewReport({ jobDescription, selfDescription, resume }) {
  try {
    const response = await api.post("/api/interview/", {
    jobDescription,
    selfDescription,
    resume,
  });

    return response.data;
  } catch (err) {
    console.log("REGISTER ERROR:", err.response?.data);
    throw err;
  }
}