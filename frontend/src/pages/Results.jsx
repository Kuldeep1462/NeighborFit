"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/results.css"

const Results = () => {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResults = sessionStorage.getItem("neighborhoodResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="results-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your recommendations...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="results-page">
        <div className="no-results">
          <h2>No Results Found</h2>
          <p>Please fill out the form to get your neighborhood recommendations.</p>
          <Link to="/form" className="cta-button">
            Take the Survey
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="results-page">
      <div className="results-container">
        <div className="results-header">
          <h1 className="results-title">Your Perfect Neighborhood Matches</h1>
          <p className="results-subtitle">Based on your preferences, here are our AI-powered recommendations:</p>
        </div>

        <div className="recommendations-grid">
          {results.recommendations?.map((neighborhood, index) => (
            <div key={index} className="recommendation-card">
              <div className="card-header">
                <div className="rank-badge">#{index + 1}</div>
                <div className="match-score">{neighborhood.matchScore}% Match</div>
              </div>

              <div className="card-content">
                <h3 className="neighborhood-name">{neighborhood.name}</h3>
                <p className="neighborhood-location">{neighborhood.location}</p>

                <div className="neighborhood-description">
                  <p>{neighborhood.description}</p>
                </div>

                <div className="neighborhood-highlights">
                  <h4>Why This Matches You:</h4>
                  <ul className="highlights-list">
                    {neighborhood.reasons?.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div className="neighborhood-stats">
                  <div className="stat-item">
                    <span className="stat-label">Avg Rent</span>
                    <span className="stat-value">{neighborhood.avgRent}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Safety Score</span>
                    <span className="stat-value">{neighborhood.safetyScore}/10</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Connectivity</span>
                    <span className="stat-value">{neighborhood.connectivity}/10</span>
                  </div>
                </div>

                {neighborhood.keyFeatures && (
                  <div className="key-features">
                    <h4>Key Features:</h4>
                    <div className="features-tags">
                      {neighborhood.keyFeatures.map((feature, idx) => (
                        <span key={idx} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {results.aiInsights && (
          <div className="ai-insights">
            <h2 className="insights-title">AI Insights</h2>
            <div className="insights-content">
              <p>{results.aiInsights}</p>
            </div>
          </div>
        )}

        <div className="results-actions">
          <Link to="/form" className="cta-button secondary">
            Refine Search
          </Link>
          <button onClick={() => window.print()} className="cta-button primary">
            Save Results
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results
