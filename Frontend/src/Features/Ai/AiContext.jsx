import { createContext, useState } from "react";


const AiContext = createContext();

const AiProvider = ({ children }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumehtml, setResumehtml] = useState()


  return (
    <AiContext.Provider value={{ report, setReport, loading, setLoading , resumehtml, setResumehtml }}>
      {children}
    </AiContext.Provider>
  );
};
export { AiContext , AiProvider };