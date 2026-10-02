import { useEffect, useState } from "react";
import useAi from "../Hooks/useAi";
import Loading from "../components/Loading"

/* ------------------------------------------------------------------
   Layout (from your wireframe):
   ┌────────────┬──────────────────────┬──────────────┐
   │ Technical  │                      │  Skill Gaps  │
   │ Behavioral │    main content      │  (chips)     │
   │ Road Map   │                      │              │
   └────────────┴──────────────────────┴──────────────┘
   Usage: <InterviewPage report={reportFromApi} />
   Falls back to the sample report at the bottom of this file.
------------------------------------------------------------------- */

const NAV = [
  { id: "technical", label: "Technical Questions", key: "technicalQuestions" },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    key: "behavioralQuestions",
  },
  { id: "roadmap", label: "Road Map", key: "preparationPlan" },
];

const SEVERITY = {
  high: "border-red-500/30 bg-red-500/10 text-red-300",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
};

/* ---------- small pieces ---------- */

function MatchScore({ score }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-4">
      <svg
        viewBox="0 0 72 72"
        className="h-16 w-16 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="#1f2430"
          strokeWidth="6"
        />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="#ff2d6f"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
        />
      </svg>
      <div>
        <p className="text-2xl font-bold text-white">{score}%</p>
        <p className="text-xs text-slate-500">Match with this role</p>
      </div>
    </div>
  );
}

