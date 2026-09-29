import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Register = () => {
  const { registerHandler, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Formhandler = async (e) => {
    e.preventDefault();

    await registerHandler({ username, email, password });
    navigate("/login");

    setUsername("");
    setEmail("");
    setPassword("");
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 px-4">
      <form
        onSubmit={(e) => Formhandler(e)}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Create Account
        </h1>

        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-200"
          >
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            placeholder="Enter your username"
            className="w-full rounded-lg bg-white/90 px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

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
            placeholder="Enter your email"
            className="w-full rounded-lg bg-white/90 px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
            placeholder="Enter your password"
            className="w-full rounded-lg bg-white/90 px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-500 py-2.5 font-semibold text-white hover:bg-indigo-400 active:scale-[0.98] transition"
        >
          Submit
        </button>
        <p className="text-sm text-slate-200 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </main>
  );
};

export default Register;
