const interviewReportModel = require("../models/interviewReport.model");
const { AtsResumeByAi } = require("../services/AiResumeBuild.service");

async function generateResumeByAI(req, res) {
  try {
    const data = await interviewReportModel
      .findOne({ user: req.user._id })
      .sort({ createdAt: -1 });

    if (!data) {
      return res.status(404).json({
        message: "No interview report found for the user.",
      });
    }

    const resume = await AtsResumeByAi({
      Resume: data.resume,
      selfDescription: data.selfDescription,
      jobDescription: data.jobDescription,
    });

    res.status(200).json({
      message: "Resume generated successfully.",
      resume,
    });

  } catch (error) {
    console.error("Error generating resume:", error);

    res.status(500).json({
      message: "Error generating resume.",
    });
  }
}

module.exports = {
  generateResumeByAI,
};