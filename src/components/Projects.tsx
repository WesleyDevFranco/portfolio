'use client'
import { useState } from 'react'
import { Reveal } from './Reveal'
import { ProjectModal } from './ProjectModal'
import type { Project } from './ProjectModal'

const projects: Project[] = [
  {
    name: 'Sistema de Gestão',
    featured: true,
    desc: 'Plataforma para gestão operacional com dashboard em tempo real, relatórios avançados e controle de acesso por perfis.',
    longDesc:
      'Plataforma completa para gestão operacional de médias empresas. Inclui dashboard com métricas em tempo real, sistema de relatórios avançados com exportação PDF/Excel, controle de acesso por perfis hierárquicos e log de auditoria. Integração com APIs externas de pagamento e notificações automáticas via webhook.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    demo: '#',
    github: '#',
  },
  {
    name: 'API REST Escalável',
    featured: true,
    desc: 'Arquitetura de microserviços com autenticação JWT, cache Redis, rate limiting e documentação OpenAPI.',
    longDesc:
      'Arquitetura orientada a microserviços com autenticação JWT stateless, cache Redis para queries frequentes e rate limiting por IP/usuário. Documentação OpenAPI gerada automaticamente. Deploy em containers Docker com CI/CD via GitHub Actions. Suporta 10k+ req/min com latência abaixo de 50ms em p99.',
    tags: ['TypeScript', 'Express', 'Redis', 'MongoDB'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    demo: '#',
    github: '#',
  },
  {
    name: 'App de Agendamento',
    featured: false,
    desc: 'Gestão de agendamentos com notificações em tempo real, integrações externas e painel administrativo completo.',
    longDesc:
      'Sistema de agendamentos online com calendário interativo, notificações por e-mail e SMS em tempo real, integração com Google Calendar e painel administrativo completo para gestão de clientes e horários.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    demo: '#',
    github: '#',
  },
]

function FeaturedCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <article
      role="button"
      tabIndex={0}
      className="group bg-surface rounded-[10px] overflow-hidden cursor-pointer transition-all duration-[220ms] hover:-translate-y-1 hover:bg-surface-h flex flex-col"
      style={{ border: '1px solid var(--bdr)' }}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr-h)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr)')}
    >
      {/* Thumbnail */}
      <div className="aspect-[16/8] bg-[#0a0a0a] overflow-hidden relative flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 35% 50%, rgba(201,168,76,0.04) 0%, transparent 65%)' }}
        />
        <div
          className="relative z-10 w-12 h-12 flex items-center justify-center rounded-[10px] text-t4 transition-transform duration-[400ms] group-hover:scale-110"
          style={{ border: '1px solid var(--bdr-h)' }}
        >
          {project.icon}
        </div>

        {/* Badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)' }}
        >
          <span className="w-1 h-1 rounded-full bg-accent" />
          <span className="text-[14px] font-medium tracking-[0.06em] text-accent">Destaque</span>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-2/5"
          style={{ background: 'linear-gradient(to top, #111111, transparent)' }}
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-[20px] text-t1 mb-2.5 tracking-[0.01em]">{project.name}</h3>
        <p className="text-[17px] text-t3 leading-[1.68] mb-4 flex-1">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[14px] font-medium tracking-[0.03em] text-t4 px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--bdr)' }}
            >
              {t}
            </span>
          ))}
        </div>

        <span className="text-[14px] font-medium text-accent transition-opacity duration-150 group-hover:opacity-80">
          Ver detalhes →
        </span>
      </div>
    </article>
  )
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <article
      className="group bg-surface rounded-[10px] overflow-hidden transition-all duration-[220ms] hover:-translate-y-1 hover:bg-surface-h flex flex-col"
      style={{ border: '1px solid var(--bdr)' }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr-h)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr)')}
    >
      {/* Thumbnail */}
      <div className="aspect-[16/9] bg-[#0f0f0f] overflow-hidden relative flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 65%)' }}
        />
        <div
          className="w-10 h-10 flex items-center justify-center rounded-[8px] relative z-10 text-t4 transition-transform duration-[400ms] group-hover:scale-105"
          style={{ border: '1px solid var(--bdr-h)' }}
        >
          {project.icon}
        </div>
        <div
          className="absolute bottom-0 inset-x-0 h-2/5"
          style={{ background: 'linear-gradient(to top, #111111, transparent)' }}
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-[20px] text-t1 mb-2 tracking-[0.01em]">{project.name}</h3>
        <p className="text-[16.5px] text-t3 leading-[1.65] mb-4 flex-1">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[14px] font-medium tracking-[0.03em] text-t4 px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--bdr)' }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={onClick}
            className="text-[14px] font-medium text-accent px-3.5 py-1.5 rounded-md transition-all duration-150 hover:bg-[rgba(201,168,76,0.07)]"
            style={{ border: '1px solid rgba(201,168,76,0.26)' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#C9A84C')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.26)')}
          >
            Ver Projeto
          </button>
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-t3 px-3.5 py-1.5 rounded-md transition-colors duration-150 hover:text-t1"
              style={{ border: '1px solid var(--bdr)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr-h)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr)')}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const [showAll, setShowAll] = useState(false)

  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  const visibleRest = showAll ? rest : rest.slice(0, 6)

  return (
    <>
      <ProjectModal project={active} onClose={() => setActive(null)} />

      <section id="projetos" style={{ borderTop: '1px solid var(--bdr)', padding: 'clamp(64px,10vw,128px) 0' }}>
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">

          {/* Header */}
          <div className="mb-14">
            <Reveal>
              <span className="text-[17px] font-medium tracking-[0.13em] uppercase text-t4 block mb-3">Portfólio</span>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="font-serif text-[clamp(34px,4.5vw,58px)] text-t1 mb-3">Projetos Selecionados</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-[16.5px] text-t3 leading-[1.72] max-w-[480px]">
                Aplicações construídas com foco em qualidade, performance e boas práticas.
              </p>
            </Reveal>
          </div>

          {/* Destaques */}
          {featured.length > 0 && (
            <div className="mb-12">
              <Reveal>
                <span className="text-[17px] font-medium tracking-[0.13em] uppercase text-t4 block mb-5">
                  Destaques
                </span>
              </Reveal>
              <div
                className={`grid gap-[18px] ${
                  featured.length === 1 ? 'grid-cols-1 max-w-[560px]' : 'grid-cols-1 md:grid-cols-2'
                }`}
              >
                {featured.map((p, i) => (
                  <Reveal key={p.name} delay={i * 70}>
                    <FeaturedCard project={p} onClick={() => setActive(p)} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Outros projetos */}
          {rest.length > 0 && (
            <div>
              <Reveal>
                <span className="text-[17px] font-medium tracking-[0.13em] uppercase text-t4 block mb-5">
                  {featured.length > 0 ? 'Outros projetos' : 'Projetos'}
                </span>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
                {visibleRest.map((p, i) => (
                  <Reveal key={p.name} delay={i * 70}>
                    <ProjectCard project={p} onClick={() => setActive(p)} />
                  </Reveal>
                ))}
              </div>

              {rest.length > 6 && (
                <div className="flex justify-center mt-8">
                  <Reveal>
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="text-[14px] text-t3 hover:text-t1 transition-colors px-3.5 py-1.5 rounded-md"
                      style={{ border: '1px solid var(--bdr)' }}
                    >
                      {showAll ? 'Ver menos' : `Ver todos (${rest.length})`}
                    </button>
                  </Reveal>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </>
  )
}
