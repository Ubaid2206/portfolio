import { useState, useEffect, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'
import { Howl } from 'howler'
import eatingSoundFile from '../../assets/sounds/swallow.wav'
import victorySoundFile from '../../assets/sounds/victory.wav'
import wallHitSoundFile from '../../assets/sounds/wall-hit.wav'
import snakeHissingFile from '../../assets/sounds/snake-hissing.wav'
import ouchFile from '../../assets/sounds/ouch.wav'
import './SnakeGame.scss'

const GRID_SIZE = 15
const INITIAL_SNAKE = [{ x: 8, y: 8 }]
const TOTAL_FOOD = 10

type Pos = { x: number; y: number }
type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

interface SnakeGameProps {
  onFoodEaten: (score: number) => void
  onGameOver: (won: boolean) => void
  triggerKey?: { code: string; timestamp: number }
}

let sounds: Record<string, Howl> | null = null

function initSounds() {
  if (!sounds) {
    sounds = {
      snakeHissing: new Howl({ src: [snakeHissingFile], preload: true }),
      ouch: new Howl({ src: [ouchFile] }),
      eating: new Howl({ src: [eatingSoundFile], preload: true }),
      wallHit: new Howl({ src: [wallHitSoundFile] }),
      victory: new Howl({ src: [victorySoundFile] }),
    }
  }
}

function playSound(key: string) {
  if (!sounds?.[key]) return
  try { sounds[key].stop(); sounds[key].play() } catch {}
}

function randomPos(): Pos {
  return { x: Math.floor(Math.random() * GRID_SIZE) + 1, y: Math.floor(Math.random() * GRID_SIZE) + 1 }
}

export default function SnakeGame({ onFoodEaten, onGameOver, triggerKey }: SnakeGameProps) {
  const [snake, setSnake] = useState<Pos[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Pos>(randomPos())
  const [dir, setDir] = useState<Dir>('RIGHT')
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isWon, setIsWon] = useState(false)

  const dirRef = useRef<Dir>('RIGHT')
  const snakeRef = useRef<Pos[]>(INITIAL_SNAKE)
  const foodRef = useRef<Pos>(food)
  const scoreRef = useRef(0)
  const intervalRef = useRef<number | null>(null)

  const formattedScore = `// score: ${String(score).padStart(3, '0')}`

  const placeFood = useCallback((currentSnake: Pos[]): Pos => {
    let pos: Pos
    do { pos = randomPos() } while (currentSnake.some(s => s.x === pos.x && s.y === pos.y))
    return pos
  }, [])

  const endGame = useCallback((won: boolean) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setGameOver(true)
    setGameStarted(false)
    setIsWon(won)
    onGameOver(won)
    if (won) {
      playSound('victory')
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
    } else {
      playSound('ouch')
    }
  }, [onGameOver])

  const tick = useCallback(() => {
    const currentSnake = snakeRef.current
    const currentDir = dirRef.current
    const currentFood = foodRef.current

    const head = currentSnake[0]
    let newHead: Pos
    if (currentDir === 'UP') newHead = { x: head.x, y: head.y - 1 }
    else if (currentDir === 'DOWN') newHead = { x: head.x, y: head.y + 1 }
    else if (currentDir === 'LEFT') newHead = { x: head.x - 1, y: head.y }
    else newHead = { x: head.x + 1, y: head.y }

    // Wall collision
    if (newHead.x < 1 || newHead.x > GRID_SIZE || newHead.y < 1 || newHead.y > GRID_SIZE) {
      playSound('wallHit')
      endGame(false)
      return
    }
    // Self collision
    if (currentSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
      playSound('ouch')
      endGame(false)
      return
    }

    let newSnake: Pos[]
    if (newHead.x === currentFood.x && newHead.y === currentFood.y) {
      // Ate food
      playSound('eating')
      newSnake = [newHead, ...currentSnake]
      scoreRef.current += 1
      setScore(scoreRef.current)
      onFoodEaten(scoreRef.current)
      if (scoreRef.current >= TOTAL_FOOD) {
        snakeRef.current = newSnake
        setSnake(newSnake)
        endGame(true)
        return
      }
      const newFood = placeFood(newSnake)
      foodRef.current = newFood
      setFood(newFood)
    } else {
      newSnake = [newHead, ...currentSnake.slice(0, -1)]
    }

    snakeRef.current = newSnake
    setSnake([...newSnake])
  }, [endGame, onFoodEaten, placeFood])

  const startGame = useCallback(() => {
    initSounds()
    playSound('snakeHissing')
    const initSnake = [{ x: 8, y: 8 }]
    const initFood = randomPos()
    snakeRef.current = initSnake
    foodRef.current = initFood
    dirRef.current = 'RIGHT'
    scoreRef.current = 0
    setSnake(initSnake)
    setFood(initFood)
    setDir('RIGHT')
    setScore(0)
    setGameOver(false)
    setGameStarted(true)
    setIsWon(false)
    intervalRef.current = window.setInterval(tick, 200)
  }, [tick])

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  useEffect(() => {
    if (!triggerKey) return
    const map: Record<string, Dir> = {
      ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT'
    }
    const newDir = map[triggerKey.code]
    if (!newDir) return
    const opposites: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }
    if (dirRef.current !== opposites[newDir]) {
      dirRef.current = newDir
      setDir(newDir)
    }
  }, [triggerKey])

  useEffect(() => {
    if (!gameStarted) return
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT'
      }
      const newDir = map[e.key]
      if (!newDir) return
      e.preventDefault()
      const opposites: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }
      if (dirRef.current !== opposites[newDir]) {
        dirRef.current = newDir
        setDir(newDir)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [gameStarted])

  return (
    <div className="game-screen">
      <div className="scores">
        {(gameStarted || !gameOver) && <p>{formattedScore}</p>}
      </div>
      {(!gameStarted || gameOver) && (
        <div className="outcome-display">
          {!gameStarted && !gameOver && (
            <button className="btn-ghost" onClick={startGame}>Start Game</button>
          )}
          {gameOver && (
            <>
              <p className="outcome">{isWon ? 'Well Done!' : 'Game over!'}</p>
              <div className="congrats" onClick={startGame} role="button" tabIndex={0} onKeyDown={e => e.key === ' ' && startGame()}>
                {isWon ? "Congratulations! You've won the game!" : 'Try again?'}
              </div>
            </>
          )}
        </div>
      )}
      {snake.map((seg, i) => (
        <div key={i} className="snake" style={{ gridColumn: seg.x, gridRow: seg.y }} />
      ))}
      <div className="food" style={{ gridColumn: food.x, gridRow: food.y }} />
    </div>
  )
}
