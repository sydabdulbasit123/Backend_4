import { AiContext } from "../AiContext";
import { getinterviewReport, interviewReport } from "../services/api.ai";
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

  const GetReportHandler = async () => {
    setLoading(true);
    try {
      const data = await getinterviewReport();

      return data.report;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  return { report, loading, interviewReportHandler, GetReportHandler };
};

export default useAi;
