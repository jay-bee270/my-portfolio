"use client"

import { useEffect, useState } from "react"
import { Award, Briefcase, GraduationCap, MapPin } from "lucide-react"
import "./About.css"
import about from "../../assets/down.webp"
import resume from "../../assets/AfoResume.pdf"

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
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "20px",
            letterSpacing: "-1px",
            color: "#ffffff",
            position: "relative",
            display: "inline-block",
            width: "100%",
          }}
        >
          About Me
          <span 
            style={{
              content: '""',
              position: "absolute",
              bottom: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "4px",
              background: "#ffffff",
              borderRadius: "2px",
            }}
          ></span>
        </h2>
        <p 
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            marginBottom: "60px",
            color: "#ffffff",
            opacity: "0.8",
            marginTop: "40px",
          }}
        >
          A glimpse into my professional journey and who I am.
        </p>

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
            <h3 
              style={{
                fontSize: "2.8rem",
                marginBottom: "25px",
                lineHeight: "1.2",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Crafting Digital Excellence
            </h3>
            <p style={{ color: "#ffffff", opacity: "0.9", marginBottom: "25px" }}>
              I'm a dedicated full-stack developer based in Lagos, Nigeria, driven by the challenge of turning complex
              problems into elegant, user-centric solutions. With a focus on modern performance and accessible design, I
              build applications that stand out in today's digital landscape.
            </p>
            <p style={{ color: "#ffffff", opacity: "0.9", marginBottom: "25px" }}>
              My expertise lies in building scalable web and mobile applications using the latest ecosystem of tools, ensuring
              every line of code contributes to a seamless and engaging user experience.
            </p>

            <div className="about-info-grid">
              <div className="info-card">
                <div className="info-icon">
                  <GraduationCap size={20} />
                </div>
                <div className="info-details">
                  <h4 style={{ color: "#ffffff", opacity: "0.8" }}>Education</h4>
                  <p style={{ color: "#ffffff" }}>Software Engineering</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <MapPin size={20} />
                </div>
                <div className="info-details">
                  <h4 style={{ color: "#ffffff", opacity: "0.8" }}>Location</h4>
                  <p style={{ color: "#ffffff" }}>Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="about-actions">
              <a 
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
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
                  e.currentTarget.style.backgroundColor = "#cccccc"
                  e.currentTarget.style.borderColor = "#cccccc"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff"
                  e.currentTarget.style.borderColor = "#ffffff"
                }}
              >
                View Resume
              </a>
              <a 
                href={resume} 
                download
                style={{
                  padding: "14px 32px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  fontSize: "1rem",
                  textDecoration: "none",
                  display: "inline-block",
                  border: "2px solid #ffffff",
                  color: "#ffffff",
                  backgroundColor: "transparent",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
                  e.currentTarget.style.borderColor = "#ffffff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.borderColor = "#ffffff"
                }}
              >
                Download Resume
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
                  color: "#ffffff",
                  backgroundColor: "transparent",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#cccccc"
                  e.currentTarget.style.borderColor = "#cccccc"
                  e.currentTarget.style.color = "#111111"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.borderColor = "#ffffff"
                  e.currentTarget.style.color = "#ffffff"
                }}
              >
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