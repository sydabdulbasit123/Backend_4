import { AiContext } from "../AiContext";
import { getinterviewReport, interviewReport , GenerateResume } from "../services/api.ai";
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
  const GenerateResumeHandler = async () => {
    setLoading(true);
    try {
      const data = await GenerateResume()

      return data.resume
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return { report, loading, interviewReportHandler, GetReportHandler , GenerateResumeHandler };
};

export default useAi