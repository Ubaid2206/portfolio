import { useState } from 'react'
import './FooterComp.scss'

const telegramLink = 'https://t.me/bader_idris'
const facebookLink = 'https://www.facebook.com/Bader.Idris.developer'
const githubLink = 'https://github.com/bader-idris'

export default function FooterComp() {
  const [showTerms, setShowTerms] = useState(false)

  return (
    <footer itemScope itemType="http://schema.org/WPFooter">
      <div className="container">
        <p>find me in:</p>
        <div className="social" itemProp="contactPoint" itemScope itemType="http://schema.org/ContactPoint">
          <div className="telegram">
            <a href="mailto:ubaidullah2206f@gmail.com" aria-label="Telegram" target="_blank" rel="noopener noreferrer" className="link">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
            </a>
          </div>
          <div className="facebook">
            <a href="https://www.instagram.com/callmeubaidkhan/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="link">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
  <path d="M7.75 2C4.57 2 2 4.57 2 7.75V16.25C2 19.43 4.57 22 7.75 22H16.25C19.43 22 22 19.43 22 16.25V7.75C22 4.57 19.43 2 16.25 2H7.75ZM12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7ZM18 6.5C18.83 6.5 19.5 7.17 19.5 8C19.5 8.83 18.83 9.5 18 9.5C17.17 9.5 16.5 8.83 16.5 8C16.5 7.17 17.17 6.5 18 6.5Z"/>
</svg>
            </a>
          </div>
        </div>

        {/* <div className="terms-services-container" onClick={() => setShowTerms(v => !v)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          {showTerms && (
            <div onClick={e => e.stopPropagation()}>
              <a href="/legal/terms" className="link" target="_blank">terms</a>
              {' & '}
              <a href="/privacy/policy" className="link" target="_blank">privacy services</a>
            </div>
          )}
        </div> */}

        <div className="github" onClick={() => window.open('https://github.com/Ubaid2206', '_blank', 'noopener,noreferrer')}>
          <p>@ubaid-ullah</p>
          <a href="https://github.com/Ubaid2206" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
