"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "../styles/navbar.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1 className="brand-text">NeighborFit+</h1>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className={`nav-link ${isActive("/")}`} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/form" className={`nav-link ${isActive("/form")}`} onClick={() => setIsMenuOpen(false)}>
            Find Neighborhood
          </Link>
          <Link to="/about" className={`nav-link ${isActive("/about")}`} onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className={`nav-link ${isActive("/contact")}`} onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </div>

        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
