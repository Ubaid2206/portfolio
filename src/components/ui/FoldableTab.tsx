import { useState, useEffect, ReactNode } from 'react'
import './FoldableTab.scss'

interface Props {
  initiallyFolded?: boolean
  onToggle: () => void
  children: ReactNode
}

export default function FoldableTab({ initiallyFolded = false, onToggle, children }: Props) {
  const [isToggled, setIsToggled] = useState(initiallyFolded)

  useEffect(() => {
    setIsToggled(initiallyFolded)
  }, [initiallyFolded])

  const handleClick = () => {
    setIsToggled(v => !v)
    onToggle()
  }

  return (
    <>
      <span id="line" />
      <div className="nav-titled">
        <div className={`foldable-tab${isToggled ? ' is-folded' : ''}`} onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L2 21h20L12 3z"/>
          </svg>
          {children}
        </div>
      </div>
    </>
  )
}
