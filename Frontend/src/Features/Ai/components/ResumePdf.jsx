import useAi from "../Hooks/useAi";
import "./ResumePdf.css";

const ResumePdf = () => {
  const { resumehtml } = useAi();

  return (
    <div className="resume-page">

      <div
        id="resume"
        className="resume-container"
        dangerouslySetInnerHTML={{
          __html: resumehtml,
        }}
      />

    </div>
  );
};

export default ResumePdf;