const {Router} = require("express");
const resumeController = require("../controllers/resume.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const resumerouter = Router();

resumerouter.post("/generate", authMiddleware.authUser, resumeController.generateResumeByAI);

module.exports = resumerouter;