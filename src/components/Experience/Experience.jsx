"use client"

import { useState, useEffect } from "react"
import "./Experience.css"

const experienceData = [
  {
    id: 1,
    year: "2023-Present",
    title: "Frontend Developer",
    company: "Tech Company",
    description: "Leading frontend development and mentoring junior developers",
  },
  {
    id: 2,
    year: "2021-2023",
    title: "Full Stack Developer",
    company: "StartUp XYZ",
    description: "Built scalable web applications using React and Firebase.js",
  },
  {
    id: 3,
    year: "2019-2021",
    title: "Junior Developer",
    company: "Agency ABC",
    description: "Developed responsive websites, interactive web applications and mobile aplications",
  },
  {
    id: 4,
    year: "2018-2019",
    title: "Internship",
    company: "Tech Corp",
    description: "Learned web development fundamentals and best practices",
  },
]

function Experience() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("experience")
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
    <section id="experience" className={`section experience ${isVisible ? "visible" : ""}`}>
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">My professional journey and career highlights</p>

        <div className="experience-timeline">
          {experienceData.map((exp, index) => (
            <div
              key={exp.id}
              className={`experience-item ${index % 2 === 0 ? "left" : "right"}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="timeline-dot" />
              <div className="experience-card">
                <div className="experience-year">{exp.year}</div>
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-company">{exp.company}</p>
                <p className="experience-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
