"use client"

import { useState, useEffect } from "react"
import "./DarkModeToggle.css"

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode")
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.style.colorScheme = "dark"
      document.body.classList.add("dark-mode")
      document.body.classList.remove("light-mode")
    } else {
      document.documentElement.style.colorScheme = "light"
      document.body.classList.add("light-mode")
      document.body.classList.remove("dark-mode")
    }
  }, [isDarkMode])

  return (
    <button
      className="dark-mode-toggle"
      onClick={() => setIsDarkMode(!isDarkMode)}
      aria-label="Toggle dark mode"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  )
}

export default DarkModeToggle
