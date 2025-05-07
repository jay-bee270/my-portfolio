"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header/Header"
import Hero from "./components/Hero/Hero"
import About from "./components/About/About"
import Projects from "./components/Projects/Projects"
import Skills from "./components/Skills/Skills"
import Contact from "./components/Contact/Contact"
import Footer from "./components/Footer/Footer"
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
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
