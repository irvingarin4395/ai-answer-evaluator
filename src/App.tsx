import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AIEvaluator from "./pages/AIEvaluator"
import History from "./pages/History"
import Settings from "./pages/Settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-tool" element={<AIEvaluator />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App