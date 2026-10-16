const { Router } = require("express");
const upload = require("../middlewares/Interview.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  interViewContentGenerateByAI,
  getInterViewReport,
  getAllInterViewReport,
  getInterViewReportById,
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
aiRouter.get("/interview/:id", authMiddleware.authUser, getInterViewReportById);

module.exports = aiRouter;
