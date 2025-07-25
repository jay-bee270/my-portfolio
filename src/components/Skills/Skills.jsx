"use client"
import { useInView } from "react-intersection-observer"
import "./Skills.css"

// Skills data
const skillsData = [
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML5", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 70 },
      { name: "React", level: 85 },
        { name: "React-Native", level: 70 },
     
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "MongoDB", level: 70 },
      { name: "SQL", level: 65 },
      { name: "RESTful APIs", level: 75 },
      { name: "Firebase", level: 70 }
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Responsive Design", level: 90 },
      { name: "UI/UX Design", level: 75 },
      { name: "Framer Motion", level: 80 },
      { name: "Animations", level: 80 },
      { name: "Testing", level: 70 },      
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
          <h2 className="section-title">My Skills</h2>
          <p className="section-subtitle">Here's an overview of my technical skills and competencies.</p>
        </div>

        <div ref={ref} className={`skills-container ${inView ? "visible" : ""}`}>
          {skillsData.map((category, index) => (
            <div key={category.category} className="skill-category" style={{ transitionDelay: `${index * 0.2}s` }}>
              <h3 className="category-title">{category.category}</h3>
              <div className="skills-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <h4 className="skill-name">{skill.name}</h4>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{
                          width: inView ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 0.2 + 0.1}s`,
                        }}
                      ></div>
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












