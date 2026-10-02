import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
})
export async function interviewReport(formdata) {
  try {
    const response = await api.post("/api/interview/", formdata
  );

    return response.data;
  } catch (err) {
    console.log("REGISTER ERROR:", err.response?.data);
    throw err;
  }
}