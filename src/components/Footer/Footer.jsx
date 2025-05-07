import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa"
import "./Footer.css"

function Footer() {
  const currentYear = new Date().getFullYear()

  // Replace these with your actual social media links
  const socialLinks = [
    { icon: <FaGithub />, link: "https://github.com/jay-bee270", label: "GitHub" },
    { icon: <FaLinkedin />, link: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: <FaTwitter />, link: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/", label: "Instagram" },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <a href="#home">Portfolio</a>
            <p>Creating amazing web experiences.</p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-social">
            <h3>Connect With Me</h3>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Afolawiyo Jubril .O. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
