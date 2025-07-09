const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...")

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    console.log(`📊 Database: ${conn.connection.name}`)

    // Log collection info
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(`📁 Collections: ${collections.map((c) => c.name).join(", ")}`)
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message)
    process.exit(1)
  }
}

module.exports = connectDB
