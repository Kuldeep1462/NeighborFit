const { GoogleGenerativeAI } = require("@google/generative-ai")
const Neighborhood = require("../models/Neighborhood")
const aiPromptBuilder = require("../utils/aiPromptBuilder")

// Initialize Gemini AI with error handling
let genAI = null
try {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_actual_gemini_api_key_here") {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    console.log("✅ Gemini AI initialized successfully")
  } else {
    console.log("❌ Gemini API key not configured properly")
  }
} catch (error) {
  console.error("❌ Failed to initialize Gemini AI:", error.message)
}

const getRecommendations = async (req, res) => {
  try {
    const userData = req.body
    console.log("🔍 Received user data:", JSON.stringify(userData, null, 2))

    // Validate required fields
    if (!userData.age || !userData.gender || !userData.lifestyle || !userData.budget) {
      return res.status(400).json({
        error: "Missing required fields: age, gender, lifestyle, and budget are required",
      })
    }

    // Build MongoDB query
    const query = { isActive: true }

    // Filter by preferred cities if specified
    if (userData.preferredCities && userData.preferredCities.length > 0) {
      console.log("🏙️ Filtering by preferred cities:", userData.preferredCities)
      query.city = {
        $in: userData.preferredCities.map((city) => new RegExp(city, "i")),
      }
    }

    // Fetch neighborhoods from MongoDB
    console.log("📊 Fetching neighborhoods from MongoDB...")
    const neighborhoods = await Neighborhood.find(query).lean()

    console.log(`📋 Found ${neighborhoods.length} neighborhoods in database`)

    if (neighborhoods.length === 0) {
      return res.status(404).json({
        error: "No neighborhoods found matching your criteria. Please try different cities or contact support.",
        suggestions: [
          "Try selecting more cities",
          "Check if neighborhoods exist in our database",
          "Contact support to add your preferred locations",
        ],
      })
    }

    // Log cities found
    const citiesFound = [...new Set(neighborhoods.map((n) => n.city))]
    console.log("🏙️ Cities found in database:", citiesFound)

    let finalRecommendations = []
    let aiInsights = ""
    let source = "Rule-based"

    // Try AI first if configured
    if (genAI) {
      try {
        console.log("🤖 Attempting AI recommendation...")
        const prompt = aiPromptBuilder.buildRecommendationPrompt(userData, neighborhoods)

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })
        const result = await model.generateContent(prompt)
        const response = await result.response
        const aiResponse = response.text()

        console.log("🤖 AI Response received (first 300 chars):", aiResponse.substring(0, 300))

        // Parse AI response
        const aiRecommendations = parseAIResponse(aiResponse, neighborhoods)

        if (aiRecommendations && aiRecommendations.length > 0) {
          finalRecommendations = aiRecommendations.slice(0, 3)
          aiInsights = extractInsights(aiResponse)
          source = "AI + MongoDB"
          console.log(
            "✅ Using AI recommendations:",
            finalRecommendations.map((r) => r.name),
          )
        } else {
          console.log("⚠️ AI parsing failed, falling back to rule-based")
          throw new Error("AI parsing failed")
        }
      } catch (aiError) {
        console.error("❌ AI Error:", aiError.message)
        source = "Rule-based + MongoDB (AI failed)"
      }
    } else {
      console.log("⚠️ Gemini AI not configured, using rule-based system")
    }

    // Use rule-based system if AI failed or not configured
    if (finalRecommendations.length === 0) {
      console.log("🔧 Using enhanced rule-based recommendations...")
      const ruleBasedResults = getEnhancedRuleBasedRecommendations(userData, neighborhoods)
      finalRecommendations = ruleBasedResults.recommendations.slice(0, 3)
      aiInsights = ruleBasedResults.insights
      source = source.includes("MongoDB") ? source : "Rule-based + MongoDB"
    }

    console.log(
      "📋 Final recommendations:",
      finalRecommendations.map((r) => `${r.name} (${r.city}) - ${r.matchScore}%`),
    )

    res.json({
      recommendations: finalRecommendations,
      aiInsights,
      totalAnalyzed: neighborhoods.length,
      source,
      debug: {
        originalCount: neighborhoods.length,
        citiesFound,
        preferredCities: userData.preferredCities || [],
        aiConfigured: !!genAI,
        databaseConnected: true,
      },
    })
  } catch (error) {
    console.error("💥 Error getting recommendations:", error)
    res.status(500).json({
      error: "Unable to generate recommendations. Please try again later.",
      details: error.message,
    })
  }
}

// Enhanced rule-based recommendation system
const getEnhancedRuleBasedRecommendations = (userData, neighborhoods) => {
  console.log("🔧 Starting rule-based analysis for", neighborhoods.length, "neighborhoods")

  const scored = neighborhoods.map((neighborhood) => {
    let score = 0
    const reasons = []

    // 1. Lifestyle Preferences Matching (40% weight)
    const lifestyleMatches = userData.lifestyle.filter((pref) => {
      const prefLower = pref.toLowerCase().replace(/[^a-z]/g, "")
      return neighborhood.tags.some((tag) => {
        const tagLower = tag.toLowerCase().replace(/[^a-z]/g, "")
        return (
          tagLower.includes(prefLower) ||
          prefLower.includes(tagLower) ||
          getLifestyleMapping(prefLower).includes(tagLower)
        )
      })
    })

    const lifestyleScore = (lifestyleMatches.length / Math.max(userData.lifestyle.length, 1)) * 40
    score += lifestyleScore

    if (lifestyleMatches.length > 0) {
      reasons.push(`Matches ${lifestyleMatches.length}/${userData.lifestyle.length} lifestyle preferences`)
    }

    // 2. Budget Compatibility (25% weight)
    const budgetScore = calculateBudgetScore(userData.budget, neighborhood.rentValue)
    score += budgetScore * 25

    if (budgetScore > 0.8) {
      reasons.push("Perfect budget match")
    } else if (budgetScore > 0.5) {
      reasons.push("Good budget fit")
    }

    // 3. Age Group Preferences (15% weight)
    const ageScore = calculateAgeScore(userData.age, neighborhood.tags)
    score += ageScore * 15

    if (ageScore > 0.5) {
      reasons.push(getAgeReason(userData.age))
    }

    // 4. Family Size Compatibility (10% weight)
    const familyScore = calculateFamilyScore(userData.familySize, neighborhood.tags)
    score += familyScore * 10

    if (familyScore > 0.5) {
      reasons.push(getFamilyReason(userData.familySize))
    }

    // 5. Safety & Connectivity Bonus (10% weight)
    const infraScore = ((neighborhood.safetyScore + neighborhood.connectivity) / 20) * 10
    score += infraScore

    if (neighborhood.safetyScore >= 7) {
      reasons.push("High safety rating")
    }
    if (neighborhood.connectivity >= 8) {
      reasons.push("Excellent connectivity")
    }

    // Work location proximity bonus
    if (userData.workLocation && neighborhood.keyFeatures) {
      const workMatch = neighborhood.keyFeatures.some(
        (feature) =>
          feature.toLowerCase().includes("it") ||
          feature.toLowerCase().includes("tech") ||
          feature.toLowerCase().includes("corporate"),
      )
      if (workMatch) {
        score += 5
        reasons.push("Good for professionals")
      }
    }

    return {
      ...neighborhood,
      matchScore: Math.min(Math.round(score), 100),
      reasons: reasons.slice(0, 3),
    }
  })

  // Sort by score and ensure variety
  const sortedRecommendations = scored.sort((a, b) => b.matchScore - a.matchScore).filter((rec) => rec.matchScore > 15) // Only include reasonable matches

  console.log(
    "🏆 Top scored neighborhoods:",
    sortedRecommendations.slice(0, 5).map((r) => `${r.name} (${r.city}): ${r.matchScore}%`),
  )

  // Ensure city diversity
  const diverseRecommendations = ensureCityDiversity(sortedRecommendations)
  const insights = generateInsights(userData, diverseRecommendations.slice(0, 3))

  return {
    recommendations: diverseRecommendations,
    insights,
  }
}

