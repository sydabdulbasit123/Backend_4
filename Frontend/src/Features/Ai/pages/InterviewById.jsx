import InterviewPage from "./Interview";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAi from "../Hooks/useAi";

const InterviewById = () => {
  const { id } = useParams();
  const { GetReportByIdHandler } = useAi();
  const [reportdata, setReportData] = useState(null);



  useEffect(() => {
  const fetchReportById = async () => {
    try {
      const data = await GetReportByIdHandler(id);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching report by ID:", error);
    }
  };

    fetchReportById();
  }, [id]);

  return <InterviewPage id={id} reportdata={reportdata} />;
};

export default InterviewById;
