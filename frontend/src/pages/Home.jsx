import { Link } from "react-router-dom"
import "../styles/home.css"

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Find Your Perfect Neighborhood in India</h1>
            <p className="hero-subtitle">
              Discover neighborhoods that match your lifestyle, age, and preferences across major Indian cities
              including Punjab with AI-powered recommendations.
            </p>
            <div className="hero-buttons">
              <Link to="/form" className="cta-button primary">
                Get Started
              </Link>
              <Link to="/about" className="cta-button secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="graphic-element element-1"></div>
              <div className="graphic-element element-2"></div>
              <div className="graphic-element element-3"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose NeighborFit+?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI-Powered Matching</h3>
              <p className="feature-description">
                Advanced Gemini AI analyzes your preferences to find the perfect neighborhood match.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏙️</div>
              <h3 className="feature-title">Comprehensive Coverage</h3>
              <p className="feature-description">
                Covers major cities including Delhi, Mumbai, Bengaluru, and Punjab localities.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Personalized Results</h3>
              <p className="feature-description">
                Considers your age, gender, lifestyle, and specific preferences for accurate recommendations.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Detailed Insights</h3>
              <p className="feature-description">
                Get comprehensive information about rent, safety, connectivity, and amenities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cities-section">
        <div className="cities-container">
          <h2 className="section-title">Cities We Cover</h2>
          <div className="cities-grid">
            <div className="city-card">
              <h3 className="city-name">Delhi & NCR</h3>
              <p className="city-description">Connaught Place, Hauz Khas, Lajpat Nagar, Gurgaon</p>
            </div>
            <div className="city-card">
              <h3 className="city-name">Mumbai</h3>
              <p className="city-description">Bandra, Andheri, Powai, Juhu</p>
            </div>
            <div className="city-card">
              <h3 className="city-name">Bengaluru</h3>
              <p className="city-description">Koramangala, Indiranagar, Whitefield, HSR Layout</p>
            </div>
            <div className="city-card">
              <h3 className="city-name">Punjab</h3>
              <p className="city-description">Chandigarh, Ludhiana, Amritsar, Jalandhar</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
