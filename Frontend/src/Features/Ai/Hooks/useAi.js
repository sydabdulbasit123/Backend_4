import { AiContext } from "../AiContext";
import { getinterviewReport, interviewReport, GenerateResume, getallinterviewReport} from "../services/api.ai";
import { useContext } from "react";
import {toast} from "react-hot-toast"

const useAi = () => {
  const context = useContext(AiContext);
  const { report, setReport, loading, setLoading , resumehtml  , setResumehtml } = context;

  const interviewReportHandler = async (formdata) => {
    setLoading(true);
    try {
      const data = await interviewReport(formdata);
      setReport(data.interviewReport);
      toast.success("Interview report generated");
      return data;
    } catch (error) {
      toast.error("sorry, something went wrong");
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
      toast.error("sorry, something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const GetAllReportHandler = async () => {
    setLoading(true);
    try {
      const data = await getallinterviewReport();

      return data.reports;
    } catch (error) {
      toast.error("no reports found");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateResumeHandler = async () => {
    setLoading(true);
    try {
      const data = await GenerateResume()
      setResumehtml(data.resume)
      toast.success("Resume generated");
      return data.resume
    } catch (error) {
      toast.error("sorry, something went wrong");
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return { report, loading, resumehtml ,interviewReportHandler, GetReportHandler , GenerateResumeHandler, GetAllReportHandler };
};

export default useAi