import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Features/Auth/pages/Register";
import Login from "./Features/Auth/pages/Login";
import Home from "./Features/Ai/pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
       <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;