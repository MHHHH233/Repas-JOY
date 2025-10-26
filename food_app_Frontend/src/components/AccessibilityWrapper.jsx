import { useEffect } from "react"

export function AccessibilityWrapper({ children }) {
  useEffect(() => {
    // Add keyboard navigation support
    const handleKeyDown = (event) => {
      // Skip to main content with Alt + M
      if (event.altKey && event.key === 'm') {
        event.preventDefault()
        const mainContent = document.querySelector('main')
        if (mainContent) {
          mainContent.focus()
          mainContent.scrollIntoView({ behavior: 'smooth' })
        }
      }
      
      // Skip to navigation with Alt + N
      if (event.altKey && event.key === 'n') {
        event.preventDefault()
        const navigation = document.querySelector('nav')
        if (navigation) {
          navigation.focus()
          navigation.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    // Add focus indicators for keyboard navigation
    const addFocusStyles = () => {
      const style = document.createElement('style')
      style.textContent = `
        *:focus {
          outline: 2px solid #f97316 !important;
          outline-offset: 2px !important;
        }
        
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #f97316;
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 1000;
          transition: top 0.3s;
        }
        
        .skip-link:focus {
          top: 6px;
        }
      `
      document.head.appendChild(style)
    }

    // Add skip links
    const addSkipLinks = () => {
      const skipLinks = document.createElement('div')
      skipLinks.innerHTML = `
        <a href="#main-content" class="skip-link">Skip to main content</a>
        <a href="#navigation" class="skip-link">Skip to navigation</a>
      `
      document.body.insertBefore(skipLinks, document.body.firstChild)
    }

    document.addEventListener('keydown', handleKeyDown)
    addFocusStyles()
    addSkipLinks()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}
