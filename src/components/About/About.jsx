"use client"

import { useEffect, useState } from "react"
import "./About.css"
import about from "../../assets/about.jpg"

function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("about")
      if (section) {
        const sectionTop = section.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        if (sectionTop < windowHeight * 0.75) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on initial load
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Here's a little bit about my background and what I do.</p>

        <div className={`about-content ${isVisible ? "visible" : ""}`}>
          <div className="about-image">
            <img src={about} alt="About Me" />
          </div>
          <div className="about-text">
            <h3>Who I Am</h3>
            <p>
              I'm a passionate web developer with a strong focus on creating beautiful, functional, and user-friendly
              websites. With expertise in modern web technologies, I strive to build applications that not only look
              great but also provide an exceptional user experience.
            </p>
            <p>
              My journey in web development started several years ago, and since then, I've been constantly learning and
              improving my skills to stay up-to-date with the latest trends and technologies in the industry.
            </p>

            <div className="about-info">
              <div className="info-item">
                <h4>Name:</h4>
                <p>Afolawiyo Jubril .O</p>
              </div>
              <div className="info-item">
                <h4>Email:</h4>
                <p>jubrilo2007@gmail.com</p>
              </div>
              <div className="info-item">
                <h4>Location:</h4>
                <p>Lagos, Nigeria</p>
              </div>
              <div className="info-item">
                <h4>Availability:</h4>
                <p>Available for Freelance</p>
              </div>
            </div>

            <a href="/resume.pdf" className="btn" download>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
