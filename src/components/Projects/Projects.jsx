"use client"

import { useState, useEffect } from "react"
import "./Projects.css"
import loanImage from "../../assets/loan.png"
import weatherImage from "../../assets/weatherr.jpg"
import portfolioImage from "../../assets/portfolio.png"
import furnitureImage from "../../assets/AFO.jpg"
import BookService from "../../assets/Book.jpg"
import Brainstorm from "../../assets/Brainstorm.jpg" 
import FreelanceMate from "../../assets/Freelancemate.jpg"

// Project data
const projectsData = [
  {
    id: 1,
    title: "Loan Website",
    category: "Websites",
    image: loanImage,
    description: "A developing Loan Web-app with lots of great features",
    technologies: ["React", "JavaScript", "Framer motion"],
    liveLink: "https://loan-ease.vercel.app/",
    codeLink: "https://github.com/jay-bee270/LoanEase",
    featured: false,
  },
  {
    id: 2,
    title: "Portfolio Website",
    category: "Websites",
    image: portfolioImage,
    description: "A personal portfolio showcasing my skills, projects, and experience as a Front-end developer.",
    technologies: ["React", "CSS", "JavaScript", "Framer motion"],
    liveLink: "https://my-portfolio-nine-ruddy-22.vercel.app/",
    codeLink: "https://github.com/jay-bee270/my-portfolio",
  },
  {
    id: 3,
    title: "Weather App",
    category: "Mobile Apps",
    image: weatherImage,
    description: "An app to check weather conditions anywhere in the world.",
    technologies: ["HTML", "CSS"],
    liveLink: "https://weather-web-app-three-wine.vercel.app/",
    codeLink: "https://github.com/jay-bee270/Weather-WebApp",
    isMobile: true,
  },
  {
    id: 4,
    title: "Furniture Website",
    category: "Websites",
    image: furnitureImage,
    description:
      "An E-commerce landing page website for a furniture app built with React and used Firebase for the backend",
    technologies: ["React", "Javascript", "Firebase"],
    liveLink: "https://afofurnitures.vercel.app/",
    codeLink: "https://github.com/jay-bee270/A.F.O.-Furnitures",
  },
  {
    id: 5,
    title: "BookService Website",
    category: "Websites",
    image: BookService,
    description: "A fully responsive website platform built with React and javascript used for managing books",
    technologies: ["React", "Javascript", "Ant design", "Potgress", "Spring", "SpringBoot", "MongoDB"],
    liveLink: "https://book-service-wheat.vercel.app/",
    codeLink: "https://github.com/jay-bee270/BookService",
    inProgress: false,
  },
  {
    id: 6,
    title: "BrainStorm App",
    category: "Mobile Apps",
    image: Brainstorm,
    description: "A mobile-first brainstorming application is designed for multipurpose purposes including creative professionals, developers, Gamers and students.",
    technologies: ["React Native", "Express.js", "Jvascript", "Bare Css"],
    codeLink: "https://github.com/jay-bee270/Brainstorm-The-App",
    isMobile: true,
  },
  {
    id: 7,
    title: "FreelanceMateApp",
    category: "Mobile Apps",
    image: FreelanceMate,
    description: "A mobile-first brainstorming application is designed for multipurpose purposes including creative professionals, developers, Gamers and students.",
    technologies: ["React Native", "Express.js", "Jvascript", "Bare Css"],
    codeLink: "https://github.com/jay-bee270/Brainstorm-The-App",
    isMobile: true,
  },
]

// Categories for filtering
const categories = ["All", "Websites", "Mobile Apps"]

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleProjects, setVisibleProjects] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [displayCount, setDisplayCount] = useState(7) // Default to show all on desktop
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobileDevice(mobile)
      // Show 2 websites + 2 mobile apps = 4 total on mobile, all on desktop
      setDisplayCount(mobile ? 4 : projectsData.length)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Filter projects based on active category
  useEffect(() => {
    let filtered = []
    
    if (activeCategory === "All") {
      filtered = projectsData
    } else {
      filtered = projectsData.filter((project) => project.category === activeCategory)
    }

    // For mobile: ensure we show 2 websites + 2 mobile apps initially
    if (isMobileDevice && activeCategory === "All") {
      const websites = filtered.filter(p => p.category === "Websites")
      const mobileApps = filtered.filter(p => p.category === "Mobile Apps")
      
      // Take first 2 from each category
      const initialProjects = [
        ...websites.slice(0, 2),
        ...mobileApps.slice(0, 2)
      ]
      
      // Store the full list but display only initial 4
      setVisibleProjects(filtered)
      setDisplayCount(4)
    } else {
      setVisibleProjects(filtered)
      // Reset display count when category changes
      setDisplayCount(isMobileDevice ? 4 : filtered.length)
    }
    
    // Reset animation state when changing categories
    setAnimateCards(false)
    setTimeout(() => {
      setAnimateCards(true)
    }, 50)
  }, [activeCategory, isMobileDevice])

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

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 4) // Load 4 more projects
  }

  // For "All" category on mobile, show balanced mix initially (2 websites + 2 mobile apps)
  let displayedProjects = []
  if (isMobileDevice && activeCategory === "All" && displayCount === 4) {
    const websites = visibleProjects.filter(p => p.category === "Websites")
    const mobileApps = visibleProjects.filter(p => p.category === "Mobile Apps")
    displayedProjects = [
      ...websites.slice(0, 2),
      ...mobileApps.slice(0, 2)
    ]
  } else {
    displayedProjects = visibleProjects.slice(0, displayCount)
  }
  
  const hasMore = displayCount < visibleProjects.length

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="projects-header text-center">
          <h2 className="section-title">Featured Works</h2>
          <p className="section-subtitle">
            A curated selection of my most impactful projects, blending technical excellence with creative design.
          </p>
        </div>

        <div className="project-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="btn-dot"></span>
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${project.isMobile ? "mobile-project" : ""} ${isVisible && animateCards ? "visible" : ""}`}
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image">
                <div className="image-overlay"></div>
                {project.isMobile ? (
                  <div className="mobile-device-container">
                    <div className="mobile-frame">
                      <div className="phone-bezel">
                        <div className="phone-speaker"></div>
                        <div className="phone-screen">
                          <img src={project.image || "/placeholder.svg"} alt={project.title} loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img src={project.image || "/placeholder.svg"} alt={project.title} loading="lazy" />
                )}
                <div className="project-links">
                  {!project.isMobile && project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link primary"
                    >
                      <span className="link-icon">↗</span> Live Preview
                    </a>
                  )}

                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link secondary"
                  >
                    <span className="link-icon">&lt;/&gt;</span> Source Code
                  </a>
                </div>

                {project.featured && (
                  <div className="project-badge featured">
                    <span className="badge-glow"></span> Featured
                  </div>
                )}
                {project.inProgress && <div className="project-badge in-progress">Ongoing</div>}
              </div>

              <div className="project-info">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <div className="project-description-wrapper">
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-tech">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-tag-more">+{project.technologies.length - 4}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isMobileDevice && hasMore && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore}>
              <span className="sparkle"></span>
              <span className="sparkle"></span>
              <span className="sparkle"></span>
              <span className="sparkle"></span>
              <span className="btn-content">
                <span>Show More</span>
                <span className="btn-icon">↓</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects