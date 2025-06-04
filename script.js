// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling to all links
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")

        // Trigger animation for illustrations
        const illustration = entry.target.querySelector(".feature-illustration")
        if (illustration) {
          illustration.style.animationPlayState = "running"
        }
      }
    })
  }, observerOptions)

  // Observe all feature sections
  const features = document.querySelectorAll(".feature")
  features.forEach((feature) => {
    observer.observe(feature)
  })

  // Button click animations
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Enhanced scroll animations
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    // Parallax effect for hero illustration
    const heroIllustration = document.querySelector(".mockup-illustration")
    if (heroIllustration) {
      const heroOffset = scrolled * 0.3
      heroIllustration.style.transform = `translateY(${heroOffset}px)`
    }

    // Add scroll-based header styling
    const header = document.querySelector(".header")
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Form validation (if forms are added)
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      // Basic form validation
      const inputs = this.querySelectorAll("input[required], textarea[required]")
      let isValid = true

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.classList.add("error")
        } else {
          input.classList.remove("error")
        }
      })

      if (isValid) {
        // Simulate form submission
        this.classList.add("submitted")
        setTimeout(() => {
          alert("Thank you for your submission!")
          this.reset()
          this.classList.remove("submitted")
        }, 1000)
      }
    })
  })

  // Mobile menu toggle (if needed)
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    imageObserver.observe(img)
  })

  // Add hover effects for illustrations
  const illustrations = document.querySelectorAll(".feature-illustration, .mockup-illustration")

  illustrations.forEach((illustration) => {
    illustration.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)"
    })

    illustration.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })
})

// Add CSS for ripple effect and enhanced animations
const style = document.createElement("style")
style.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .header.scrolled {
        background: rgba(248, 253, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    
    .error {
        border-color: #ff6b9d !important;
        box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1) !important;
    }
    
    .submitted {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .feature-illustration, .mockup-illustration {
        transition: transform 0.3s ease;
    }
    
    .feature-illustration:hover, .mockup-illustration:hover {
        transform: scale(1.05) !important;
    }
`
document.head.appendChild(style)
