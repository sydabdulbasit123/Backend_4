import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0d12] px-4 py-10 text-slate-200">
      <main className="w-full max-w-md text-center">
        <p className="bg-gradient-to-b from-[#ff4d85] to-[#ff2d6f]/30 bg-clip-text text-8xl font-bold tracking-tight text-transparent sm:text-9xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-semibold text-white">
          Page not found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          The page you are looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-lg bg-[#ff2d6f] px-6 py-3 font-medium text-white transition hover:bg-[#ff4381] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d6f]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d12]"
          >
            Go to home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-white/10 bg-[#1a1e28] px-6 py-3 font-medium text-slate-200 transition hover:border-white/15 hover:bg-[#222735] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d6f]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d12]"
          >
            Go back
          </button>
        </div>
      </main>
    </div>
  );
}