const pdfparse = require('pdf-parse');
const { InterViewReportByAi } = require('../services/AiResumeReport.service');
const interviewReportModel = require('../models/interviewReport.model')

async function interViewContentGenerateByAI(req, res) {
    resumecontent = await (new pdfparse.PDFParse(Uint8Array.from(req.file.buffer))).gettext();
    const{jobDescription , selfDescription }=req.body

    const GenerateReport = await InterViewReportByAi({
        Resume: resumecontent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = interviewReportModel.create({
        user: req.user._id,
        resume: resumecontent.text,
        selfDescrpition: selfDescription,
        jobDescription: jobDescription,
        ...GenerateReport
    })

    res.status(200).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

module.exports={interViewContentGenerateByAI}