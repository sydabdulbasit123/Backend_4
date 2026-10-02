import { useContext,} from "react";
import { login, register, logout,} from "../services/api.auth";
import { AuthContext } from "../AuthContext";
import toast from "react-hot-toast";

const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const registerHandler = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loginHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return { user, loading, loginHandler, registerHandler, logoutHandler };
};
export { useAuth };