import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FoldableTab from '../ui/FoldableTab'
import './AboutPage.scss'

const contInfo = ['ubaidullah2206f@gmail.com', '+923282199746']

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

const BIO_TEXT = `Hi! I'm **Ubaid Ullah**, a passionate **Full-Stack Developer**.

I specialize in **Laravel**, **Flutter**, **React**, and **AI Automation**, building modern, scalable, and efficient applications.

I focus on clean code, **performance**, and **user-friendly experiences** across both frontend and backend development.

I'm especially interested in AI-driven solutions and automation tools that solve real-world problems.

When I'm not coding, I explore new technologies and work on improving my skills.

`

const INTERESTS = [
  { emoji: '🤖', title: 'AI & Automation', desc: 'Building intelligent tools that solve real-world problems.' },
  { emoji: '🌐', title: 'Full-Stack Web Dev', desc: 'Crafting end-to-end web apps with Laravel and React.' },
  { emoji: '📱', title: 'Mobile Development', desc: 'Cross-platform apps using Flutter.' },
  { emoji: '🔧', title: 'Open Source', desc: 'Contributing to and learning from open-source projects.' },
  { emoji: '♟️', title: 'Chess', desc: 'Strategic thinking on and off the board.' },
]

const EDUCATION = [
  {
    tag: 'high-school',
    title: 'Matric / High School',
    institute: 'Government High School',
    year: '2020',
    detail: 'Completed matriculation with focus on science subjects.',
  },
  {
    tag: 'university',
    title: 'BS Software Engineering',
    institute: 'University of Engineering & Technology',
    year: '2022 – Present',
    detail: 'Currently pursuing BS in Software Engineering, specializing in web and mobile development.',
  },
]

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

const CODE_SNIPPET = `const developerMindset = (idea) => {
  return idea
    .split(' ')
    .map(word =>
      word.length > 0
        ? word.slice(1) + word[0] + 'Dev'
        : word
    )
    .join(' ')
    .concat(' 🚀');
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

  const then = new Date('2023-05-19')
  const monthsAgo = Math.floor((Date.now() - then.getTime()) / (1000 * 60 * 60 * 24 * 30))

  const activeTab = hobbiesObj[activeHobbyIndex]?.title

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
              <p onClick={() => { window.open(`mailto:${contInfo[0]}`); copyToClipboard(0) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ position: 'relative', top: 3, flexShrink: 0 }}>
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="contact-text">{contInfo[0]}</span>
                {showCopied[0] && <span className="copied-badge">Copied!</span>}
              </p>
              <p onClick={() => { window.open(`tel:${contInfo[1]}`); copyToClipboard(1) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ position: 'relative', top: 3, flexShrink: 0 }}>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="contact-text">{contInfo[1]}</span>
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

              {/* BIO */}
              {activeTab === 'bio' && formattedBio.map(({ segments, key }) => (
                <p key={key}>
                  {segments.map((seg, i) => (
                    <span key={i} className={seg.bold ? 'bold-text' : ''}>{seg.text}</span>
                  ))}
                </p>
              ))}

              {/* INTERESTS */}
              {activeTab === 'interests' && (
                <div className="tab-section">
                  <p className="tab-heading">// interests</p>
                  {INTERESTS.map((item, i) => (
                    <div key={i} className="interest-item">
                      <span className="interest-emoji">{item.emoji}</span>
                      <div>
                        <p className="interest-title">{item.title}</p>
                        <p className="interest-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* EDUCATION (all) */}
              {activeTab === 'education' && (
                <div className="tab-section">
                  <p className="tab-heading">// education</p>
                  {EDUCATION.map((edu, i) => (
                    <div key={i} className="edu-card">
                      <p className="edu-year">{edu.year}</p>
                      <p className="edu-title">{edu.title}</p>
                      <p className="edu-institute">{edu.institute}</p>
                      <p className="edu-detail">{edu.detail}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* HIGH-SCHOOL */}
              {activeTab === 'high-school' && (
                <div className="tab-section">
                  <p className="tab-heading">// high-school</p>
                  {EDUCATION.filter(e => e.tag === 'high-school').map((edu, i) => (
                    <div key={i} className="edu-card">
                      <p className="edu-year">{edu.year}</p>
                      <p className="edu-title">{edu.title}</p>
                      <p className="edu-institute">{edu.institute}</p>
                      <p className="edu-detail">{edu.detail}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* UNIVERSITY */}
              {activeTab === 'University' && (
                <div className="tab-section">
                  <p className="tab-heading">// university</p>
                  {EDUCATION.filter(e => e.tag === 'university').map((edu, i) => (
                    <div key={i} className="edu-card">
                      <p className="edu-year">{edu.year}</p>
                      <p className="edu-title">{edu.title}</p>
                      <p className="edu-institute">{edu.institute}</p>
                      <p className="edu-detail">{edu.detail}</p>
                    </div>
                  ))}
                </div>
              )}

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
                  <p>@ubaid2206</p>
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
