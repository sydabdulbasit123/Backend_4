import { AiContext } from "../AiContext";
import { interviewReport } from "../services/api.ai";
import { useContext } from "react";

const useAi = () => {
  const context = useContext(AiContext);
  const { report, setReport, loading, setLoading } = context;

  const interviewReportHandler = async ({
    jobDescription,
    selfDescription,
    resume,
  }) => {
    setLoading(true);
    try {
      const data = await interviewReport({
        jobDescription,
        selfDescription,
        resume,
      });
      setReport(data.interviewReport);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { report, loading, interviewReportHandler };
};

export default  useAi ;