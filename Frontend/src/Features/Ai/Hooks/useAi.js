import { AiContext } from "../AiContext";
import { interviewReport } from "../services/api.ai";
import { useContext } from "react";

const useAi = () => {
  const context = useContext(AiContext);
  const { report, setReport, loading, setLoading } = context;

  const interviewReportHandler = async (formdata) => {
    setLoading(true);
    try {
      const data = await interviewReport(formdata);
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