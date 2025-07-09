"use client"

import { useState } from "react"
import "../styles/contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Failed to send message.")
        return
      }
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 3000)
    } catch (err) {
      setError("Failed to send message. Please try again later.")
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">Have questions about NeighborFit+? We'd love to hear from you!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2 className="info-title">Contact Information</h2>

            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-details">
                <h3 className="info-label">Email</h3>
                <p className="info-value">kuldeeptest@gmail(Fake id).com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📱</div>
              <div className="info-details">
                <h3 className="info-label">Phone</h3>
                <p className="info-value">+91 1234567789</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">🏢</div>
              <div className="info-details">
                <h3 className="info-label">Office</h3>
                <p className="info-value">
                  Tech Hub, Sector 12
                  <br />
                  Jalandhar, Punjab 12345
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">⏰</div>
              <div className="info-details">
                <h3 className="info-label">Business Hours</h3>
                <p className="info-value">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2 className="form-title">Send us a Message</h2>

            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Thank you for your message!</h3>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="6"
                    required
                  ></textarea>
                </div>

                {error && (
                  <div className="error-message">{error}</div>
                )}

                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">How accurate are the AI recommendations?</h3>
              <p className="faq-answer">
                Our Gemini AI analyzes multiple data points and has been trained on extensive neighborhood data to
                provide highly accurate recommendations tailored to your preferences.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Is the service free to use?</h3>
              <p className="faq-answer">
                Yes! NeighborFit+ is completely free to use. We believe everyone deserves access to quality neighborhood
                recommendations.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">How often is the data updated?</h3>
              <p className="faq-answer">
                We update our neighborhood data monthly to ensure you get the most current information about rent
                prices, amenities, and local developments.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Can I get recommendations for other cities?</h3>
              <p className="faq-answer">
                Currently, we cover major cities in India including Punjab. We're constantly expanding our coverage
                based on user demand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
