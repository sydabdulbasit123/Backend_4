import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Features/Auth/pages/Register";
import Login from "./Features/Auth/pages/Login";
import Home from "./Features/Ai/pages/Home";
import Protected from "./Features/Auth/components/Protected.jsx";
import InterviewPage from "./Features/Ai/pages/Interview.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/interview" element={<InterviewPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
