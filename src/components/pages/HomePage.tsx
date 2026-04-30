import { Link } from 'react-router-dom'
import GameContainer from '../game/GameContainer'
import './HomePage.scss'

export default function HomePage() {
  return (
    <div className="home">
      <div className="container">
        <section>
          <div className="info">
            <span className="greeting">Hi all. I am</span>
            <h1 className="name">Ubaid Ullah</h1>
            <p className="role">{'>'} Full-stack developer</p>
          </div>
          <div className="task">
            <p>// complete the game to continue</p>
            <p>// you can also see it on my Github page</p>
          </div>
          <div className="github-repo">
            <p>// Find my profile on github</p>
            <span>const</span>{' '}
            <span>githubLink</span>{' '}
            <em>= </em>
            <a
              href="https://github.com/Ubaid2206"
              className="external-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="go to my github page"
            >
              github.com/Ubaid2206
            </a>
          </div>
        </section>
        <aside>
          <GameContainer />
        </aside>
      </div>
    </div>
  )
}
