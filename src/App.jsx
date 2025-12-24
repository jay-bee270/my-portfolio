"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header/Header"
import Hero from "./components/Hero/Hero"
import About from "./components/About/About"
import Projects from "./components/Projects/Projects"
import Stats from "./components/Stats/Stats"
import Experience from "./components/Experience/Experience"
import Skills from "./components/Skills/Skills"
import Testimonials from "./components/Testimonials/Testimonials"
import Contact from "./components/Contact/Contact"
import Footer from "./components/Footer/Footer"
// import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle"
import "./App.css"

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="app">
      <Header isScrolled={isScrolled} />
      <main>
        <Hero />
        <About />
        <Stats />
        <Projects />
        
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {/* <DarkModeToggle /> */}
    </div>
  )
}

export default App
