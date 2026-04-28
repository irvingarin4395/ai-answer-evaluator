import { useEffect, useState } from "react"
import { getHistory } from "../services/aiService"
import { Link } from "react-router-dom"

type Evaluation = {
  id: number
  question: string
  answer: string
  score: number
  feedback: string
  suggested: string
  date: string
}

export default function History() {
  const [history, setHistory] = useState<Evaluation[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHistory()
        setHistory(data)
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex">

      {/* 🌈 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 left-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-3xl rounded-full -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      {/* 🧭 SIDEBAR */}
      <aside className="w-64 bg-white/[0.03] backdrop-blur-xl border-r border-white/10 p-6 hidden md:flex flex-col">
        <h2 className="text-lg font-semibold tracking-tight mb-10">
          AI Evaluator
        </h2>

        <nav className="space-y-2 text-sm">
          <Link
            to="/ai-tool"
            className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className="block px-3 py-2 rounded-lg bg-white/10"
          >
            History
          </Link>

          <Link
            to="/settings"
            className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            Settings
          </Link>
        </nav>

        <div className="mt-auto text-xs text-gray-500">
          SaaS Demo UI
        </div>
      </aside>

      {/* 🧠 MAIN */}
      <main className="flex-1 p-12 max-w-5xl mx-auto w-full">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Evaluation History
          </h1>
          <p className="text-gray-400 mt-2">
            Review past AI evaluations and feedback insights
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-6">

          {history.length === 0 && (
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 text-gray-500 text-sm">
              No history yet
            </div>
          )}

          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition"
            >
              {/* TOP ROW */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500">
                  {item.date}
                </span>

                <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-400/20">
                  {item.score} Score
                </span>
              </div>

              {/* QUESTION */}
              <h3 className="font-semibold text-white mb-2">
                {item.question}
              </h3>

              {/* ANSWER */}
              <p className="text-gray-400 text-sm mb-4">
                {item.answer}
              </p>

              {/* FEEDBACK */}
              <div className="border-t border-white/10 pt-4 space-y-2">

                <p className="text-gray-200 text-sm">
                  {item.feedback}
                </p>

                <p className="text-gray-500 text-xs">
                  Suggestion: {item.suggested}
                </p>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}