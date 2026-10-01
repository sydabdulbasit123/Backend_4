const pdfparse = require("pdf-parse");
const { InterViewReportByAi } = require("../services/AiResumeReport.service");
const interviewReportModel = require("../models/interviewReport.model");

async function interViewContentGenerateByAI(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: "Resume PDF is required",
    });
  }
  const resumecontent = await (new pdfparse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
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

module.exports = {interViewContentGenerateByAI};