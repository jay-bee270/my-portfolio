"use client"

import { useState, useEffect } from "react"
import "./Header.css"
// Import your profile image - create an assets folder if you don't have one
// import profileImage from "../../assets/profile.jpg" // Uncomment and add your image

function Header({ isScrolled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "experience", "skills", "testimonials", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        <div className="logo-container">
          <a href="#home" className="logo">
            Portfolio
          </a>
          {/* Uncomment and adjust when you have your profile image */}
          {/* <div className="profile-image">
            <img src={profileImage || "/placeholder.svg"} alt="Profile" />
          </div> */}
        </div>

        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className={`nav-link ${activeSection === "home" ? "active" : ""}`} onClick={closeMenu}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className={`nav-link ${activeSection === "about" ? "active" : ""}`} onClick={closeMenu}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#projects"
                className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
                onClick={closeMenu}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#experience"
                className={`nav-link ${activeSection === "experience" ? "active" : ""}`}
                onClick={closeMenu}
              >
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#skills"
                className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
                onClick={closeMenu}
              >
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#testimonials"
                className={`nav-link ${activeSection === "testimonials" ? "active" : ""}`}
                onClick={closeMenu}
              >
                Ratings & Reviews
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                onClick={closeMenu}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`menu-icon ${isMenuOpen ? "open" : ""}`}></span>
        </button>
      </div>
    </header>
  )
}

export default Header
