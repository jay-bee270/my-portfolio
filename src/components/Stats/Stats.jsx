"use client"

import { useState, useEffect } from "react"
import "./Stats.css"

const statsData = [
  {
    id: 1,
    number: "10+",
    label: "Projects Completed",
    
  },
  {
    id: 2,
    number: "7+",
    label: "Happy Clients",
    
  },
  {
    id: 3,
    number: "3+",
    label: "Years Experience",
    
  },
  {
    id: 4,
    number: "100%",
    label: "Client Satisfaction",
    
  },
]

function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState(statsData.map(() => 0))

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("stats")
      if (section) {
        const sectionTop = section.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        if (sectionTop < windowHeight * 0.75 && !isVisible) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const intervals = statsData.map((stat, index) => {
      const target = Number.parseInt(stat.number)
      let current = 0
      return setInterval(() => {
        current += Math.ceil(target / 30)
        if (current >= target) {
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = target
            return newCounts
          })
          clearInterval(intervals[index])
        } else {
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = current
            return newCounts
          })
        }
      }, 50)
    })

    return () => intervals.forEach((interval) => clearInterval(interval))
  }, [isVisible])

  return (
    <section 
      id="stats" 
      className={`section stats ${isVisible ? "visible" : ""}`}
      style={{
        backgroundColor: "#000000",
        borderTop: "1px solid #333333",
        borderBottom: "1px solid #333333",
      }}
    >
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div 
              key={stat.id} 
              className="stat-card" 
              style={{ 
                animationDelay: `${index * 0.1}s`,
                backgroundColor: "#0a0a0a",
                border: "1px solid #333333",
              }}
            >
              <div 
                className="stat-icon"
                style={{ color: "#ffffff" }}
              >
                {stat.icon}
              </div>
              <div 
                className="stat-number"
                style={{ 
                  color: "#ffffff",
                  background: "none",
                  WebkitBackgroundClip: "initial",
                  WebkitTextFillColor: "initial",
                }}
              >
                {counts[index]}
                {stat.number.replace(/[0-9]/g, "")}
              </div>
              <div 
                className="stat-label"
                style={{ color: "#cccccc" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats