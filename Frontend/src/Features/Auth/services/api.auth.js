import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials: true,
// })

export async function register({ username, email, password }) {
  try {
    const response = await axios.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log("REGISTER ERROR:", err.response?.data);
    throw err;
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data);
    throw err;
  }
}

export async function logout() {
  try {
    const response = await axios.get("/api/auth/logout");

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMe() {
  try {
    const response = await axios.get("/api/auth/get-me");

    return response.data;
  } catch (err) {
    console.log(err);
  }
}