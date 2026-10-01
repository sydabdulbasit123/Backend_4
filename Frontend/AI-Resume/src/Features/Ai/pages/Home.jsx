import { useRef, useState } from "react";

const MAX_JD = 5000;
const MAX_FILE_MB = 5;
const ALLOWED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="m12 2 2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8 5.7 21.5l1.7-7.3L2 9.5l7.1-.6L12 2Z" />
  </svg>
);

/* ---------- page ---------- */
export default function HomePage() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (!ALLOWED.includes(f.type)) {
      setError("Upload a PDF file.");
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024*3) {
      setError(`File is larger than ${MAX_FILE_MB} MB.`);
      return;
    }
    setError("");
    setFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const hasProfile = Boolean(file) || selfDescription.trim().length > 0;
  const canSubmit = jobDescription.trim().length > 0 && hasProfile && !loading;

  const handleSubmit = async () => {
    if (!jobDescription.trim()) return setError("Paste the job description first.");
    if (!hasProfile) return setError("Add a resume or a short self-description.");
    setError("");
    setLoading(true);
    try {
      const body = new FormData();
      body.append("jobDescription", jobDescription);
      body.append("selfDescription", selfDescription);
      if (file) body.append("resume", file);

      // TODO: replace with your real endpoint
      // const res = await fetch("/api/interview-plan", { method: "POST", body });
      // const data = await res.json();
      await new Promise((r) => setTimeout(r, 1500)); // demo delay
    } catch {
      setError("Couldn't generate your plan. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0d12] px-4 py-12 text-slate-200 sm:py-16">
      {/* Heading */}
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Create Your Custom <span className="text-[#ff2d6f]">Interview Plan</span>
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
          Let our AI analyze the job requirements and your unique profile to build a
          winning strategy.
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

            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
              Upload Resume
              <span className="rounded bg-[#ff2d6f]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#ff4d85]">
                Best results
              </span>
            </div>

            {/* Dropzone */}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`flex h-32 w-full flex-col items-center justify-center rounded-lg border border-dashed px-4 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d6f]/60 ${
                dragging
                  ? "border-[#ff2d6f] bg-[#ff2d6f]/10"
                  : "border-white/10 bg-[#1a1e28] hover:border-white/20"
              }`}
            >
              <span className="text-[#ff2d6f]">
                <UploadIcon />
              </span>
              {file ? (
                <span className="mt-2 max-w-full truncate text-sm font-semibold text-white">
                  {file.name}
                </span>
              ) : (
                <span className="mt-2 text-sm font-semibold text-white">
                  Click to upload or drag &amp; drop
                </span>
              )}
              <span className="mt-1 text-[11px] text-slate-500">
                {file
                  ? `${(file.size / 1024).toFixed(0)} KB · click to replace`
                  : `PDF or DOCX (Max ${MAX_FILE_MB}MB)`}
              </span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            {/* OR divider */}
            <div className="my-4 flex items-center gap-3 text-[11px] font-medium text-slate-500">
              <span className="h-px flex-1 bg-white/10" />
              OR
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <label htmlFor="self" className="mb-2 text-xs font-semibold text-slate-300">
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
                <strong className="text-white">Self Description</strong> is required to
                generate a personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="flex flex-col gap-3 border-t border-white/5 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-slate-500">
            {error ? (
              <span role="alert" className="text-[#ff6b95]">
                {error}
              </span>
            ) : (
              "AI-Powered Strategy Generation • Approx 30s"
            )}
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff2d6f] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff2d6f]/25 transition hover:bg-[#ff4381] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <StarIcon />
            {loading ? "Generating..." : "Generate My Interview Report"}
          </button>
        </div>
      </section>

      {/* Page footer */}
      <footer className="mt-10 flex justify-center gap-6 text-[11px] text-slate-500">
        <a href="/privacy" className="hover:text-slate-300">Privacy Policy</a>
        <a href="/terms" className="hover:text-slate-300">Terms of Service</a>
        <a href="/help" className="hover:text-slate-300">Help Center</a>
      </footer>
    </main>
  );
}