const { Router } = require("express");
const upload = require("../middlewares/InterView.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  interViewContentGenerateByAI,
  getInterViewReport,
  getAllInterViewReport
} = require("../controllers/Interview.controller");

const aiRouter = Router();

aiRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("Resume"),
  interViewContentGenerateByAI,
);

aiRouter.get("/interview", authMiddleware.authUser, getInterViewReport);
aiRouter.get("/allreports", authMiddleware.authUser, getAllInterViewReport);

module.exports = aiRouter;
