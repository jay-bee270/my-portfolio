"use client"

import { useState, useEffect } from "react"
import "./Projects.css"
import loanImage from "../../assets/loan.png";
import weatherImage from "../../assets/weather.png";


// Project data
const projectsData = [
  {
     id: 1,
    title: "Loan Website",
    category: "Web Development",
    image: loanImage,
    description: "A developing Loan Web-app with lots of great features",
    technologies: ["React", "JavaScript", "Framer motion"],
    liveLink: "https://loan-ease.vercel.app/",
    codeLink: "https://github.com/jay-bee270/LoanEase",
  },
  {
    id: 2,
    title: "Portfolio Website",
    category: "Web Design",
    image: "/placeholder.svg?height=300&width=500",
    description: "🌐This is about me, A Front-end developer | Building responsive webs-apps, websites and apps | Always learning & creating also always keen on solving real-life problems every day.",
    technologies: ["React", "CSS", "JavaScript", "Framer motion"],
    liveLink: "https://example.com",
    codeLink: "https://github.com/jay-bee270/my-portfolio",
  },
  {
    id: 3,
    title: "Weather App",
    category: "Web Development",
    image: weatherImage,
    description: "An app to check weather conditions anywhere in the world.",
    technologies: ["HTML", "CSS"],
    liveLink: "https://weather-web-app-three-wine.vercel.app/",
    codeLink: "https://github.com/jay-bee270/Weather-WebApp",
  },
  {
   id: 4,
    title: "E-Commerce Website",
    category: "Web Development",
    image: "/placeholder.svg?height=300&width=500",
    description: "A fully responsive e-commerce platform built with React and Node.js.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    liveLink: "https://example.com",
    codeLink: "https://github.com/yourusername/project",
  },
]

// Categories for filtering
const categories = ["All", "Web Development", "Web Design", "Mobile App"]

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleProjects, setVisibleProjects] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  // Filter projects based on active category
  useEffect(() => {
    if (activeCategory === "All") {
      setVisibleProjects(projectsData)
    } else {
      setVisibleProjects(projectsData.filter((project) => project.category === activeCategory))
    }
  }, [activeCategory])

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("projects")
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
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          Here are some of my recent projects. I've worked on a variety of applications ranging from web development to
          design.
        </p>

        <div className="project-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <div key={project.id} className={`project-card ${isVisible ? "visible" : ""}`}>
              <div className="project-image">
                <img src={project.image || "/placeholder.svg"} alt={project.title} loading="lazy" />
                <div className="project-links">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    Live Demo
                  </a>
                  <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Code
                  </a>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
