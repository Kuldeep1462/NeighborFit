import "../styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">NeighborFit+</h3>
            <p className="footer-description">
              AI-powered neighborhood recommendations for finding your perfect home in India.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/form" className="footer-link">
                  Find Neighborhood
                </a>
              </li>
              <li>
                <a href="/about" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Cities Covered</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-text">Delhi & NCR</span>
              </li>
              <li>
                <span className="footer-text">Mumbai</span>
              </li>
              <li>
                <span className="footer-text">Bengaluru</span>
              </li>
              <li>
                <span className="footer-text">Punjab</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Contact Info</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-text">Email: info@neighborfit.com</span>
              </li>
              <li>
                <span className="footer-text">Phone: +91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2024 NeighborFit+. All rights reserved. | Powered by Gemini AI</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
