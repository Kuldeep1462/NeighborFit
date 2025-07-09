const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

const connectDB = require("./config/database")
const recommendRoutes = require("./routes/recommend")
const contactRoute = require('./routes/contact')

const app = express()
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api', recommendRoutes)
app.use('/api/contact', contactRoute)

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    const mongoose = require("mongoose")
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"

    res.status(200).json({
      status: "OK",
      message: "NeighborFit+ API is running",
      timestamp: new Date().toISOString(),
      database: dbStatus,
      geminiConfigured: !!process.env.GEMINI_API_KEY,
    })
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack)
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`🚀 NeighborFit+ API server running on port ${PORT}`)
  console.log(`📍 Health check: http://localhost:${PORT}/health`)
  console.log(`🤖 Gemini AI: ${process.env.GEMINI_API_KEY ? "Configured" : "Not configured"}`)
  console.log(`🗄️ MongoDB: ${process.env.MONGODB_URI ? "Configured" : "Not configured"}`)
})
