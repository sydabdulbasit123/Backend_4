import { useContext, useEffect } from "react";
import { login, register, logout, getMe } from "../services/api.auth";
import { AuthContext } from "../AuthContext";

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

useEffect(() => {
  const getAndSetUser = async () => {
    try {
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      console.log(error)
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  getAndSetUser();
}, []);

  return { user, loading, loginHandler, registerHandler, logoutHandler };
};
export { useAuth };