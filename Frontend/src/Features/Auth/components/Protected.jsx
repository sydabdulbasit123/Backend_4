import { useAuth } from "../Hooks/useAuth.js";
import { Navigate } from "react-router-dom";
import Loading from "./Loading.jsx";

const Protected = ({children}) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;