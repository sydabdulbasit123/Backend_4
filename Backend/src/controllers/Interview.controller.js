const pdfparse = require("pdf-parse");
const { InterViewReportByAi } = require("../services/AiResumeReport.service");
const interviewReportModel = require("../models/interviewReport.model");

async function interViewContentGenerateByAI(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: "Resume PDF is required",
    });
  }
  const resumecontent = await new pdfparse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { jobDescription, selfDescription } = req.body;

  const GenerateReport = await InterViewReportByAi({
    Resume: resumecontent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user._id,
    resume: resumecontent.text,
    selfDescrpition: selfDescription,
    jobDescription: jobDescription,
    ...GenerateReport,
  });

  res.status(200).json({
    message: "Interview report generated successfully.",
    interviewReport,
  });
}

async function getInterViewReport(req, res) {
  try {
    const report =await interviewReportModel
      .findOne({ user: req.user._id })
      .sort({ createdAt: -1 });
    if (!report) {
      return res.status(404).json({
        message: "No interview report found for the user.",
      });
    }
    res.status(200).json({
      message: "Interview report found.",
      report,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch interview report",
    });
  }
}

async function getAllInterViewReport(req, res) {
  try {
    const reports = await interviewReportModel
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });
    if (!reports) {
      return res.status(404).json({
        message: "No interview report found for the user.",
      });
    }
    res.status(200).json({
      message: "Interview reports found.",
      reports,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch interview report",
    });
  }
}

module.exports = { interViewContentGenerateByAI, getInterViewReport , getAllInterViewReport };
