import { useState } from "react";
import useAi from "../Hooks/useAi.js";
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading.jsx"

const MAX_JD = 5000;

/* ---------- tiny inline icons (no extra dependency) ---------- */
const Icon = ({ children, className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const BriefcaseIcon = () => (
  <Icon>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
  </Icon>
);
const UserIcon = () => (
  <Icon>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </Icon>
);
const UploadIcon = () => (
  <Icon className="h-7 w-7">
    <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 .5 9" />
    <path d="M12 12v8M9 15l3-3 3 3" />
  </Icon>
);
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M12 11v5M12 8h.01"
      stroke="#0b0d12"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);
const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="m12 2 2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8 5.7 21.5l1.7-7.3L2 9.5l7.1-.6L12 2Z" />
  </svg>
);

/* ---------- page ---------- */
export default function HomePage() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();
  const {interviewReportHandler , loading} = useAi();

  async function handleSubmit() {
  const formData = new FormData();

  formData.append("Resume", resume);
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  


    const data =await interviewReportHandler(formData);
    if(data){
      navigate("/interview")
    }

  }
if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] px-4 py-12 text-slate-200 sm:py-16">
      {/* Heading */}
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Create Your Custom{" "}
          <span className="text-[#ff2d6f]">Interview Plan</span>
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>

      {/* Card */}
      <section className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-white/5 bg-[#10131a] shadow-2xl shadow-black/40">
        <div className="grid md:grid-cols-2">
          {/* Left: job description */}
          <div className="flex flex-col p-6 md:border-r md:border-white/5">
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="jd"
                className="flex items-center gap-2 text-sm font-semibold text-white"
              >
                <span className="text-[#ff2d6f]">
                  <BriefcaseIcon />
                </span>
                Target Job Description
              </label>
              <span className="rounded bg-[#ff2d6f]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#ff4d85]">
                Required
              </span>
            </div>

            <div className="relative flex-1">
              <textarea
                id="jd"
                value={jobDescription}
                maxLength={MAX_JD}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={
                  "Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                }
                className="h-72 w-full resize-none rounded-lg border border-white/5 bg-[#1a1e28] p-3 pb-8 text-sm leading-relaxed text-slate-200 placeholder:text-slate-500 focus:border-[#ff2d6f]/60 focus:outline-none focus:ring-1 focus:ring-[#ff2d6f]/40 md:h-full md:min-h-[22rem]"
              />
              <span className="pointer-events-none absolute bottom-3 right-3 text-[11px] text-slate-500">
                {jobDescription.length} / {MAX_JD} chars
              </span>
            </div>
          </div>

          {/* Right: profile */}
          <div className="flex flex-col p-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <span className="text-[#ff2d6f]">
                <UserIcon />
              </span>
              Your Profile
            </h2>

            {/* Resume Upload */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-white">
                Upload Resume
                <span className="rounded bg-pink-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-pink-500">
                  Best Results
                </span>
              </label>

              <label
                id="dropzone"
                htmlFor="resume"
                data-state="idle"
                className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl
           border-[1.5px] border-dashed border-slate-700 bg-slate-800/60 px-4 py-7 text-center text-pink-500
           transition-colors hover:border-pink-500 hover:bg-slate-800
           data-[state=ok]:border-solid data-[state=ok]:border-green-500
           data-[state=error]:border-red-500"
              >
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  className="sr-only"
                  onChange={(e) => setResume(e.target.files[0])}
                />

                <UploadIcon />
                {resume ? (
                  <p className="text-sm font-semibold text-green-500">
                    {resume.name}
                  </p>
                ) : (
                  <div className="flex flex-col items-center gap-1.5">
                    <strong
                      id="dz-title"
                      className="text-sm font-semibold text-white"
                    >
                      Click to upload
                    </strong>

                    <small id="dz-hint" className="text-[11px] text-slate-500">
                      PDF ONLY (Max 3MB)
                    </small>
                  </div>
                )}
              </label>
            </div>

            {/* OR divider */}
            <div className="my-4 flex items-center gap-3 text-[11px] font-medium text-slate-500">
              <span className="h-px flex-1 bg-white/10" />
              OR
              <span className="h-px flex-1 bg-white/10" />
            </div>
            {/*selfDescription*/}
            <label
              htmlFor="self"
              className="mb-2 text-xs font-semibold text-slate-300"
            >
              Quick Self-Description
            </label>
            <textarea
              id="self"
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              className="h-24 w-full resize-none rounded-lg border border-white/5 bg-[#1a1e28] p-3 text-sm leading-relaxed text-slate-200 placeholder:text-slate-500 focus:border-[#ff2d6f]/70 focus:outline-none focus:ring-1 focus:ring-[#ff2d6f]/40"
            />

            <div className="mt-3 flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-xs leading-relaxed text-blue-200/80">
              <span className="mt-0.5 shrink-0 text-blue-400">
                <InfoIcon />
              </span>
              <p>
                Either a <strong className="text-white">Resume</strong> or a{" "}
                <strong className="text-white">Self Description</strong> is
                required to generate a personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="flex flex-col gap-3 border-t border-white/5 px-6 py-4 sm:flex-row sm:items-center sm:justify-end">
          {/* <p className="text-[11px] text-slate-500">
            {error ? (
              <span role="alert" className="text-[#ff6b95]">
                {error}
              </span>
            ) : (
              "AI-Powered Strategy Generation • Approx 30s"
            )}
          </p> */}
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff2d6f] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff2d6f]/25 transition hover:bg-[#ff4381] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <p>Generate Plan</p>
            <StarIcon />
          </button>
        </div>
      </section>

      {/* Page footer */}
      <footer className="mt-10 flex justify-center gap-6 text-[11px] text-slate-500">
        <a href="/privacy" className="hover:text-slate-300">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-slate-300">
          Terms of Service
        </a>
        <a href="/help" className="hover:text-slate-300">
          Help Center
        </a>
      </footer>
    </main>
  );
}
