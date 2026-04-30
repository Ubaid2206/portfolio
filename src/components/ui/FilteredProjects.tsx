import { useEffect } from 'react'
import projects from '../../data/projects_info.json'
import './FilteredProjects.scss'

interface Props {
  activeItems: string[]
}

export default function FilteredProjects({ activeItems }: Props) {
  const activeItemsLower = activeItems.map(i => i.toLowerCase())
  const filtered = projects.filter(p =>
    p.tags.some(tag => activeItemsLower.includes(tag.toLowerCase()))
  )

  return (
    <div>
      {filtered.length === 0 ? (
        <div className="empty-message">
          <p>No projects match selected filters. Try selecting different technologies!</p>
        </div>
      ) : (
        <div className="filtered-projects">
          {filtered.map(project => (
            <div key={project.title} className="project-card">
              <h3 className="card-title">// {project.title}</h3>
              <div className="card-content">
                <a
                  href={project.url}
                  className="link external-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`go to ${project.title}`}
                >
                  <img src={project.img} alt={project.title} loading="lazy" />
                </a>
                <p>{project.desc}</p>
                <a
                  href={project.url}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-view">View Project</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
