const express = require("express");
const authRoute = require("./routes/auth.route");
const aiRoute = require("./routes/Interview.route");
const resumeRoute = require("./routes/resume.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-job-support-alpha.vercel.app",
  "https://backend-4-lsw9ijecj-syed-61e5.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use("/api/auth", authRoute);
app.use("/api/interview", aiRoute);
app.use("/api/resume", resumeRoute);
module.exports = app;