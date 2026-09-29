import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.js";
import Loading from "../components/Loading.jsx";

const Login = () => {
  const { loginHandler, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Formhandler = async (e) => {
    e.preventDefault();
    await loginHandler({ email, password });

    navigate("/");

    setEmail("");
    setPassword("");
  };

  const inputStyle =
    "w-full rounded-lg bg-white/90 px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-400 transition";

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 px-4">
      <form
        onSubmit={(e) => Formhandler(e)}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Welcome Back
        </h1>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-200"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className={inputStyle}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-200"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={inputStyle}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-500 py-2.5 font-semibold text-white hover:bg-indigo-400 active:scale-[0.98] transition"
        >
          Login
        </button>
        <p className="text-sm text-slate-200 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </main>
  );
};

export default Login;
