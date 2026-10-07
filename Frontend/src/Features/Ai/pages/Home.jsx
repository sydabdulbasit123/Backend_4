import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import { useAuth } from "../../Auth/Hooks/useAuth";

const LOGIN_PATH = "/login";
const REPORT_PATH = "/reports";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(AuthContext);
  const { logoutHandler } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  // Loading khatam hone ke baad user nahi mila to login par bhejo
  useEffect(() => {
    if (!loading && !user) {
      navigate(LOGIN_PATH, { replace: true });
    }
  }, [loading, user, navigate]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutHandler();
      setUser(null);
    } finally {
      navigate(LOGIN_PATH, { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0d12] text-slate-400">
        Loading your profile...
      </div>
    );
  }

  const name = user?.name || user?.username || "User";
  const email = user?.email || "";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0d12] px-4 py-10 text-slate-200">
      <main className="w-full max-w-md rounded-2xl border border-white/5 bg-[#10131a] p-8 shadow-2xl shadow-black/40">
        {/* User info */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#ff2d6f]/20 bg-[#ff2d6f]/15 text-3xl font-semibold text-[#ff4d85]">
            {initial}
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-white">
            Welcome, {name}
          </h1>
          {email && <p className="mt-1 text-sm text-slate-400">{email}</p>}
        </div>

        {/* Details */}
        <dl className="mt-6 divide-y divide-white/5 rounded-xl border border-white/5 bg-[#1a1e28] px-4 text-sm">
          <div className="flex justify-between py-3">
            <dt className="text-slate-400">Name</dt>
            <dd className="font-medium text-slate-200">{name}</dd>
          </div>
          {email && (
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-slate-400">Email</dt>
              <dd className="truncate font-medium text-slate-200">{email}</dd>
            </div>
          )}
        </dl>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate(REPORT_PATH)}
            className="w-full rounded-lg bg-[#ff2d6f] px-4 py-3 font-medium text-white transition hover:bg-[#ff4381] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d6f]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10131a]"
          >
            View report
          </button>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full rounded-lg border border-white/10 bg-[#1a1e28] px-4 py-3 font-medium text-slate-200 transition hover:border-white/15 hover:bg-[#222735] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d6f]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10131a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </main>
    </div>
  );
}