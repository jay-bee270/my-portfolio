import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// Simple lazy loading implementation for images
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll(".lazy-image")

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
          }
          img.classList.add("loaded")
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => imageObserver.observe(img))
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src
      }
    })
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
