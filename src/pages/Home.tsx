import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white">

      {/* 🌈 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 left-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-3xl rounded-full -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      {/* 🧭 NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/[0.03] border-b border-white/10">
        <div className="flex justify-between items-center px-10 py-5 max-w-7xl mx-auto">

          <h1 className="font-semibold tracking-tight">
            AI Evaluator
          </h1>

          <Link
            to="/ai-tool"
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-5 py-2 rounded-lg text-sm font-medium shadow-lg hover:opacity-90 transition"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* 🚀 HERO */}
      <section className="text-center px-6 py-28 max-w-5xl mx-auto">

        <h2 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
          AI-Powered Answer Evaluation
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Built for Modern Learning Systems
          </span>
        </h2>

        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
          Simulate automated grading, generate structured feedback,
          and evaluate responses instantly with AI-driven workflows.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link
            to="/ai-tool"
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
          >
            Launch Dashboard
          </Link>

          <a
            href="#features"
            className="border border-white/10 bg-white/[0.03] px-6 py-3 rounded-lg hover:bg-white/[0.08] transition"
          >
            Learn More
          </a>

        </div>
      </section>

      {/* ✨ FEATURES */}
      <section id="features" className="px-10 py-20 max-w-6xl mx-auto">

        <h3 className="text-3xl font-semibold text-center mb-14 tracking-tight">
          Core Capabilities
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: "AI Evaluation",
              desc: "Simulates grading logic using structured AI responses.",
            },
            {
              title: "Real-time Feedback",
              desc: "Instant feedback with actionable suggestions.",
            },
            {
              title: "Performance Tracking",
              desc: "Visualize progress and scoring trends over time.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition"
            >
              <h4 className="font-semibold mb-2 text-white">
                {f.title}
              </h4>
              <p className="text-gray-400 text-sm">
                {f.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* 🧠 PRODUCT PREVIEW */}
      <section className="px-10 py-20 max-w-6xl mx-auto text-center">

        <h3 className="text-3xl font-semibold mb-6 tracking-tight">
          Built Like a Real SaaS Dashboard
        </h3>

        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Clean UI, structured data, and scalable architecture designed
          for real-world applications.
        </p>

        {/* PREVIEW CARD */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          <div className="relative group">

            {/* IMAGE */}
            <img
              src="/dashboard.png"
              alt="AI Evaluator Dashboard"
              className="rounded-xl border border-white/10 shadow-2xl 
              group-hover:scale-[1.02] transition duration-500"
            />

            {/* OVERLAY GLOW */}
            <div className="absolute inset-0 rounded-xl 
              bg-gradient-to-t from-black/40 to-transparent opacity-0 
              group-hover:opacity-100 transition duration-500" />

          </div>
        </div>

      </section>

      {/* 🚀 CTA */}
      <section className="text-center py-24">

        <h3 className="text-3xl font-semibold mb-4 tracking-tight">
          Start Evaluating Answers Today
        </h3>

        <p className="text-gray-400 mb-8">
          Experience how AI can enhance grading workflows.
        </p>

        <Link
          to="/ai-tool"
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-8 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
        >
          Open Dashboard
        </Link>

      </section>

      {/* 🧾 FOOTER */}
      <footer className="text-center text-gray-500 text-sm pb-10 border-t border-white/10 pt-6">
        © {new Date().getFullYear()} AI Evaluator — Demo Project
      </footer>
    </div>
  )
}