import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import FoldableTab from '../ui/FoldableTab'
import './ContactPage.scss'

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date)
}

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formattedDate, setFormattedDate] = useState(() => formatDate(new Date()))
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setFormattedDate(formatDate(new Date()))
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const validateForm = () => {
    if (!name || !email || !message) {
      toast.error('All fields are required!')
      return false
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (isLoading || !validateForm()) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/v1/received_emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error('Server error')
      setIsSubmitted(true)
      toast.success('Message sent successfully!')
    } catch {
      toast.error('Failed to send message. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="contact-page">
      <FoldableTab onToggle={() => {}}>
        <p>contacts</p>
      </FoldableTab>

      <main className="cont">
        {!isSubmitted ? (
          <div className="messaging">
            <label htmlFor="name">_name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Doe"
              required
            />

            <label htmlFor="_email">_email:</label>
            <input
              id="_email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
            />

            <label htmlFor="_message">_message:</label>
            <textarea
              id="_message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
              cols={33}
              placeholder="Write your message here..."
              style={{ resize: 'vertical' }}
              required
            />

            <button
              className="submit-btn"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? 'Sending...' : 'submit-message'}
            </button>
          </div>
        ) : (
          <div className="thank-you">
            <img src="/imgs/thanks.svg" alt="thank you message icon" loading="lazy" />
            <p>Thank you for your message! I will get back to you as soon as possible.</p>
            <button className="submit-btn" onClick={resetForm}>
              send-new-message
            </button>
          </div>
        )}

        <span className="divider" />

        <div className="beautiful-results">
          <div className="first-query">
            <span>const</span>
            <div className="var-name">button</div>
            <div className="query">
              <span>document</span>
              <span>.</span>
              <span>querySelector</span>
              <span>'#sendBtn'</span>
            </div>
          </div>

          <div className="message-to-json">
            <span>const</span>
            <div className="var-name">message</div>
            <span> =</span>
            <span> {'{'}</span>
            <div className="data-object">
              <div className="set">
                <span className="options">name</span>
                <p className="name results">{name}</p>
              </div>
              <div className="set">
                <span className="options">email</span>
                <p className="email results">{email}</p>
              </div>
              <div className="set">
                <span className="options">message</span>
                <p className="message results" style={{ whiteSpace: 'pre-line' }}>{message}</p>
              </div>
              <div className="set">
                <span className="options">date</span>
                <p className="date results">{formattedDate}</p>
              </div>
            </div>
          </div>

          <div className="event-listener">
            <div className="first-line">
              <span className="dom-keyword">button</span>
              <span className="dot">.</span>
              <span className="event">addEventListener</span>
              <span className="click-event">'click'</span>
              <span className="parenthesis">(</span>
              <span className="arrow">=&gt;</span>
              <span className="curly">{'{'}</span>
            </div>
            <div className="second-line">
              <span className="dom-form">form</span>
              <span className="dot">.</span>
              <span className="event">submit</span>
              <span className="message-var">message</span>
            </div>
            <div className="third-line">
              <span className="curly">{'}'}</span>
              <span className="parenthesis">)</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
