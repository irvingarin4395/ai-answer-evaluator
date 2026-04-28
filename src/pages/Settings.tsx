import { Link } from "react-router-dom"
import { useState } from "react"

export default function Settings() {
  const [strictness, setStrictness] = useState("balanced")
  const [showFeedback, setShowFeedback] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white/[0.02] backdrop-blur-xl border-r border-white/10 p-6 hidden md:flex flex-col">

        <h2 className="text-lg font-semibold tracking-tight mb-10">
          AI Evaluator
        </h2>

        <nav className="space-y-2 text-sm">

          <Link to="/ai-tool"
            className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
            Dashboard
          </Link>

          <Link to="/history"
            className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
            History
          </Link>

          <Link to="/settings"
            className="block px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
            Settings
          </Link>

        </nav>

        <div className="mt-auto text-xs text-gray-500">
          SaaS Demo UI
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-12 max-w-4xl mx-auto w-full space-y-10">

        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-400 mt-2">
            Configure evaluation behavior and preferences
          </p>
        </div>

        {/* SETTINGS GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* MODEL SETTINGS */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="font-semibold mb-4">Evaluation Settings</h2>

            <label className="text-sm text-gray-400">
              Strictness Level
            </label>

            <select
              value={strictness}
              onChange={(e) => setStrictness(e.target.value)}
              className="w-full mt-2 p-3 bg-slate-900 border border-slate-700 rounded-lg"
            >
              <option value="lenient">Lenient</option>
              <option value="balanced">Balanced</option>
              <option value="strict">Strict</option>
            </select>
          </div>

          {/* DISPLAY SETTINGS */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="font-semibold mb-4">Display Settings</h2>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={showFeedback}
                onChange={() => setShowFeedback(!showFeedback)}
              />
              <span className="text-sm text-gray-300">
                Show detailed feedback
              </span>
            </label>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="font-semibold mb-4">Actions</h2>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
            onClick={() => {
              localStorage.clear()
              alert("Local settings cleared")
            }}
          >
            Reset Local Data
          </button>
        </div>

      </main>
    </div>
  )
}