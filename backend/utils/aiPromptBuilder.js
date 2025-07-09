const buildRecommendationPrompt = (userData, neighborhoods) => {
  const prompt = `You are a neighborhood recommendation expert for India. 

USER PROFILE:
- Age: ${userData.age}
- Gender: ${userData.gender}
- Family: ${userData.familySize}
- Budget: ${userData.budget}
- Lifestyle: ${userData.lifestyle.join(", ")}
- Preferred Cities: ${userData.preferredCities?.join(", ") || "Any city"}
- Work Location: ${userData.workLocation || "Not specified"}
- Priorities: ${userData.priorities?.join(", ") || "General"}

AVAILABLE NEIGHBORHOODS:
${neighborhoods
  .map(
    (n, i) =>
      `${i + 1}. ${n.name} in ${n.city}
     - Rent: ${n.avgRent}
     - Tags: ${n.tags.join(", ")}
     - Safety: ${n.safetyScore}/10, Connectivity: ${n.connectivity}/10`,
  )
  .join("\n")}

Please recommend the TOP 3 neighborhoods that best match this user's profile. Consider their lifestyle preferences, budget, age, family size, and preferred cities.

For each recommendation, explain why it's a good match for this specific user.

Respond in this format:
1. [Neighborhood Name] - [Why it matches the user]
2. [Neighborhood Name] - [Why it matches the user]  
3. [Neighborhood Name] - [Why it matches the user]

Then provide additional insights about the user's preferences and the local market.`

  return prompt
}

module.exports = {
  buildRecommendationPrompt,
}
