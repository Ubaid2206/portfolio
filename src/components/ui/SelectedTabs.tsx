import './SelectedTabs.scss'

interface Props {
  activeItems: string[]
  onRemoveItem: (item: string) => void
}

export default function SelectedTabs({ activeItems, onRemoveItem }: Props) {
  return (
    <div className="selected-projects">
      <ul>
        {activeItems.map((item, i) => (
          <li key={i}>
            {item}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="remove"
              onClick={() => onRemoveItem(item)}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  )
}
