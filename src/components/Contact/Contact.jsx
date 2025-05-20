"use client"

import { useState, useEffect, useRef } from "react"
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa"
import emailjs from "@emailjs/browser"
import ReCAPTCHA from "react-google-recaptcha"
import "./Contact.css"

// EmailJS credentials
const SERVICE_ID = "service_wvhzc7c"
const TEMPLATE_ID = "template_2da8inl"
const USER_ID = "PkX-_r5OlD5HnBf6W"
const RECAPTCHA_SITE_KEY = "6Le_vTQrAAAAAFVYNrNV7eaYzCEyIav1vQcxJlwg"

function Contact() {
  const form = useRef()
  const recaptchaRef = useRef()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isVisible, setIsVisible] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [recaptchaValue, setRecaptchaValue] = useState(null)
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0)
  const [testMode, setTestMode] = useState(false)

  // Form validation state
  const [errors, setErrors] = useState({})

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(USER_ID)

    // Check if we're in test mode (for development only)
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("test") === "true") {
      setTestMode(true)
    }
  }, [])

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

    // Update the form data state
    setFormData((prev) => {
      // For fields that match our state properties
      if (name === "from_name") return { ...prev, name: value }
      if (name === "reply_to") return { ...prev, email: value }
      if (name === "subject") return { ...prev, subject: value }
      if (name === "message") return { ...prev, message: value }

      // For other fields
      return { ...prev, [name]: value }
    })

    // Clear error when user starts typing
    if (errors.name && name === "from_name") {
      setErrors({ ...errors, name: null })
    } else if (errors.email && name === "reply_to") {
      setErrors({ ...errors, email: null })
    } else if (errors.subject && name === "subject") {
      setErrors({ ...errors, subject: null })
    } else if (errors.message && name === "message") {
      setErrors({ ...errors, message: null })
    }
  }

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value)
    if (errors.recaptcha) {
      setErrors({
        ...errors,
        recaptcha: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters"
    }

    // Email validation - more comprehensive
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    } else if (formData.email.trim().length > 100) {
      newErrors.email = "Email must be less than 100 characters"
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters"
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = "Subject must be less than 100 characters"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    } else if (formData.message.trim().length > 5000) {
      newErrors.message = "Message must be less than 5000 characters"
    }

    // reCAPTCHA validation (skip in test mode)
    if (!testMode && !recaptchaValue) {
      newErrors.recaptcha = "Please verify you're not a robot"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    // Rate limiting check (skip in test mode)
    const now = Date.now()
    if (!testMode && now - lastSubmissionTime < 60000) {
      // 1 minute cooldown
      setFormError("Please wait a minute before sending another message.")
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    // Sanitize inputs to prevent XSS
    const sanitizedName = formData.name.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")
    const sanitizedSubject = formData.subject.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")
    const sanitizedMessage = formData.message.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")

    // Prepare email parameters
    const emailParams = {
      to_email: "jubrilo2007@gmail.com",
      from_name: "AFO Portfolio Website", // Display name in email header
      reply_to: formData.email.trim(), // Sender's email for reply functionality
      subject: sanitizedSubject,
      message: sanitizedMessage,
      sender_name: sanitizedName, // Sender's name to be displayed in email body
      // Format the email body to prominently display the sender's name
      formatted_message: `
Name: ${sanitizedName}
Email: ${formData.email.trim()}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}
      `.trim(),
    }

    // Add recaptcha response if available
    if (recaptchaValue) {
      emailParams["g-recaptcha-response"] = recaptchaValue
    }

    // Log parameters in test mode
    if (testMode) {
      console.log("Email parameters:", emailParams)

      // Simulate success in test mode
      setTimeout(() => {
        setFormSubmitted(true)
        setIsSubmitting(false)
        setLastSubmissionTime(now)

        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
        setRecaptchaValue(null)

        // Reset submission status after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false)
        }, 5000)
      }, 1000)

      return
    }

    // Send email using EmailJS
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, emailParams, USER_ID)
      .then((result) => {
        console.log("Email sent successfully:", result.text)
        setFormSubmitted(true)
        setIsSubmitting(false)
        setLastSubmissionTime(now)

        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
        setRecaptchaValue(null)

        // Reset submission status after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false)
        }, 5000)
      })
      .catch((error) => {
        console.error("Error sending email:", error)
        setFormError("Failed to send message. Please try again later.")
        setIsSubmitting(false)
      })
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
              I'm always open to discussing freelance opportunities, collaborations, or partnering on innovative
              projects. Whether you have a creative idea, a vision you're building, or just want to connect — I'd love
              to hear from you.
            </p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <h4>Location</h4>
                  <p>Lagos, Nigeria</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-content">
                  <h4>Email</h4>
                  <p>jubrilo2007@gmail.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaPhone />
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
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/jubril-afolawiyo-655aa133b/?trk=PROFILE_DROP_DOWN"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com/alab_iii"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/jbo_officials"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="contact-form">
            <h3>
              Send Me a Message Directly <br /> To My EMAIL
            </h3>
            {formSubmitted ? (
              <div className="form-success">
                <p>Thank you for your message! I'll get back to you soon.</p>
              </div>
            ) : (
              <form ref={form} onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">
                    Your Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    required
                    maxLength="50"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Your Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="reply_to" // This is the key field for reply functionality
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    required
                    maxLength="100"
                    autoComplete="email"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    Subject <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "error" : ""}
                    required
                    maxLength="100"
                  />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Your Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                    required
                    maxLength="5000"
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <div className="recaptcha-container">
                  <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} />
                  {errors.recaptcha && <span className="error-message">{errors.recaptcha}</span>}
                </div>

                {formError && <div className="form-error">{formError}</div>}

                <div className="privacy-notice">
                  <p>
                    By submitting this form, you agree to our Privacy Policy. Your email address will be used as the
                    reply-to address so I can respond directly to your message. Your personal information will be
                    handled securely and will not be shared with third parties.
                  </p>
                </div>

                <button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
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
