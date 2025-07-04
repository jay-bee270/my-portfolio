import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css"

function Footer() {
  const currentYear = new Date().getFullYear()

  // Replace these with your actual social media links
  const socialLinks = [
    { icon: <FaGithub />, link: "https://github.com/jay-bee270", label: "GitHub" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/jubril-afolawiyo-655aa133b/?trk=PROFILE_DROP_DOWN" , label: "LinkedIn" },
    { icon: <FaXTwitter style={{ color: "black" }}/>, link: "https://x.com/alab_iii", label: "X" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/jbo_officials", label: "Instagram" },
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
