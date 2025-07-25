"use client"

import { useState, useEffect } from "react"
import "./Projects.css"
import loanImage from "../../assets/loan.png"
import weatherImage from "../../assets/weather.png"
import portfolioImage from "../../assets/portfolio.png"
import furnitureImage from "../../assets/furniture1.png"
import BookService from "../../assets/BookService.png"

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
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio Website",
    category: "Web Design",
    image: portfolioImage,
    description: "A personal portfolio showcasing my skills, projects, and experience as a Front-end developer.",
    technologies: ["React", "CSS", "JavaScript", "Framer motion"],
    liveLink: "https://my-portfolio-nine-ruddy-22.vercel.app/",
    codeLink: "https://github.com/jay-bee270/my-portfolio",
  },
  {
    id: 3,
    title: "Weather App",
    category: "Mobile App",
    image: weatherImage,
    description: "An app to check weather conditions anywhere in the world.",
    technologies: ["HTML", "CSS"],
    liveLink: "https://weather-web-app-three-wine.vercel.app/",
    codeLink: "https://github.com/jay-bee270/Weather-WebApp",
  },
  {
    id: 4,
    title: "Furniture Website",
    category: "Web Development",
    image: furnitureImage,
    description: "An E-commerce landing page website for a furniture app built with React and used Firebase for the backend",
    technologies: ["React", "Javascript", "Firebase"],
    liveLink: "https://afofurnitures.vercel.app/",
    codeLink: "https://github.com/jay-bee270/A.F.O.-Furnitures",
  },
  {
    id: 5,
    title: "BookService Website",
    category: "Web Development",
    image: BookService,
    description: "A fully responsive website platform built with React and javascript used for managing books",
    technologies: ["React", "Javascript", "Ant design", "Potgress", "Spring", "SpringBoot", "MongoDB"],
    liveLink: "https://book-service-wheat.vercel.app/",
    codeLink: "https://github.com/jay-bee270/BookService",
    inProgress: true,
  },
]

// Categories for filtering
const categories = ["All", "Web Development", "Web Design", "Mobile App"]

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleProjects, setVisibleProjects] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)

  // Filter projects based on active category
  useEffect(() => {
    if (activeCategory === "All") {
      setVisibleProjects(projectsData)
    } else {
      setVisibleProjects(projectsData.filter((project) => project.category === activeCategory))
    }

    // Reset animation state when changing categories
    setAnimateCards(false)
    setTimeout(() => {
      setAnimateCards(true)
    }, 50)
  }, [activeCategory])

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("projects")
      if (section) {
        const sectionTop = section.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        if (sectionTop < windowHeight * 0.75) {
          setIsVisible(true)
          setTimeout(() => {
            setAnimateCards(true)
          }, 300)
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
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${isVisible && animateCards ? "visible" : ""}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
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
                {project.featured && <div className="project-badge featured">Featured</div>}
                {project.inProgress && <div className="project-badge in-progress">In Progress</div>}
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-description-wrapper">
                  <p className="project-description">{project.description}</p>
                </div>
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
