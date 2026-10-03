import { createContext, useState } from "react";


const AiContext = createContext();

const AiProvider = ({ children }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);


  return (
    <AiContext.Provider value={{ report, setReport, loading, setLoading }}>
      {children}
    </AiContext.Provider>
  );
};
export { AiContext , AiProvider };