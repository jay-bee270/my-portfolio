"use client"
import { useInView } from "react-intersection-observer"
import { Server, Terminal, Globe, CheckCircle2 } from "lucide-react"
import "./Skills.css"

// Skills data
const skillsData = [
  {
    category: "Frontend Development",
    icon: <Globe size={24} />,
    description: "Building responsive and interactive user interfaces with modern web technologies.",
    skills: [
      { name: "HTML5", level: 90, icon: "html" },
      { name: "CSS", level: 85, icon: "css" },
      { name: "JavaScript", level: 70, icon: "js" },
      { name: "React", level: 85, icon: "react" },
      { name: "React-Native", level: 70, icon: "smartphone" },
    ],
  },
  {
    category: "Backend Development",
    icon: <Server size={24} />,
    description: "Designing scalable server-side architectures and efficient database management.",
    skills: [
      { name: "MongoDB", level: 70, icon: "database" },
      { name: "SQL", level: 65, icon: "database" },
      { name: "RESTful APIs", level: 75, icon: "api" },
      { name: "Firebase", level: 70, icon: "cloud" },
    ],
  },
  {
    category: "Tools & Others",
    icon: <Terminal size={24} />,
    description: "Utilizing professional development tools and creative design principles.",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "UI/UX Design", level: 75 },
      { name: "Framer Motion", level: 80 },
      { name: "Animations", level: 80 },
      { name: "Ai's", level: 95 },
    ],
  },
]

function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  })

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical stack and professional competencies.
          </p>
        </div>

        <div ref={ref} className={`skills-container ${inView ? "visible" : ""}`}>
          {skillsData.map((category, index) => (
            <div key={category.category} className="skill-category" style={{ transitionDelay: `${index * 0.2}s` }}>
              <div className="category-header">
                <div className="category-icon-wrapper">{category.icon}</div>
                <div>
                  <h3 className="category-title">{category.category}</h3>
                  <p className="category-description">{category.description}</p>
                </div>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, sIndex) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <div className="skill-name-wrapper">
                        <CheckCircle2 size={14} className="skill-check" />
                        <h4 className="skill-name">{skill.name}</h4>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{
                          width: inView ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 0.2 + sIndex * 0.1}s`,
                        }}
                      >
                        <div className="skill-glow"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