// Helper functions (same as before but updated for MongoDB data)
const getLifestyleMapping = (lifestyle) => {
  const mappings = {
    calmpeaceful: ["calm", "familyfriendly"],
    livelyvibrant: ["lively", "nightlife"],
    ecofriendly: ["ecofriendly", "calm"],
    walkable: ["walkable", "transport"],
    budgetfriendly: ["budgetfriendly"],
    premium: ["expensive"],
    nightlife: ["nightlife", "lively"],
    familyfriendly: ["familyfriendly", "calm"],
    techhub: ["techhub"],
    cultural: ["cultural"],
    shopping: ["shopping"],
    wellconnected: ["transport"],
  }
  return mappings[lifestyle] || [lifestyle]
}

const calculateBudgetScore = (budgetRange, rentValue) => {
  const ranges = {
    "Under 15000": [0, 15000],
    "15000-25000": [15000, 25000],
    "25000-40000": [25000, 40000],
    "40000-60000": [40000, 60000],
    "60000+": [60000, 100000],
  }

  const [min, max] = ranges[budgetRange] || [0, 100000]

  if (rentValue >= min && rentValue <= max) return 1.0
  if (rentValue < min) return Math.max(0, 1 - ((min - rentValue) / min) * 0.5)
  if (rentValue > max) return Math.max(0, 1 - ((rentValue - max) / max) * 0.5)
  return 0
}

const calculateAgeScore = (ageGroup, tags) => {
  const preferences = {
    "18-25": ["lively", "nightlife", "tech-hub"],
    "26-35": ["tech-hub", "lively", "shopping"],
    "36-45": ["family-friendly", "calm", "cultural"],
    "46-55": ["family-friendly", "calm", "cultural"],
    "55+": ["calm", "cultural", "family-friendly"],
  }

  const agePrefs = preferences[ageGroup] || []
  const matches = tags.filter((tag) => agePrefs.includes(tag))
  return matches.length / Math.max(agePrefs.length, 1)
}

const calculateFamilyScore = (familySize, tags) => {
  if (familySize === "Single") {
    return tags.includes("lively") ? 0.8 : 0.5
  } else if (familySize.includes("Family")) {
    return tags.includes("family-friendly") ? 1.0 : 0.3
  } else if (familySize === "Couple") {
    return tags.includes("lively") || tags.includes("cultural") ? 0.7 : 0.5
  }
  return 0.5
}

const getAgeReason = (ageGroup) => {
  if (ageGroup === "18-25") return "Great for young professionals"
  if (ageGroup === "26-35") return "Perfect for career growth"
  if (ageGroup.includes("45") || ageGroup.includes("55")) return "Excellent for families"
  return "Suitable for your age group"
}

const getFamilyReason = (familySize) => {
  if (familySize.includes("Family")) return "Family-friendly amenities"
  if (familySize === "Single") return "Great for singles"
  if (familySize === "Couple") return "Perfect for couples"
  return "Suitable for your family size"
}

const ensureCityDiversity = (recommendations) => {
  const diverse = []
  const citiesUsed = new Set()

  // First pass: one from each city
  for (const rec of recommendations) {
    if (!citiesUsed.has(rec.city) && diverse.length < 3) {
      diverse.push(rec)
      citiesUsed.add(rec.city)
    }
  }

  // Second pass: fill remaining slots with highest scores
  for (const rec of recommendations) {
    if (diverse.length >= 3) break
    if (!diverse.includes(rec)) {
      diverse.push(rec)
    }
  }

  return diverse
}

const generateInsights = (userData, recommendations) => {
  const insights = []

  if (recommendations.length > 0) {
    const avgScore = recommendations.reduce((sum, rec) => sum + rec.matchScore, 0) / recommendations.length
    insights.push(
      `Found ${recommendations.length} excellent matches with average compatibility of ${Math.round(avgScore)}%.`,
    )

    const cities = [...new Set(recommendations.map((r) => r.city))]
    insights.push(`Recommendations span across ${cities.join(", ")} based on your preferences.`)

    if (userData.preferredCities && userData.preferredCities.length > 0) {
      insights.push(`Filtered specifically for your preferred cities: ${userData.preferredCities.join(", ")}.`)
    }
  }

  return insights.join(" ")
}

