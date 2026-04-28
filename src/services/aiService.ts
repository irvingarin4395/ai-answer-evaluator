const API_BASE = import.meta.env.VITE_API_BASE_URL

export interface EvaluationResult {
  score: number
  feedback: string
  suggested: string
}

export async function evaluateAnswer(
  question: string,
  answer: string
): Promise<EvaluationResult> {
  const res = await fetch(`${API_BASE}/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, answer }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed: ${res.status} - ${text}`)
  }

  return res.json()
}

export async function getHistory() {
  const res = await fetch(`${API_BASE}/history`)
  return res.json()
}