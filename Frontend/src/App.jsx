import Router from "./app.route.jsx";
import { AuthProvider } from "./Features/Auth/AuthContext.jsx";
import { AiProvider } from "./Features/Ai/AiContext.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <AuthProvider>
        <AiProvider>
          <Router />
        </AiProvider>
      </AuthProvider>
    </>
  );
};

export default App;
