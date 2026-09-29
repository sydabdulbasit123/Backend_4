import Router from "./app.route.jsx";
import { AuthProvider } from "./Features/Auth/AuthContext.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;