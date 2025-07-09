import React from "react";
import "../styles/resultcard.css"

interface NearbyPlace {
  name: string
  type: string
  distance: string
}

interface Neighborhood {
  _id: string
  name: string
  city: string
  state: string
  location: string
  tags: string[]
  description: string
  avgRent: string
  rentValue: number
  safetyScore: number
  connectivity: number
  keyFeatures?: string[]
  amenities?: string[]
  nearbyPlaces?: NearbyPlace[]
  score?: number
  matchScore?: number
  reasoning?: string
  reasons?: string[]
}

interface ResultCardProps {
  neighborhood: Neighborhood
  rank: number
}

export default function ResultCard({ neighborhood, rank }: ResultCardProps) {
  const formatRent = (rent: string | number) => {
    if (typeof rent === "string") {
      return rent
    }
    if (rent >= 100000) {
      return `₹${(rent / 100000).toFixed(1)}L`
    }
    return `₹${(rent / 1000).toFixed(0)}K`
  }

  const displayScore = neighborhood.matchScore || neighborhood.score || 0

  return (
    <div className="result-card">
    <div className="card-header">
        <div className="rank-badge">#{rank}</div>
        <div className="score-badge">{displayScore}% Match</div>
      </div>

      <div className="card-content">
        <h3 className="neighborhood-name">{neighborhood.name}</h3>
        <p className="neighborhood-location">
          {neighborhood.location || `${neighborhood.city}, ${neighborhood.state}`}
        </p>

        <p className="neighborhood-description">{neighborhood.description}</p>

        <div className="tags-container">
          {neighborhood.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Avg Rent</span>
            <span className="stat-value">{formatRent(neighborhood.avgRent)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Safety</span>
            <span className="stat-value">{neighborhood.safetyScore}/10</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Connectivity</span>
            <span className="stat-value">{neighborhood.connectivity}/10</span>
          </div>
        </div>

        {/* Key Features */}
        {neighborhood.keyFeatures && neighborhood.keyFeatures.length > 0 && (
          <div className="features-section">
            <h4 className="features-title">Key Features:</h4>
            <div className="features-tags">
              {neighborhood.keyFeatures.map((feature, idx) => (
                <span key={idx} className="feature-tag">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        {neighborhood.amenities && neighborhood.amenities.length > 0 && (
          <div className="amenities-section">
            <h4 className="amenities-title">Amenities:</h4>
            <div className="amenities-list">
              {neighborhood.amenities.slice(0, 6).map((amenity, idx) => (
                <span key={idx} className="amenity-item">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Places */}
        {neighborhood.nearbyPlaces && neighborhood.nearbyPlaces.length > 0 && (
          <div className="nearby-section">
            <h4 className="nearby-title">Nearby Places:</h4>
            <div className="nearby-list">
              {neighborhood.nearbyPlaces.slice(0, 3).map((place, idx) => (
                <div key={idx} className="nearby-item">
                  <span className="nearby-name">{place.name}</span>
                  <span className="nearby-distance">{place.distance}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Reasoning */}
        {(neighborhood.reasoning || (neighborhood.reasons && neighborhood.reasons.length > 0)) && (
          <div className="reasoning-section">
            <h4 className="reasoning-title">Why this matches:</h4>
            {neighborhood.reasoning ? (
              <p className="reasoning-text">{neighborhood.reasoning}</p>
            ) : (
              <ul className="reasons-list">
                {neighborhood.reasons?.map((reason, idx) => (
                  <li key={idx} className="reason-item">
                    {reason}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
