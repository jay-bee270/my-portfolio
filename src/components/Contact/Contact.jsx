"use client"

import { useState, useEffect } from "react"
import "./Contact.css"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isVisible, setIsVisible] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("contact")
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the form submission with an API call
    console.log("Form submitted:", formData)

    // Simulate form submission success
    setFormSubmitted(true)

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    // Reset submission status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Feel free to contact me for any work or suggestions.</p>

        <div className={`contact-container ${isVisible ? "visible" : ""}`}>
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>
              Feel free to reach out to me! I'm always open to discussing new projects, creative ideas or opportunities
              to be part of your vision.
            </p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <i className="icon-location"></i>
                </div>
                <div className="info-content">
                  <h4>Location</h4>
                  <p>Lagos, Nigeria</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="icon-mail"></i>
                </div>
                <div className="info-content">
                  <h4>Email</h4>
                  <p>jubrilo2007@gmail.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="icon-phone"></i>
                </div>
                <div className="info-content">
                  <h4>Phone</h4>
                  <p>08121629950</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/jay-bee270"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="icon-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="icon-linkedin"></i>
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="icon-twitter"></i>
              </a>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send Me a Message</h3>
            {formSubmitted ? (
              <div className="form-success">
                <p>Thank you for your message! I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
