import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FoldableTab from '../ui/FoldableTab'
import './AboutPage.scss'

const contInfo = ['contact@baderidris.com', '+970595744368']

const icons = [
  { iconSrc: '/imgs/svgs/shell.svg', iconAlt: 'shell', path: 'professional' },
  { iconSrc: '/imgs/svgs/circle.svg', iconAlt: 'circle', path: 'personal' },
  { iconSrc: '/imgs/svgs/game.svg', iconAlt: 'game', path: 'hobbies' },
]

const hobbiesObj = [
  { title: 'bio', icon: '/imgs/svgs/red-dir.svg', iconAlt: 'red folder' },
  { title: 'interests', icon: '/imgs/svgs/green-dir.svg', iconAlt: 'green folder' },
  { title: 'education', icon: '/imgs/svgs/purple-dir.svg', iconAlt: 'purple folder' },
  { title: 'high-school', icon: '/imgs/svgs/md-icon.svg', iconAlt: 'markdown icon' },
  { title: 'University', icon: '/imgs/svgs/md-icon.svg', iconAlt: 'markdown icon' },
]

const BIO_TEXT = `Hi! I'm **Bader Idris**, a passionate full-stack developer based in Palestine.

I specialize in building modern web applications using **Vue.js**, **React**, **Node.js**, and **TypeScript**. I love crafting clean, performant, and accessible user experiences.

My journey in software development started in **2022**, and since then I've been continuously learning and improving my craft. I enjoy working on both the frontend and backend, from crafting pixel-perfect UIs to designing robust APIs.

I'm deeply interested in **open-source**, clean code principles, and building tools that make people's lives easier.

When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or playing chess.

Feel free to browse my projects and reach out if you'd like to collaborate!`

function parseBio(text: string) {
  return text.split('\n').map((line, li) => {
    const segments: { text: string; bold: boolean }[] = []
    let last = 0
    const re = /\*\*(.*?)\*\*/g
    let m
    while ((m = re.exec(line)) !== null) {
      if (m.index > last) segments.push({ text: line.slice(last, m.index), bold: false })
      segments.push({ text: m[1], bold: true })
      last = m.index + m[0].length
    }
    if (last < line.length) segments.push({ text: line.slice(last), bold: false })
    return { segments, key: li }
  })
}

const CODE_SNIPPET = `const pigIt = (str) => {
  return str.split(' ').map(e => {
    return e.length > 0 && !e.match(/[!?@#$%^&*]/)
      ? e.substring(1) + e.slice(0,1) + 'ay'
      : e;
  }).join(' ');
};`

export default function AboutPage() {
  const { section = 'personal' } = useParams<{ section: string }>()
  const navigate = useNavigate()

  const [isHobbiesHidden, setIsHobbiesHidden] = useState(false)
  const [isContactHidden, setIsContactHidden] = useState(true)
  const [activeHobbyIndex, setActiveHobbyIndex] = useState(0)
  const [showCopied, setShowCopied] = useState([false, false])
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const bioRef = useRef<HTMLDivElement>(null)

  const activeIconIndex = icons.findIndex(i => i.path === section)

  const copyToClipboard = async (index: number) => {
    try {
      await navigator.clipboard.writeText(contInfo[index])
      setShowCopied(prev => prev.map((v, i) => i === index ? true : v))
      setTimeout(() => setShowCopied(prev => prev.map((v, i) => i === index ? false : v)), 1500)
    } catch (e) { console.error(e) }
  }

  const formattedBio = parseBio(BIO_TEXT)

  const startDate = new Date('2022-06-15')
  const diffMs = Date.now() - startDate.getTime()
  const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25))
  const months = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))

  const then = new Date('2023-05-19')
  const monthsAgo = Math.floor((Date.now() - then.getTime()) / (1000 * 60 * 60 * 24 * 30))

  return (
    <div className="about-me">
      <aside>
        <div className="tab">
          {icons.map((icon, i) => (
            <img
              key={icon.iconAlt}
              src={icon.iconSrc}
              alt={icon.iconAlt}
              className={activeIconIndex === i ? 'active' : ''}
              loading="lazy"
              onClick={() => navigate(`/about/${icon.path}`)}
            />
          ))}
        </div>

        <div className="lists">
          <FoldableTab onToggle={() => setIsHobbiesHidden(v => !v)}>
            <p>personal_info</p>
          </FoldableTab>

          {!isHobbiesHidden && (
            <div className="hobbies-bar">
              {hobbiesObj.map((h, i) => (
                <p
                  key={i}
                  className={activeHobbyIndex === i ? 'active' : ''}
                  onClick={() => setActiveHobbyIndex(i)}
                >
                  <img src={h.icon} alt={h.iconAlt} width={20} height={20} />
                  {h.title}
                </p>
              ))}
            </div>
          )}

          <FoldableTab initiallyFolded onToggle={() => setIsContactHidden(v => !v)}>
            <p>contacts</p>
          </FoldableTab>

          {!isContactHidden && (
            <div className="personal-contact">
              <p onClick={() => { window.location.href = `mailto:${contInfo[0]}`; copyToClipboard(0) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ position: 'relative', top: 3 }}>
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                {' '}{contInfo[0]}
                {showCopied[0] && <span className="copied-badge">Copied!</span>}
              </p>
              <p onClick={() => copyToClipboard(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ position: 'relative', top: 3 }}>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                {' '}{contInfo[1]}
                {showCopied[1] && <span className="copied-badge">Copied!</span>}
              </p>
            </div>
          )}
        </div>
      </aside>

      <main className="about-content">
        {section === 'personal' && (
          <div className="personal-info split-in-half">
            <div className="personal-bio" ref={bioRef}>
              {formattedBio.map(({ segments, key }) => (
                <p key={key}>
                  {segments.map((seg, i) => (
                    <span key={i} className={seg.bold ? 'bold-text' : ''}>
                      {seg.text}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            <div className="code-snippet">
              <div className="code-author">
                <img
                  src="/imgs/meTwentyFour.jpg"
                  alt="personal-img"
                  className="mi-imagen"
                  loading="lazy"
                  onClick={() => setIsLightboxOpen(true)}
                />
                <div className="auth-aside">
                  <p>@bader-idris</p>
                  <p style={{ fontSize: '11px', opacity: 0.7 }}>created {monthsAgo} months ago</p>
                </div>
              </div>
              <pre className="code-block">
                <code className="language-javascript">{CODE_SNIPPET}</code>
              </pre>
            </div>

            {isLightboxOpen && (
              <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
                <img src="/imgs/meTwentyFour.jpg" alt="personal-img-lightbox" className="lightbox-img" />
              </div>
            )}
          </div>
        )}

        {section === 'hobbies' && (
          <div className="hobbies-info">
            <div className="hobbies-placeholder">
              <h2>🎮 Hobbies & Interests</h2>
              <p>Three.js 3D scene coming here — this section is under development.</p>
            </div>
          </div>
        )}

        {section === 'professional' && (
          <div className="professional-info">
            <h2>💼 Professional Background</h2>
            <p>This page is under construction.</p>
          </div>
        )}
      </main>
    </div>
  )
}
