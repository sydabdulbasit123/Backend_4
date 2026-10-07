import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Features/Auth/pages/Register.jsx";
import Login from "./Features/Auth/pages/Login.jsx";
import Report from "./Features/Ai/pages/Report.jsx";
import Protected from "./Features/Auth/components/Protected.jsx";
import InterviewPage from "./Features/Ai/pages/Interview.jsx";
import ResumePdf from "./Features/Ai/components/ResumePdf.jsx";
import Home from "./Features/Ai/pages/Home.jsx";
import NotFound from "./Features/Auth/pages/NotFound.jsx";
import Reports from "./Features/Ai/pages/AllReport.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/create-report"
          element={
            <Protected>
              <Report />
            </Protected>
          }
          />
        <Route
          path="/reports"
          element={
            <Protected>
              <Reports/>
            </Protected>
          }
        />
        <Route
          path="/interview"
          element={
            <Protected>
              <InterviewPage />
            </Protected>
          }
        />
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/resume-pdf"
          element={
            <Protected>
              <ResumePdf />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
