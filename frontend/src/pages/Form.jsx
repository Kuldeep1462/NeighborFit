"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../styles/form.css"

const Form = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    lifestyle: [],
    budget: "",
    preferredCities: [],
    workLocation: "",
    familySize: "",
    priorities: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const lifestyleOptions = [
    "Calm & Peaceful",
    "Lively & Vibrant",
    "Eco-Friendly",
    "Walkable",
    "Budget-Friendly",
    "Premium",
    "Nightlife",
    "Family-Friendly",
    "Tech Hub",
    "Cultural",
    "Shopping",
    "Well-Connected",
  ]

  const cityOptions = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Chandigarh",
    "Ludhiana",
    "Amritsar",
    "Jalandhar",
    "Gurgaon",
    "Noida",
    "Pune",
  ]

  const priorityOptions = [
    "Low Crime Rate",
    "Good Schools",
    "Healthcare Facilities",
    "Public Transport",
    "Parks & Recreation",
    "Shopping Centers",
    "Restaurants & Cafes",
    "Gym & Fitness",
    "Religious Places",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Debug: Log form data
    console.log("Submitting form data:", formData)

    try {
      const rawBackendUrl = process.env.REACT_APP_API_URL || "https://neighborfit-wiom.onrender.com";
      const backendUrl = rawBackendUrl.replace(/\/$/, ""); // remove trailing slash if present
      const response = await axios.post(`${backendUrl}/api/recommend`, formData)

      console.log("API Response:", response.data)

      // Store results in sessionStorage and navigate to results page
      sessionStorage.setItem("neighborhoodResults", JSON.stringify(response.data))
      navigate("/results")
    } catch (err) {
      console.error("API Error:", err)
      setError(err.response?.data?.error || "Failed to get recommendations. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <h1 className="form-title">Find Your Perfect Neighborhood</h1>
          <p className="form-subtitle">
            Tell us about yourself and your preferences, and we'll use AI to recommend the best neighborhoods for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="neighborhood-form">
          {/* Personal Information */}
          <div className="form-section">
            <h2 className="section-title">Personal Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Age</label>
                <select name="age" value={formData.age} onChange={handleInputChange} className="form-select" required>
                  <option value="">Select Age Range</option>
                  <option value="18-25">18-25 years</option>
                  <option value="26-35">26-35 years</option>
                  <option value="36-45">36-45 years</option>
                  <option value="46-55">46-55 years</option>
                  <option value="55+">55+ years</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Family Size</label>
                <select
                  name="familySize"
                  value={formData.familySize}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Family Size</option>
                  <option value="Single">Single</option>
                  <option value="Couple">Couple</option>
                  <option value="Small Family (3-4)">Small Family (3-4)</option>
                  <option value="Large Family (5+)">Large Family (5+)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Monthly Budget (₹)</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Budget Range</option>
                  <option value="Under 15000">Under ₹15,000</option>
                  <option value="15000-25000">₹15,000 - ₹25,000</option>
                  <option value="25000-40000">₹25,000 - ₹40,000</option>
                  <option value="40000-60000">₹40,000 - ₹60,000</option>
                  <option value="60000+">₹60,000+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lifestyle Preferences */}
          <div className="form-section">
            <h2 className="section-title">Lifestyle Preferences</h2>
            <p className="section-description">Select all that apply to your ideal lifestyle:</p>

            <div className="checkbox-grid">
              {lifestyleOptions.map((option) => (
                <label key={option} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.lifestyle.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, "lifestyle")}
                    className="checkbox-input"
                  />
                  <span className="checkbox-label">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Preferences */}
          <div className="form-section">
            <h2 className="section-title">Location Preferences</h2>

            <div className="form-group">
              <label className="form-label">Work Location (Optional)</label>
              <input
                type="text"
                name="workLocation"
                value={formData.workLocation}
                onChange={handleInputChange}
                placeholder="e.g., Cyber City Gurgaon, BKC Mumbai"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Cities</label>
              <p className="field-description">Select cities you're interested in:</p>
              <div className="checkbox-grid">
                {cityOptions.map((city) => (
                  <label key={city} className="checkbox-item">
                    <input
                      type="checkbox"
                      value={city}
                      checked={formData.preferredCities.includes(city)}
                      onChange={(e) => handleCheckboxChange(e, "preferredCities")}
                      className="checkbox-input"
                    />
                    <span className="checkbox-label">{city}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Priorities */}
          <div className="form-section">
            <h2 className="section-title">What's Most Important to You?</h2>
            <p className="section-description">Select your top priorities:</p>

            <div className="checkbox-grid">
              {priorityOptions.map((priority) => (
                <label key={priority} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={priority}
                    checked={formData.priorities.includes(priority)}
                    onChange={(e) => handleCheckboxChange(e, "priorities")}
                    className="checkbox-input"
                  />
                  <span className="checkbox-label">{priority}</span>
                </label>
              ))}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Getting AI Recommendations..." : "Get My Recommendations"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
