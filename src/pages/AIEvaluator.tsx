import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { evaluateAnswer, getHistory } from "../services/aiService"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Evaluation = {
  id?: number
  question: string
  answer: string
  score: number
  feedback: string
  suggested: string
  date: string
}

export default function AIEvaluator() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Evaluation | null>(null)
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

  const handleEvaluate = async () => {
    if (!question || !answer || loading) return

    setLoading(true)

    try {
      const res = await evaluateAnswer(question, answer)
      setResult(res)
      setHistory((prev) => [res, ...prev.slice(0, 6)])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const avgScore =
    history.length > 0
      ? Math.round(
          history.reduce((sum, item) => sum + item.score, 0) /
            history.length
        )
      : 0

  const loadSample = () => {
    setQuestion("Explain supply and demand.")
    setAnswer(
      "When demand increases prices go up. When supply increases prices go down."
    )
  }

  return (
    <div className="relative flex min-h-screen bg-[#020617] text-white">

      {/* 🌈 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 left-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-3xl rounded-full -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      {/* 🧭 SIDEBAR */}
      <aside className="w-64 bg-white/[0.03] backdrop-blur-xl border-r border-white/10 p-6 hidden md:flex flex-col">
        <h2 className="text-lg font-semibold mb-10 tracking-tight">
          AI Evaluator
        </h2>

        <nav className="space-y-2 text-sm">
          <Link
            to="/ai-tool"
            className="block px-3 py-2 rounded-lg bg-white/10"
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
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
      <main className="flex-1 p-12 max-w-7xl mx-auto w-full space-y-12">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            AI Evaluation Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Evaluate answers with structured AI feedback
          </p>
        </div>

        {/* 📊 STATS */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* CARD */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <p className="text-xs text-gray-400 uppercase">
              Average Score
            </p>
            <p className="text-4xl font-bold text-cyan-400 mt-2">
              {history.length ? avgScore : "--"}
            </p>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <p className="text-xs text-gray-400 uppercase">
              Evaluations
            </p>
            <p className="text-4xl font-bold mt-2">
              {history.length}
            </p>
          </div>

          {/* CHART */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-4 h-40">
            {history.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-sm">No data yet</p>
            )}
          </div>
        </div>

        {/* 🧩 GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* INPUT */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="font-semibold mb-5">Input</h2>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 mb-4 bg-white/[0.03] border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-400/50 outline-none"
              placeholder="Enter question..."
            />

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 mb-4 bg-white/[0.03] border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-400/50 outline-none"
              rows={4}
              placeholder="Enter answer..."
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleEvaluate}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
              >
                {loading ? "Evaluating..." : "Evaluate"}
              </button>

              <button
                onClick={loadSample}
                className="px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition"
              >
                Sample
              </button>
            </div>
          </div>

          {/* RESULT */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl p-6">
            <h2 className="font-semibold mb-5">Result</h2>

            {result ? (
              <>
                <p className="text-5xl font-bold text-cyan-400 mb-4">
                  {result.score}
                </p>
                <p className="text-gray-200 mb-3">
                  {result.feedback}
                </p>
                <p className="text-gray-400 text-sm">
                  {result.suggested}
                </p>
              </>
            ) : (
              <p className="text-gray-500">
                Run evaluation to see results
              </p>
            )}
          </div>

          {/* HISTORY */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="font-semibold mb-5">Recent</h2>

            <div className="space-y-3">
              {history.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No history yet
                </p>
              ) : (
                history.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm bg-white/[0.03] p-3 rounded-lg border border-white/10 hover:bg-white/[0.06] transition"
                  >
                    <span className="text-gray-400">
                      {h.date}
                    </span>
                    <span className="text-cyan-400 font-semibold">
                      {h.score}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}