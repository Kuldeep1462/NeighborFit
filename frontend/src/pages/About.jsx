import "../styles/about.css"

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-hero">
          <h1 className="about-title">About NeighborFit+</h1>
          <p className="about-subtitle">
            Revolutionizing how people find their perfect neighborhood in India with AI-powered recommendations.
          </p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              Finding the right neighborhood is one of life's most important decisions. NeighborFit+ uses advanced AI
              technology to match you with neighborhoods that truly fit your lifestyle, preferences, and needs across
              major Indian cities including Punjab.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">How It Works</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Tell Us About You</h3>
                <p className="step-description">
                  Share your age, gender, lifestyle preferences, and what matters most to you in a neighborhood.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">AI Analysis</h3>
                <p className="step-description">
                  Our Gemini AI analyzes thousands of data points to understand your unique preferences and needs.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Get Recommendations</h3>
                <p className="step-description">
                  Receive personalized neighborhood recommendations with detailed insights and reasoning.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">Why Choose NeighborFit+?</h2>
            <div className="features-list">
              <div className="feature-item">
                <h3 className="feature-title">🤖 AI-Powered Intelligence</h3>
                <p className="feature-description">
                  Leveraging Google's Gemini AI for sophisticated analysis and personalized recommendations.
                </p>
              </div>
              <div className="feature-item">
                <h3 className="feature-title">🏙️ Comprehensive Coverage</h3>
                <p className="feature-description">
                  Covering major cities including Delhi, Mumbai, Bengaluru, and Punjab localities like Chandigarh,
                  Ludhiana, and Amritsar.
                </p>
              </div>
              <div className="feature-item">
                <h3 className="feature-title">👥 Personalized Approach</h3>
                <p className="feature-description">
                  Considering your age, gender, family size, and lifestyle for truly personalized recommendations.
                </p>
              </div>
              <div className="feature-item">
                <h3 className="feature-title">📊 Data-Driven Insights</h3>
                <p className="feature-description">
                  Providing detailed information about rent, safety, connectivity, and amenities for informed decisions.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">Our Coverage</h2>
            <div className="coverage-grid">
              <div className="coverage-card">
                <h3 className="coverage-title">Delhi & NCR</h3>
                <ul className="coverage-list">
                  <li>Connaught Place</li>
                  <li>Hauz Khas</li>
                  <li>Lajpat Nagar</li>
                  <li>Gurgaon</li>
                  <li>Noida</li>
                </ul>
              </div>
              <div className="coverage-card">
                <h3 className="coverage-title">Mumbai</h3>
                <ul className="coverage-list">
                  <li>Bandra West</li>
                  <li>Andheri West</li>
                  <li>Powai</li>
                  <li>Juhu</li>
                  <li>Lower Parel</li>
                </ul>
              </div>
              <div className="coverage-card">
                <h3 className="coverage-title">Bengaluru</h3>
                <ul className="coverage-list">
                  <li>Koramangala</li>
                  <li>Indiranagar</li>
                  <li>Whitefield</li>
                  <li>HSR Layout</li>
                  <li>Jayanagar</li>
                </ul>
              </div>
              <div className="coverage-card">
                <h3 className="coverage-title">Punjab</h3>
                <ul className="coverage-list">
                  <li>Chandigarh</li>
                  <li>Ludhiana</li>
                  <li>Amritsar</li>
                  <li>Jalandhar</li>
                  <li>Patiala</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
