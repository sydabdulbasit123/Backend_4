import { useRef } from "react";
import html2pdf from "html2pdf.js";
import DOMPurify from "dompurify";
import useAi from "../Hooks/useAi";
import "./ResumePdf.css";

const ResumePdf = () => {
  const { resumehtml } = useAi();
  const resumeRef = useRef(null);

  const handleDownload = () => {
    if (!resumeRef.current) return;

    html2pdf()
      .set({
        margin: [18, 18, 18, 18], // mm, har page pe same spacing
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], avoid: ["h2", "h3", "li"] },
      })
      .from(resumeRef.current)
      .save();
  };

  return (
    <div className="resume-page">
      <button
        type="button"
        className="download-btn"
        onClick={handleDownload}
        disabled={!resumehtml}
      >
        Download PDF
      </button>

      <div className="resume-sheet">
        <div
          id="resume"
          ref={resumeRef}
          className="resume-container"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(resumehtml || ""),
          }}
        />
      </div>
    </div>
  );
};

export default ResumePdf;