const parseAIResponse = (aiResponse, neighborhoods) => {
  try {
    console.log("🔍 Parsing AI response...")

    // Extract neighborhood names mentioned in the response
    const mentionedNeighborhoods = []

    neighborhoods.forEach((neighborhood) => {
      if (aiResponse.toLowerCase().includes(neighborhood.name.toLowerCase())) {
        mentionedNeighborhoods.push(neighborhood)
      }
    })

    console.log(
      "🎯 AI mentioned neighborhoods:",
      mentionedNeighborhoods.map((n) => n.name),
    )

    if (mentionedNeighborhoods.length >= 3) {
      return mentionedNeighborhoods.slice(0, 3).map((n, index) => ({
        ...n,
        matchScore: 95 - index * 5,
        reasons: ["AI-recommended based on your profile", "Strong compatibility match", "Meets your key requirements"],
      }))
    }

    return []
  } catch (error) {
    console.error("❌ Error parsing AI response:", error)
    return []
  }
}

const extractInsights = (aiResponse) => {
  const sentences = aiResponse.split(/[.!?]/).filter((s) => s.trim().length > 20)
  return sentences.slice(0, 2).join(". ").trim() + "."
}

// Get all neighborhoods from MongoDB
const getAllNeighborhoods = async (req, res) => {
  try {
    const neighborhoods = await Neighborhood.find({ isActive: true }).lean()
    const cities = [...new Set(neighborhoods.map((n) => n.city))].sort()

    res.json({
      neighborhoods,
      total: neighborhoods.length,
      cities,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching neighborhoods:", error)
    res.status(500).json({
      error: "Failed to fetch neighborhoods",
      details: error.message,
    })
  }
}

// Add new neighborhood
const addNeighborhood = async (req, res) => {
  try {
    const neighborhoodData = req.body

    // Calculate rentValue from avgRent string
    if (neighborhoodData.avgRent && !neighborhoodData.rentValue) {
      neighborhoodData.rentValue = Number.parseInt(neighborhoodData.avgRent.replace(/[₹,]/g, ""))
    }

    const neighborhood = new Neighborhood(neighborhoodData)
    await neighborhood.save()

    console.log(`✅ Added new neighborhood: ${neighborhood.name} in ${neighborhood.city}`)

    res.status(201).json({
      message: "Neighborhood added successfully",
      neighborhood,
      success: true,
    })
  } catch (error) {
    console.error("Error adding neighborhood:", error)
    res.status(400).json({
      error: "Failed to add neighborhood",
      details: error.message,
    })
  }
}

// Update neighborhood
const updateNeighborhood = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    // Update rentValue if avgRent is changed
    if (updateData.avgRent) {
      updateData.rentValue = Number.parseInt(updateData.avgRent.replace(/[₹,]/g, ""))
    }

    const neighborhood = await Neighborhood.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

    if (!neighborhood) {
      return res.status(404).json({ error: "Neighborhood not found" })
    }

    console.log(`✅ Updated neighborhood: ${neighborhood.name}`)

    res.json({
      message: "Neighborhood updated successfully",
      neighborhood,
      success: true,
    })
  } catch (error) {
    console.error("Error updating neighborhood:", error)
    res.status(400).json({
      error: "Failed to update neighborhood",
      details: error.message,
    })
  }
}

// Delete neighborhood
const deleteNeighborhood = async (req, res) => {
  try {
    const { id } = req.params

    const neighborhood = await Neighborhood.findByIdAndUpdate(id, { isActive: false }, { new: true })

    if (!neighborhood) {
      return res.status(404).json({ error: "Neighborhood not found" })
    }

    console.log(`🗑️ Deactivated neighborhood: ${neighborhood.name}`)

    res.json({
      message: "Neighborhood deactivated successfully",
      success: true,
    })
  } catch (error) {
    console.error("Error deleting neighborhood:", error)
    res.status(400).json({
      error: "Failed to delete neighborhood",
      details: error.message,
    })
  }
}

module.exports = {
  getRecommendations,
  getAllNeighborhoods,
  addNeighborhood,
  updateNeighborhood,
  deleteNeighborhood,
}
