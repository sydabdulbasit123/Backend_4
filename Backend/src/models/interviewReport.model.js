const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "technical Question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false },
);

const BehavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Behavioral Question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false },
);

const SkillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    serverity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  { _id: false },
);

const preprationPlanSchema = new mongoose.Schema(
  {
    skill: {
      days: Number,
      focus: String,
      tasks: [String],
    },
  },
  { _id: false },
);

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Job description is required"],
  },
  resume: {
    type: String,
  },
  selfDescrpition: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  technicalQuestions:  [technicalQuestionSchema] ,
  behavioralQuestions:  [BehavioralQuestionSchema] ,
  skillGaps: [SkillGapSchema] ,
  preprationPlan:  [preprationPlanSchema] ,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:user
  }
});

const interviewReportModel = mongoose.model(
  "interviewReport",
  interviewReportSchema,
);


module.exports = interviewReportModel;