"use client"

import { useEffect, useState } from "react"
import { Award, Briefcase, GraduationCap, MapPin } from "lucide-react"
import "./About.css"
import about from "../../assets/down.webp"
import resume from "../../assets/resume.pdf" // Declared the resume variable

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
        <p className="section-subtitle">A glimpse into my professional journey and who I am.</p>

        <div className={`about-content ${isVisible ? "visible" : ""}`}>
          <div className="about-image-container">
            <div className="about-image">
              <img src={about || "/placeholder.svg"} alt="Afolawiyo Jubril" />
              <div className="experience-badge">
                <span className="years">3+</span>
                <span className="label">Years of Experience</span>
              </div>
            </div>
            <div className="about-stats-mini">
              <div className="stat-pill">
                <Award size={16} />
                <span>10+ Projects Done</span>
              </div>
              <div className="stat-pill">
                <Briefcase size={16} />
                <span>Available for Freelance</span>
              </div>
            </div>
          </div>

          <div className="about-text">
            <h3>Crafting Digital Excellence</h3>
            <p>
              I'm a dedicated full-stack developer based in Lagos, Nigeria, driven by the challenge of turning complex
              problems into elegant, user-centric solutions. With a focus on modern performance and accessible design, I
              build applications that stand out in today's digital landscape.
            </p>
            <p>
              My expertise lies in building scalable web and mobile applications using the latest ecosystem of tools, ensuring
              every line of code contributes to a seamless and engaging user experience.
            </p>

            <div className="about-info-grid">
              <div className="info-card">
                <div className="info-icon">
                  <GraduationCap size={20} />
                </div>
                <div className="info-details">
                  <h4>Education</h4>
                  <p>Software Engineering</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <MapPin size={20} />
                </div>
                <div className="info-details">
                  <h4>Location</h4>
                  <p>Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="about-actions">
              <a href={resume} className="btn btn-primary" download>
                Download Resume
              </a>
              <a href="#contact" className="btn btn-outline">
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
