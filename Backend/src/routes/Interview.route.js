const { Router } = require("express");
const upload = require("../middlewares/InterView.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const interViewContentGenerateByAI = require("../controllers/Interview.controller");

const aiRouter = Router();

aiRouter.post(
  "/",
  authMiddleware,
  upload.single("Resume"),
  interViewContentGenerateByAI,
);

module.exports = aiRouter;