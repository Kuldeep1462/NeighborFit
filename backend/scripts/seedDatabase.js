const mongoose = require("mongoose")
const Neighborhood = require("../models/neighborhood")
require("dotenv").config()

const sampleNeighborhoods = [
  // Delhi & NCR
  {
    name: "Connaught Place",
    location: "Delhi, Delhi",
    city: "Delhi",
    state: "Delhi",
    tags: ["cultural", "shopping", "transport", "expensive", "lively"],
    description: "The heart of Delhi with colonial architecture, shopping, dining, and business centers.",
    avgRent: "₹60,000",
    rentValue: 60000,
    safetyScore: 6,
    connectivity: 9,
    keyFeatures: ["Metro connectivity", "Shopping hub", "Business district", "Historical significance"],
    amenities: ["Metro stations", "Shopping malls", "Restaurants", "Banks", "Hospitals"],
    nearbyPlaces: [
      { name: "Rajiv Chowk Metro", type: "transport", distance: "0.2 km" },
      { name: "Palika Bazaar", type: "shopping", distance: "0.1 km" },
      { name: "All India Institute of Medical Sciences", type: "hospital", distance: "5 km" },
    ],
  },
  {
    name: "Hauz Khas",
    location: "Delhi, Delhi",
    city: "Delhi",
    state: "Delhi",
    tags: ["cultural", "nightlife", "lively", "expensive", "walkable"],
    description: "A trendy area combining historical charm with modern cafes, art galleries, and vibrant nightlife.",
    avgRent: "₹50,000",
    rentValue: 50000,
    safetyScore: 6,
    connectivity: 7,
    keyFeatures: ["Art galleries", "Nightlife", "Historical sites", "Cafes & restaurants"],
    amenities: ["Art galleries", "Cafes", "Pubs", "Historical monuments", "Parks"],
    nearbyPlaces: [
      { name: "Hauz Khas Metro", type: "transport", distance: "0.5 km" },
      { name: "Deer Park", type: "recreation", distance: "0.3 km" },
      { name: "IIT Delhi", type: "education", distance: "2 km" },
    ],
  },
  {
    name: "Lajpat Nagar",
    location: "Delhi, Delhi",
    city: "Delhi",
    state: "Delhi",
    tags: ["budget-friendly", "shopping", "transport", "cultural", "lively"],
    description: "Famous for its markets, affordable living, and good connectivity to other parts of Delhi.",
    avgRent: "₹18,000",
    rentValue: 18000,
    safetyScore: 6,
    connectivity: 8,
    keyFeatures: ["Affordable housing", "Shopping markets", "Good transport", "Cultural diversity"],
    amenities: ["Markets", "Metro station", "Restaurants", "Schools", "Hospitals"],
    nearbyPlaces: [
      { name: "Lajpat Nagar Metro", type: "transport", distance: "0.2 km" },
      { name: "Central Market", type: "shopping", distance: "0.1 km" },
      { name: "Moolchand Hospital", type: "hospital", distance: "1 km" },
    ],
  },

  // Mumbai
  {
    name: "Bandra West",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    tags: ["lively", "nightlife", "expensive", "cultural", "shopping"],
    description: "The entertainment capital of Mumbai with upscale restaurants, bars, and celebrity homes.",
    avgRent: "₹75,000",
    rentValue: 75000,
    safetyScore: 7,
    connectivity: 8,
    keyFeatures: ["Celebrity area", "Upscale dining", "Beach proximity", "Entertainment industry"],
    amenities: ["Beaches", "Upscale restaurants", "Shopping malls", "Gyms", "Spas"],
    nearbyPlaces: [
      { name: "Bandra Railway Station", type: "transport", distance: "1 km" },
      { name: "Bandstand Promenade", type: "recreation", distance: "0.5 km" },
      { name: "Lilavati Hospital", type: "hospital", distance: "2 km" },
    ],
  },
  {
    name: "Andheri West",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    tags: ["transport", "lively", "shopping", "nightlife", "expensive"],
    description: "Well-connected suburb with excellent transport links, shopping centers, and dining options.",
    avgRent: "₹45,000",
    rentValue: 45000,
    safetyScore: 7,
    connectivity: 9,
    keyFeatures: ["Airport proximity", "Metro connectivity", "IT hub", "Shopping centers"],
    amenities: ["Metro stations", "Shopping malls", "IT offices", "Restaurants", "Gyms"],
    nearbyPlaces: [
      { name: "Chhatrapati Shivaji Airport", type: "transport", distance: "3 km" },
      { name: "Infinity Mall", type: "shopping", distance: "1 km" },
      { name: "Kokilaben Hospital", type: "hospital", distance: "2 km" },
    ],
  },

  // Bengaluru
  {
    name: "Koramangala",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    state: "Karnataka",
    tags: ["tech-hub", "lively", "shopping", "expensive", "nightlife"],
    description: "The startup hub of Bengaluru with numerous co-working spaces, restaurants, and shopping centers.",
    avgRent: "₹40,000",
    rentValue: 40000,
    safetyScore: 8,
    connectivity: 7,
    keyFeatures: ["Startup ecosystem", "Co-working spaces", "Restaurants", "Shopping"],
    amenities: ["Co-working spaces", "Restaurants", "Pubs", "Shopping complexes", "Gyms"],
    nearbyPlaces: [
      { name: "Forum Mall", type: "shopping", distance: "1 km" },
      { name: "Manipal Hospital", type: "hospital", distance: "2 km" },
      { name: "Jyoti Nivas College", type: "education", distance: "1.5 km" },
    ],
  },
  {
    name: "Indiranagar",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    state: "Karnataka",
    tags: ["lively", "nightlife", "walkable", "expensive", "tech-hub"],
    description:
      "A vibrant neighborhood known for its bustling nightlife, trendy cafes, and proximity to tech companies.",
    avgRent: "₹45,000",
    rentValue: 45000,
    safetyScore: 7,
    connectivity: 8,
    keyFeatures: ["Nightlife", "Trendy cafes", "Tech proximity", "Walkable streets"],
    amenities: ["Cafes", "Pubs", "Restaurants", "Metro station", "Parks"],
    nearbyPlaces: [
      { name: "Indiranagar Metro", type: "transport", distance: "0.5 km" },
      { name: "100 Feet Road", type: "shopping", distance: "0.2 km" },
      { name: "Sakra Hospital", type: "hospital", distance: "3 km" },
    ],
  },

  // Punjab - Chandigarh
  {
    name: "Sector 17",
    location: "Chandigarh, Punjab",
    city: "Chandigarh",
    state: "Punjab",
    tags: ["cultural", "shopping", "transport", "family-friendly", "walkable"],
    description: "The commercial heart of Chandigarh with shopping plazas, restaurants, and cultural centers.",
    avgRent: "₹25,000",
    rentValue: 25000,
    safetyScore: 8,
    connectivity: 9,
    keyFeatures: ["City center", "Shopping plazas", "Cultural venues", "Planned city"],
    amenities: ["Shopping plazas", "Restaurants", "Banks", "Government offices", "Parks"],
    nearbyPlaces: [
      { name: "Sector 17 Plaza", type: "shopping", distance: "0.1 km" },
      { name: "Government Museum", type: "cultural", distance: "0.5 km" },
      { name: "PGI Hospital", type: "hospital", distance: "3 km" },
    ],
  },
  {
    name: "Sector 22",
    location: "Chandigarh, Punjab",
    city: "Chandigarh",
    state: "Punjab",
    tags: ["family-friendly", "calm", "budget-friendly", "walkable"],
    description: "Peaceful residential sector with parks, schools, and family amenities.",
    avgRent: "₹20,000",
    rentValue: 20000,
    safetyScore: 9,
    connectivity: 8,
    keyFeatures: ["Residential area", "Parks", "Schools", "Peaceful environment"],
    amenities: ["Parks", "Schools", "Markets", "Community centers", "Playgrounds"],
    nearbyPlaces: [
      { name: "Sector 22 Market", type: "shopping", distance: "0.2 km" },
      { name: "Government High School", type: "education", distance: "0.3 km" },
      { name: "Sector 16 Stadium", type: "recreation", distance: "1 km" },
    ],
  },

  // Punjab - Ludhiana
  {
    name: "Model Town",
    location: "Ludhiana, Punjab",
    city: "Ludhiana",
    state: "Punjab",
    tags: ["family-friendly", "calm", "budget-friendly", "cultural"],
    description: "A well-planned residential area in Ludhiana known for its peaceful environment and family amenities.",
    avgRent: "₹15,000",
    rentValue: 15000,
    safetyScore: 8,
    connectivity: 7,
    keyFeatures: ["Residential area", "Family-friendly", "Peaceful", "Good schools"],
    amenities: ["Schools", "Parks", "Markets", "Temples", "Community halls"],
    nearbyPlaces: [
      { name: "Model Town Market", type: "shopping", distance: "0.3 km" },
      { name: "DAV School", type: "education", distance: "0.5 km" },
      { name: "Civil Hospital", type: "hospital", distance: "2 km" },
    ],
  },

  // Punjab - Amritsar
  {
    name: "Lawrence Road",
    location: "Amritsar, Punjab",
    city: "Amritsar",
    state: "Punjab",
    tags: ["cultural", "shopping", "budget-friendly", "lively"],
    description:
      "A bustling commercial area near the Golden Temple with shops, restaurants, and cultural significance.",
    avgRent: "₹12,000",
    rentValue: 12000,
    safetyScore: 7,
    connectivity: 8,
    keyFeatures: ["Golden Temple proximity", "Commercial hub", "Cultural significance", "Shopping"],
    amenities: ["Markets", "Restaurants", "Hotels", "Banks", "Cultural sites"],
    nearbyPlaces: [
      { name: "Golden Temple", type: "cultural", distance: "1 km" },
      { name: "Hall Bazaar", type: "shopping", distance: "0.5 km" },
      { name: "Government Hospital", type: "hospital", distance: "1.5 km" },
    ],
  },
  
    // Punjab - Jalandhar
  {
    "name": "Model Town",
    "location": "Jalandhar, Punjab",
    "city": "Jalandhar",
    "state": "Punjab",
    "tags": ["family-friendly", "budget-friendly", "calm", "walkable", "planned"],
    "description": "A well-planned and highly sought-after residential area known for its tree-lined streets, numerous parks, and family-oriented facilities. It offers a peaceful living environment with good access to amenities.",
    "avgRent": "₹16,000 - ₹25,000",
    "rentValue": 20500,
    "safetyScore": 8,
    "connectivity": 7,
    "keyFeatures": ["Planned layout", "Multiple parks", "Family facilities", "Walkable streets", "Reputable schools"],
    "amenities": ["Parks", "Local markets", "Restaurants & cafes", "Boutique shops", "Schools", "Hospitals nearby"],
    "nearbyPlaces": [
      { "name": "Model Town Market", "type": "shopping", "distance": "0.1 km" },
      { "name": "Namdev Chowk (City Centre)", "type": "transport", "distance": "3 km" },
      { "name": "New Ruby Hospital", "type": "hospital", "distance": "1.5 km" }
    ],
  },
  {
    "name": "Jalandhar Cantt (Cantonment)",
    "location": "Jalandhar, Punjab",
    "city": "Jalandhar",
    "state": "Punjab",
    "tags": ["family-friendly", "calm", "well-maintained", "green", "safe"],
    "description": "A highly disciplined and verdant area managed by the military, offering a very calm, secure, and clean environment. It's characterized by wide roads, abundant green spaces, and a quiet residential atmosphere.",
    "avgRent": "₹15,000 - ₹28,000",
    "rentValue": 21500,
    "safetyScore": 9,
    "connectivity": 7,
    "keyFeatures": ["Planned area", "Extensive greenery", "High security", "Good schools (Army Public School)", "Spacious layouts"],
    "amenities": ["Parks (Jawahar Park)", "Sports facilities", "Local shops", "Military hospital", "Cantonment Board services"],
    "nearbyPlaces": [
      { "name": "Jalandhar Cantt Railway Station", "type": "transport", "distance": "2 km" },
      { "name": "Jawahar Park", "type": "recreation", "distance": "0.5 km" },
      { "name": "Command Hospital", "type": "hospital", "distance": "1 km" }
    ],
  },
  {
    "name": "Urban Estate (Phase I & II)",
    "location": "Jalandhar, Punjab",
    "city": "Jalandhar",
    "state": "Punjab",
    "tags": ["family-friendly", "planned", "premium-options", "well-connected", "residential"],
    "description": "A large and well-developed residential township known for its modern infrastructure, wide roads, and a mix of independent houses and modern residential complexes. It offers a comfortable and upscale living experience.",
    "avgRent": "₹18,000 - ₹40,000",
    "rentValue": 29000,
    "safetyScore": 8,
    "connectivity": 7,
    "keyFeatures": ["Planned layout", "Modern infrastructure", "Proximity to malls", "Good schools nearby", "Variety of housing"],
    "amenities": ["Shopping centers", "Restaurants", "Cafes", "Parks", "Hospitals nearby", "Banks"],
    "nearbyPlaces": [
      { "name": "PPR Mall", "type": "shopping", "distance": "2 km" },
      { "name": "Urban Estate Phase II Park", "type": "recreation", "distance": "0.5 km" },
      { "name": "New Ruby Hospital", "type": "hospital", "distance": "3 km" }
    ],
  },
  {
    "name": "Rama Mandi",
    "location": "Jalandhar, Punjab",
    "city": "Jalandhar",
    "state": "Punjab",
    "tags": ["budget-friendly", "developing", "well-connected", "daily-needs-accessible"],
    "description": "A rapidly developing residential and commercial area situated along the Grand Trunk Road. It offers highly affordable living options and excellent connectivity to major parts of the city and beyond, suitable for those on a budget.",
    "avgRent": "₹9,000 - ₹16,000",
    "rentValue": 12500,
    "safetyScore": 7,
    "connectivity": 8,
    "keyFeatures": ["Affordable housing", "GT Road connectivity", "Local markets", "Developing infrastructure", "Mix of old & new"],
    "amenities": ["Local markets", "Shops", "Restaurants", "Banks", "Bus stops"],
    "nearbyPlaces": [
      { "name": "Rama Mandi Chowk", "type": "transport", "distance": "0.3 km" },
      { "name": "Reliance Mall", "type": "shopping", "distance": "4 km" },
      { "name": "Primary Health Centre", "type": "hospital", "distance": "1 km" }
    ],
  },
  {
    "name": "Adarsh Nagar",
    "location": "Jalandhar, Punjab",
    "city": "Jalandhar",
    "state": "Punjab",
    "tags": ["family-friendly", "established", "walkable", "mid-range-budget", "community"],
    "description": "A well-established and vibrant residential locality known for its strong community atmosphere. It offers a comfortable living environment with easy access to schools, local markets, and parks.",
    "avgRent": "₹10,000 - ₹20,000",
    "rentValue": 15000,
    "safetyScore": 7,
    "connectivity": 7,
    "keyFeatures": ["Local markets", "Adarsh Nagar Park", "Good schools (MGN Public School)", "Walkable for daily needs", "Strong community"],
    "amenities": ["Parks", "Local shops", "Restaurants", "Schools", "Hospitals nearby", "Religious places"],
    "nearbyPlaces": [
      { "name": "Adarsh Nagar Market", "type": "shopping", "distance": "0.1 km" },
      { "name": "Jyoti Chowk (City Centre)", "type": "transport", "distance": "2.5 km" },
      { "name": "Kidney Hospital", "type": "hospital", "distance": "1 km" }
    ],
  },
  {
    "name": "Central Town / Civil Lines",
    "location": "Jalandhar, Punjab",
    "city": "Jalandhar",
    "state": "Punjab",
    "tags": ["central", "well-connected", "commercial-residential-mix", "lively", "historical"],
    "description": "Among the oldest and most central areas of Jalandhar, offering unparalleled connectivity and a dynamic mix of residential properties, commercial establishments, and historical sites. It's a bustling hub with amenities at arm's reach.",
    "avgRent": "₹15,000 - ₹30,000",
    "rentValue": 22500,
    "safetyScore": 6,
    "connectivity": 9,
    "keyFeatures": ["Central location", "Excellent connectivity (Bus Stand, Railway Station)", "Historical significance", "Shopping districts", "Diverse dining"],
    "amenities": ["Nehru Garden", "Shopping complexes", "Restaurants", "Banks", "Hospitals", "Railway Station", "Bus Stand"],
    "nearbyPlaces": [
      { "name": "Jalandhar City Railway Station", "type": "transport", "distance": "0.5 km" },
      { "name": "Nehru Garden", "type": "recreation", "distance": "0.2 km" },
      { "name": "Civil Hospital", "type": "hospital", "distance": "1 km" }
    ],
  }
]
const seedDatabase = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Connected to MongoDB")

    // Clear existing data
    console.log("🧹 Clearing existing neighborhoods...")
    await Neighborhood.deleteMany({})

    // Insert sample data
    console.log("📊 Inserting sample neighborhoods...")
    const result = await Neighborhood.insertMany(sampleNeighborhoods)

    console.log(`✅ Successfully inserted ${result.length} neighborhoods`)

    // Log summary
    const cities = [...new Set(result.map((n) => n.city))]
    console.log(`🏙️ Cities added: ${cities.join(", ")}`)

    const totalNeighborhoods = await Neighborhood.countDocuments()
    console.log(`📊 Total neighborhoods in database: ${totalNeighborhoods}`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase()
}

module.exports = seedDatabase
