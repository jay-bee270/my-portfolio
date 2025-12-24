"use client"

import { useEffect, useState } from "react"
import "./Hero.css"
import fine from "../../assets/me.jpg"

function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className={`hero-content ${isVisible ? "visible" : ""}`}>
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Afolawiyo Jubril </span>
          </h1>
          <h2 className="hero-subtitle">Front-End Developer & Designer</h2>
          <p className="hero-description">
            I create beautiful, functional, and responsive Apps and Websites with clean code and modern design principles.
          </p>
          <div className="hero-buttons">
            <a 
              href="#projects" 
              style={{
                padding: "14px 32px",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-block",
                border: "2px solid #ffffff",
                color: "#111111",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#cccccc"
                e.target.style.borderColor = "#cccccc"
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#ffffff"
                e.target.style.borderColor = "#ffffff"
              }}
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              style={{
                padding: "14px 32px",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-block",
                border: "2px solid #ffffff",
                color: "#ffffff !important",
                backgroundColor: "transparent",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#cccccc"
                e.target.style.borderColor = "#cccccc"
                e.target.style.color = "#111111 !important"
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent"
                e.target.style.borderColor = "#ffffff"
                e.target.style.color = "#ffffff !important"
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className={`hero-image ${isVisible ? "visible" : ""}`}>
          <div className="image-container">
            <img src={fine} alt="Profile" />
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <a href="#about">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow"></div>
        </a>
      </div>
    </section>
  )
}

export default Hero