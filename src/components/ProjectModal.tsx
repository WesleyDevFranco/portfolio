'use client'
import { useEffect, useState, ReactNode } from 'react'

export interface Project {
  name: string
  featured: boolean
  desc: string
  longDesc: string
  tags: string[]
  icon: ReactNode
  image?: string
  demo?: string
  github?: string
  linkedin?: string
}

interface Props {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!project) { setVisible(false); return }
    const id = requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = 'hidden'
    return () => { cancelAnimationFrame(id); document.body.style.overflow = '' }
  }, [project])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      style={{
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-[640px] bg-surface rounded-t-[16px] sm:rounded-[12px] overflow-y-auto max-h-[92vh] sm:max-h-[88vh]"
        style={{
          border: '1px solid var(--bdr-h)',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.22s ease, opacity 0.22s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thumbnail */}
        <div className="aspect-[16/9] bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden shrink-0">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 35% 50%, rgba(201,168,76,0.05) 0%, transparent 65%)' }}
          />
          {project.image ? (
            <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div
              className="relative z-10 w-14 h-14 flex items-center justify-center rounded-[10px] text-t4"
              style={{ border: '1px solid var(--bdr-h)' }}
            >
              {project.icon}
            </div>
          )}
          <div
            className="absolute bottom-0 inset-x-0 h-1/3"
            style={{ background: 'linear-gradient(to top, #111111, transparent)' }}
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-t3 hover:text-t1 transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--bdr-h)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] font-medium tracking-[0.03em] text-t4 px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--bdr)' }}
              >
                {t}
              </span>
            ))}
          </div>

          <h3 className="font-serif text-[clamp(20px,3vw,26px)] text-t1 mb-4 tracking-[0.01em] leading-snug">
            {project.name}
          </h3>

          <p className="text-[13.5px] text-t3 leading-[1.78] mb-7">{project.longDesc}</p>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-accent px-4 py-2 rounded-md transition-all duration-150 hover:bg-[rgba(201,168,76,0.07)]"
                style={{ border: '1px solid rgba(201,168,76,0.26)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#C9A84C')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.26)')}
              >
                Ver Projeto →
              </a>
            )}
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-t3 px-4 py-2 rounded-md transition-colors duration-150 hover:text-t1"
                style={{ border: '1px solid var(--bdr)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr-h)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr)')}
              >
                GitHub
              </a>
            )}
            {project.linkedin && (
              <a
                href={project.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-t3 px-4 py-2 rounded-md transition-colors duration-150 hover:text-t1"
                style={{ border: '1px solid var(--bdr)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr-h)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr)')}
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
