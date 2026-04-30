import { useState, useEffect } from 'react'
import FoldableTab from '../ui/FoldableTab'
import ProjectsSidebar from '../ui/ProjectsSidebar'
import SelectedTabs from '../ui/SelectedTabs'
import FilteredProjects from '../ui/FilteredProjects'
import './ProjectsPage.scss'

interface SidebarItem {
  title: string
  isActive: boolean
}

const INITIAL_LIST: SidebarItem[] = [
  { title: 'HTML', isActive: true },
  { title: 'CSS', isActive: true },
  { title: 'Javascript', isActive: true },
  { title: 'Vue', isActive: true },
  { title: 'Typescript', isActive: true },
  { title: 'Sass', isActive: true },
  { title: 'Docker', isActive: true },
  { title: 'Nginx', isActive: true },
  { title: 'Nuxt', isActive: true },
]

export default function ProjectsPage() {
  const [list, setList] = useState<SidebarItem[]>(INITIAL_LIST)
  const [isSidebarHidden, setIsSidebarHidden] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      setIsSidebarHidden(true)
      setSidebarVisible(false)
    }
    try {
      const stored = JSON.parse(localStorage.getItem('activeItems') || 'null')
      if (stored) {
        setList(prev => prev.map(item => ({ ...item, isActive: stored.includes(item.title) })))
      }
    } catch {}
  }, [])

  const saveActiveItems = (updatedList: SidebarItem[]) => {
    const activeItems = updatedList.filter(i => i.isActive).map(i => i.title)
    localStorage.setItem('activeItems', JSON.stringify(activeItems))
  }

  const toggleActive = (item: SidebarItem) => {
    setList(prev => {
      const updated = prev.map(i => i.title === item.title ? { ...i, isActive: !i.isActive } : i)
      saveActiveItems(updated)
      return updated
    })
  }

  const removeItem = (title: string) => {
    setList(prev => {
      const updated = prev.map(i => i.title === title ? { ...i, isActive: false } : i)
      saveActiveItems(updated)
      return updated
    })
  }

  const toggleSidebar = () => {
    if (isSidebarHidden) {
      setSidebarVisible(true)
      setIsSidebarHidden(false)
    } else {
      setIsSidebarHidden(true)
      setTimeout(() => setSidebarVisible(false), 300)
    }
  }

  const activeItems = list.filter(i => i.isActive).map(i => i.title)

  return (
    <div className="projects">
      <FoldableTab onToggle={toggleSidebar}>
        <p>projects</p>
      </FoldableTab>

      {sidebarVisible && (
        <aside>
          <ProjectsSidebar
            list={list}
            isSidebarHidden={isSidebarHidden}
            onToggleActive={toggleActive}
          />
          <SelectedTabs
            activeItems={activeItems}
            onRemoveItem={removeItem}
          />
        </aside>
      )}

      <FilteredProjects activeItems={activeItems} />
    </div>
  )
}