function QuestionCard({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-xl border border-white/5 bg-[#1a1e28]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d6f]/60 rounded-xl"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#ff2d6f]/15 text-xs font-semibold text-[#ff4d85]">
          {index + 1}
        </span>
        <span className="flex-1 text-sm font-medium leading-relaxed text-white">
          {item.question}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="space-y-4 border-t border-white/5 px-4 pb-4 pt-3 pl-13">
          <div>
            <h4 className="mb-1 text-xs font-semibold text-[#ff4d85]">
              Why they ask this
            </h4>
            <p className="text-sm leading-relaxed text-slate-400">
              {item.intention}
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-xs font-semibold text-emerald-400">
              How to answer
            </h4>
            <p className="text-sm leading-relaxed text-slate-300">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

function QuestionList({ title, subtitle, items = [] }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mb-5 mt-1 text-sm text-slate-500">{subtitle}</p>
      <div className="space-y-3">
        {items.map((q, i) => (
          <QuestionCard key={i} item={q} index={i} />
        ))}
      </div>
    </section>
  );
}

/* preparationPlan can arrive as {day, focus, tasks} or {skill:{tasks}} */
function RoadMap({ plan = [] }) {
  const steps = plan
    .map((p, i) => ({
      day: p.day ?? i + 1,
      title:
        p.focus ?? p.title ?? (typeof p.skill === "string" ? p.skill : null),
      tasks: p.tasks ?? p.skill?.tasks ?? [],
    }))
    .filter((s) => s.tasks.length > 0);

  return (
    <section>
      <h2 className="text-lg font-semibold text-white">Road Map</h2>
      <p className="mb-5 mt-1 text-sm text-slate-500">
        A step-by-step plan to close your skill gaps before the interview.
      </p>

      {steps.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-[#1a1e28] p-8 text-center">
          <p className="text-sm font-medium text-white">No road map yet</p>
          <p className="mt-1 text-xs text-slate-500">
            This report doesn't have any preparation tasks.
          </p>
        </div>
      ) : (
        <ol className="space-y-4 border-l border-white/10 pl-5">
          {steps.map((s) => (
            <li key={s.day} className="relative">
              <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-[#ff2d6f] ring-4 ring-[#10131a]" />
              <h3 className="text-sm font-semibold text-white">
                Day {s.day}
                {s.title ? `: ${s.title}` : ""}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {s.tasks.map((t, i) => (
                  <li
                    key={i}
                    className="text-sm leading-relaxed text-slate-400"
                  >
                    {typeof t === "string" ? t : t.task}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function SkillGaps({ gaps = [] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">Skill Gaps</h2>
      <p className="mb-4 mt-1 text-xs text-slate-500">
        Topics the job asks for that your profile doesn't show.
      </p>
      <div className="flex flex-wrap gap-2">
        {gaps.map((g) => (
          <span
            key={g.skill}
            title={`${g.severity} priority`}
            className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${
              SEVERITY[g.severity] ?? SEVERITY.low
            }`}
          >
            {g.skill}
          </span>
        ))}
      </div>
      <dl className="mt-5 space-y-1.5 text-[11px] text-slate-500">
        {Object.keys(SEVERITY).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full border ${SEVERITY[s]}`} />
            <dt className="capitalize">{s} priority</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------- page ---------- */

export default function InterviewPage() {
  const [active, setActive] = useState("technical");
  const [report, setreport] = useState({});

  const { GetReportHandler , loading } = useAi();

  useEffect(() => {
    const fetchreport = async () => {
      try {
        const reports = await GetReportHandler();

        if (reports) {
          setreport(reports);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchreport();
  }, []);

  const counts = {
    technical: report.technicalQuestions?.length ?? 0,
    behavioral: report.behavioralQuestions?.length ?? 0,
    roadmap: report.preparationPlan?.length ?? 0,
  };
   if (loading) {
    <Loading/>
   }
  return (
    <main className="min-h-screen bg-[#0b0d12] px-4 py-8 text-slate-200">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-white/5 bg-[#10131a] shadow-2xl shadow-black/40 lg:grid-cols-[240px_1fr_280px]">
        {/* LEFT: navigation */}
        <nav
          aria-label="Report sections"
          className="flex gap-2 overflow-x-auto border-b border-white/5 p-4 lg:flex-col lg:border-b-0 lg:border-r"
        >
          <p className="hidden px-3 pb-2 text-xs font-semibold text-slate-500 lg:block">
            Your interview report
          </p>
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setActive(n.id)}
              aria-current={active === n.id ? "page" : undefined}
              className={`flex shrink-0 items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d6f]/60 ${
                active === n.id
                  ? "bg-[#ff2d6f]/15 text-[#ff4d85]"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {n.label}
              <span className="rounded bg-white/5 px-1.5 text-[11px] text-slate-400">
                {counts[n.id]}
              </span>
            </button>
          ))}
        </nav>

        {/* CENTER: main content */}
        <div className="min-w-0 p-6 lg:p-8">
          {active === "technical" && (
            <QuestionList
              title="Technical Questions"
              subtitle="Expect these based on the job description and your resume. Tap a question to see the intent and a sample answer."
              items={report.technicalQuestions}
            />
          )}
          {active === "behavioral" && (
            <QuestionList
              title="Behavioral Questions"
              subtitle="Prepare a real story for each one."
              items={report.behavioralQuestions}
            />
          )}
          {active === "roadmap" && <RoadMap plan={report.preparationPlan} />}
        </div>

        {/* RIGHT: match score + skill gaps */}
        <aside className="space-y-8 border-t border-white/5 p-6 lg:border-l lg:border-t-0">
          <MatchScore score={report.matchScore ?? 0} />
          <SkillGaps gaps={report.skillGaps} />
        </aside>
      </div>
    </main>
  );
}

/* ---------- sample data (replace with your API response) ---------- */

// const SAMPLE_REPORT = {
//   matchScore: 95,
//   technicalQuestions: [
//     {
//       question:
//         "Design a distributed cache system similar to DistriCache, focusing on consistency, fault tolerance, and scalability. How would you handle partitioning and replication?",
//       intention:
//         "To assess system design skills, understanding of distributed systems concepts, and ability to scale.",
//       answer:
//         "I would design a distributed cache using consistent hashing for partitioning, with replication for fault tolerance. Each node would be responsible for a range of keys. For consistency, I'd use a quorum-based approach for reads and writes. To handle failures, I'd implement heartbeats and automatic failover. The system would be designed to be horizontally scalable by adding more nodes.",
//     },
//     {
//       question:
//         "How would you optimize a Spring Boot application for high throughput and low latency, considering your experience with the checkout API?",
//       intention:
//         "To evaluate knowledge of Java performance tuning, caching strategies, and asynchronous processing.",
//       answer:
//         "I would use caching (Redis) for frequently accessed data, optimize database queries, and use asynchronous processing (Kafka) for non-critical tasks. JVM tuning for garbage collection and connection pooling would also be important. Additionally, I'd profile the application to identify bottlenecks.",
//     },
//     {
//       question:
//         "Design a highly available and scalable order processing system on AWS. What services would you use and why?",
//       intention:
//         "To test AWS knowledge, system architecture, and ability to choose the right services for the job.",
//       answer:
//         "I would use ECS for container orchestration, RDS for relational data, DynamoDB for NoSQL, SQS for message queuing, and Lambda for serverless processing. For high availability, I'd use multiple Availability Zones and auto-scaling. For scalability, I'd design stateless services and use load balancers.",
//     },
//   ],
//   behavioralQuestions: [
//     {
//       question:
//         "Tell me about a time you owned a service end-to-end and how you handled a production incident.",
//       intention:
//         "To assess ownership, incident response, and problem-solving skills.",
//       answer:
//         "When I owned the order-orchestration service, we experienced a latency spike. I led the investigation, identified a database lock issue, and implemented a fix. We then conducted a post-mortem to prevent recurrence.",
//     },
//     {
//       question:
//         "How have you mentored junior engineers? Give an example of how you helped them grow.",
//       intention:
//         "To evaluate mentorship, leadership, and team development skills.",
//       answer:
//         "I mentored three SDE-1s by conducting design reviews, pairing on code, and providing feedback. One junior engineer struggled with system design, so I guided them through a project, which improved their confidence and skills.",
//     },
//     {
//       question:
//         "Describe a time you had to make a trade-off between performance and cost. How did you approach it?",
//       intention:
//         "To test decision-making, prioritization, and business awareness.",
//       answer:
//         "When optimizing the checkout API, we considered using more powerful instances for lower latency but higher cost. We chose a balanced approach by caching and optimizing queries, which reduced latency without significantly increasing costs.",
//     },
//   ],
//   skillGaps: [
//     { skill: "Kubernetes", severity: "medium" },
//     { skill: "Terraform", severity: "medium" },
//     { skill: "AI/LLM integrations", severity: "high" },
//     { skill: "Multi-cloud or hybrid cloud experience", severity: "low" },
//   ],
//   preparationPlan: [],
// };
