import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SnakeGame from './SnakeGame'
import './GameContainer.scss'

export default function GameContainer() {
  const [foodLeft, setFoodLeft] = useState<{ eaten: boolean }[]>(
    Array.from({ length: 10 }, () => ({ eaten: false }))
  )
  const [triggerKey, setTriggerKey] = useState<{ code: string; timestamp: number } | undefined>()

  const updateFoodLeft = useCallback((score: number) => {
    setFoodLeft(prev => prev.map((item, i) => i < score ? { eaten: true } : item))
  }, [])

  const handleGameOver = useCallback((won: boolean) => {
    if (!won) {
      setFoodLeft(Array.from({ length: 10 }, () => ({ eaten: false })))
    }
  }, [])

  const triggerKeyPress = (code: string) => {
    setTriggerKey({ code, timestamp: Date.now() })
  }

  return (
    <div className="game-container">
      <div className="screws">
        {[1,2,3,4].map(i => <span key={i}>x</span>)}
      </div>
      <SnakeGame
        onFoodEaten={updateFoodLeft}
        onGameOver={handleGameOver}
        triggerKey={triggerKey}
      />
      <div className="game-controller">
        <div className="instruction-block">
          <span>// use keyboard</span>
          <span>// arrows to play</span>
          <div className="board-arrows">
            <button onClick={() => triggerKeyPress('ArrowUp')} aria-label="up">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L2 21h20L12 3z"/>
              </svg>
            </button>
            <button onClick={() => triggerKeyPress('ArrowLeft')} aria-label="left" className="rotate-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L2 21h20L12 3z"/>
              </svg>
            </button>
            <button onClick={() => triggerKeyPress('ArrowDown')} aria-label="down" className="rotate-down">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L2 21h20L12 3z"/>
              </svg>
            </button>
            <button onClick={() => triggerKeyPress('ArrowRight')} aria-label="right" className="rotate-right">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L2 21h20L12 3z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="food-block">
          <span>// food left</span>
          <div className="food-dots">
            {foodLeft.map((f, i) => (
              <span key={i} className={`dot ${f.eaten ? 'eaten' : ''}`} />
            ))}
          </div>
        </div>

        <Link to="/about" className="internal-link">
          <button className="btn-ghost skip-btn">Skip</button>
        </Link>
      </div>
    </div>
  )
}
