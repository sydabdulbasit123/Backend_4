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
    try {
      const data = await loginHandler({ email, password });

      if (data) {
        navigate("/");
      }
    } catch (error) {
      console.log("LOGIN FAILED:", error);
    }
    setEmail("");
    setPassword("");
  };

  const inputStyle =
    "w-full rounded-lg border border-white/5 bg-[#1a1e28] px-4 py-2.5 text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-[#ff2d6f]/60 focus:ring-1 focus:ring-[#ff2d6f]/40";

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0b0d12] px-4">
      <form
        onSubmit={(e) => Formhandler(e)}
        className="w-full max-w-md rounded-2xl border border-white/5 bg-[#10131a] p-8 shadow-2xl shadow-black/40 space-y-6"
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
          className="w-full rounded-lg bg-[#ff2d6f] py-2.5 font-semibold text-white transition hover:bg-[#ff4381] active:scale-[0.98]"
        >
          Login
        </button>
        <p className="text-sm text-slate-200 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer text-[#ff4d85] hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </main>
  );
};

export default Login;
