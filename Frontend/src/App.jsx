import Router from "./app.route.jsx";
import { AuthProvider } from "./Features/Auth/AuthContext.jsx";
import {AiProvider} from "./Features/Ai/AiContext.jsx"

const App = () => {
  return (
    <AuthProvider>
      <AiProvider>
        <Router />
      </AiProvider>
    </AuthProvider>
  );
};

export default App;