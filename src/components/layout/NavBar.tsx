import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './NavBar.scss'

export default function NavBar() {
  const [showPhoneMenu, setShowPhoneMenu] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setShowPhoneMenu(v => !v)

  const navLinks = [
    { to: '/', label: '_hello', exact: true },
    { to: '/about', label: '_about-me' },
    { to: '/projects', label: '_projects' },
  ]

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to
    return location.pathname.startsWith(to)
  }

  return (
    <header className="navbar">
      <div className="container">
        <div className="name">Ubaid Ullah</div>
        <nav className="nav">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={() => `sub-navs${isActive(link.to, link.exact) ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/contact"
          className={() => `contact sub-navs${isActive('/contact') ? ' active' : ''}`}
        >
          _contact-me
        </NavLink>
      </div>

      <button className="burger-nav" onClick={toggleMenu} aria-label="menu">
        <span /><span /><span />
      </button>

      {showPhoneMenu && (
        <div className="phone-menu">
          <button className="remove-phone-menu" onClick={toggleMenu} aria-label="close">✕</button>
          <div className="phone-body">
            <div className="name">Ubaid Ullah</div>
            <ul>
              {[...navLinks, { to: '/contact', label: '_contact-me' }].map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={() => `phone-sub-navs${isActive(link.to, link.exact) ? ' active' : ''}`}
                  onClick={toggleMenu}
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
