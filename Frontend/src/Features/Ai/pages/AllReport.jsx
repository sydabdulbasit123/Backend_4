import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAi from "../Hooks/useAi"


/* ---- Apne project ke hisaab se in cheezon ko badlo ---- */
// const REPORTS_URL = "/api/interview"; // user ki saari reports dene wala GET route
const REPORT_DETAIL_PATH = (id) => `/report/${id}`; // ek report ka frontend route
const NEW_REPORT_PATH = "/create-report"; // nayi report banane wala page
const LOGIN_PATH = "/login";
/* ------------------------------------------------------- */

const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Score ke hisaab se colour
const scoreStyle = (score) => {
  if (score >= 75)
    return "bg-emerald-500/15 text-emerald-300 border-emerald-500/20";
  if (score >= 50) return "bg-amber-500/15 text-amber-300 border-amber-500/20";
  return "bg-[#ff2d6f]/15 text-[#ff6b95] border-[#ff2d6f]/20";
};

export default function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const {GetAllReportHandler} = useAi()

useEffect(() => {
  let ignore = false;

  GetAllReportHandler()
    .then((data) => {
      if (ignore) return;
      // Backend {reports: [...]} bheje ya seedha [...], dono chalega
      const list = Array.isArray(data) ? data : (data?.reports ?? []);
      setReports(list);
      setError("");
    })
    .catch((err) => {
      if (ignore) return;
      // axios ka error aise aata hai: err.response.status
      if (err?.response?.status === 401) {
        navigate(LOGIN_PATH, { replace: true });
        return;
      }
      setError(err?.response?.data?.message || err.message || "Something went wrong.");
    })
    .finally(() => {
      if (!ignore) setLoading(false);
    });

  return () => {
    ignore = true;
  };
}, [navigate, reloadKey]);

  const retry = () => {
    setLoading(true);
    setError("");
    setReloadKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] px-4 py-10 text-slate-200">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              &larr; Back to home
            </Link>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              My reports
            </h1>
            {!loading && !error && (
              <p className="mt-1 text-sm text-slate-400">
                {reports.length} {reports.length === 1 ? "report" : "reports"}
              </p>
            )}
          </div>

          <button
            onClick={() => navigate(NEW_REPORT_PATH)}
            className="rounded-lg bg-[#ff2d6f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ff4381] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d6f]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d12]"
          >
            + New report
          </button>
        </header>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-white/5 bg-[#10131a]"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-white/5 bg-[#10131a] p-10 text-center">
            <p className="text-[#ff6b95]">{error}</p>
            <button
              onClick={retry}
              className="mt-4 rounded-lg bg-[#ff2d6f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#ff4381]"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && reports.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-[#10131a] p-12 text-center">
            <p className="text-lg font-medium text-white">No reports yet</p>
            <p className="mt-1 text-sm text-slate-400">
              Generate your first interview report to see it here.
            </p>
            <button
              onClick={() => navigate(NEW_REPORT_PATH)}
              className="mt-5 rounded-lg bg-[#ff2d6f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ff4381]"
            >
              Create a report
            </button>
          </div>
        )}

        {/* Reports grid */}
        {!loading && !error && reports.length > 0 && (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => {
              const id = report._id ?? report.id;
              const title =
                report.title ||
                report.jobTitle ||
                report.role ||
                "Interview report";
              const score = report.matchScore ?? report.score;

              return (
                <li key={id}>
                  <Link
                    to={REPORT_DETAIL_PATH(id)}
                    className="flex h-full flex-col justify-between rounded-2xl border border-white/5 bg-[#10131a] p-6 transition hover:border-[#ff2d6f]/30 hover:bg-[#141821] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d6f]/60"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="line-clamp-2 text-lg font-semibold text-white">
                          {title}
                        </h2>
                        {typeof score === "number" && (
                          <span
                            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${scoreStyle(score)}`}
                          >
                            {score}% match
                          </span>
                        )}
                      </div>
                      {report.createdAt && (
                        <p className="mt-2 text-sm text-slate-400">
                          {formatDate(report.createdAt)}
                        </p>
                      )}
                    </div>

                    <span className="mt-6 text-sm font-medium text-[#ff4d85]">
                      View report &rarr;
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
