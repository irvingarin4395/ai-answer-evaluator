import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import fs from "fs-extra"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const DB_PATH = "./db.json"

// 🧠 Helper: read DB
async function readDB() {
  const data = await fs.readJson(DB_PATH)
  return data
}

// 🧠 Helper: write DB
async function writeDB(data) {
  await fs.writeJson(DB_PATH, data, { spaces: 2 })
}

app.post("/evaluate", async (req, res) => {
    try {
        const { question, answer } = req.body

        const newResult = {
        id: Date.now(), // simple unique id
        question,
        answer,
        score: Math.floor(Math.random() * 40) + 60,
        feedback:
            "Good understanding, but the explanation can be more detailed.",
        suggested:
            "Add real-world examples to strengthen the answer.",
        date: new Date().toLocaleTimeString(),
        }

        const db = await readDB()

        db.history = [newResult, ...db.history].slice(0, 20)

        await writeDB(db)

        res.json(newResult)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to evaluate" })
    }
})

app.get("/history", async (req, res) => {
  const db = await readDB()
  res.json(db.history)
})

// 👉 Get recent
app.get("/recent", async (req, res) => {
  const db = await readDB()
  res.json(db.history.slice(0, 5))
})

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001")
})