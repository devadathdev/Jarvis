const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Jarvis backend running");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer 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",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "mistralai/mistral-7b-instruct",
    messages: [{ role: "user", content: message }]
  })
});

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running"));