"use client"

import { useEffect, useState } from "react"
import "./Hero.css"
import fine from "../../assets/fine.jpg"

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
            Hi, I'm <span className="highlight">Afolawiyo Jubril .O <br /> A.K.A (AFO)</span>
          </h1>
          <h2 className="hero-subtitle">Front-End Developer & Designer</h2>
          <p className="hero-description">
            I create beautiful, functional, and responsive Apps and Websites with clean code and modern design principles.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
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
