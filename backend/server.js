require("dotenv").config();
const express = require("express");
const cors = require('cors')
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const sessionRoutes = require("./routes/sessionRoutes")
const questionRoutes = require("./routes/questionRoutes")
const { protect } = require("./middleware/authMiddleware")
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController")

const app = express()

//Middleware to handle cors
app.use(cors({
  origin: ["https://intervue-ai-phi.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow POST
  allowedHeaders: ["Content-Type", "Authorization"],
}));

connectDB()

// Middleware
app.use(express.json())

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/questions", questionRoutes)
app.use("/api/sessions", sessionRoutes)

app.use("/api/ai/generate-question", protect, generateInterviewQuestions)
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation)



//Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})