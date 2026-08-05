'use client'
import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal } from './Reveal'
import { TextReveal } from './TextReveal'
import { Stagger } from './Stagger'

gsap.registerPlugin(ScrollTrigger)

export interface Project {
  name: string
  /** Link do projeto. Sem href o card fica só como vitrine. */
  href?: string
  /** Caminho em /public. Sem imagem cai no fallback numerado. */
  image?: string
}

/** A ordem deste array é a ordem do carrossel. Não há destaque. */
const projects: Project[] = [
  { name: 'Sistema de Gestão' },
  { name: 'API REST Escalável' },
  { name: 'App de Agendamento' },
  { name: 'TESTE' },
  { name: 'TESTE2' },
]

const GAP_FALLBACK = 0.8

function CardMedia({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt=""
        fill
        sizes="(max-width: 640px) 300px, (max-width: 1024px) 330px, 360px"
        draggable={false}
        className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
      />
    )
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse at 50% 35%, rgba(201,168,76,0.07) 0%, transparent 60%), #141414',
      }}
    >
      <span className="font-serif text-[92px] leading-none text-white/[0.05] select-none">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const inner = (
    <>
      <CardMedia project={project} index={index} />

      {/* Gradiente de leitura */}
      <div
        className="absolute inset-x-0 bottom-0 h-[46%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 45%, transparent 100%)',
        }}
      />

      {/* Botão de abrir */}
      <div className="absolute top-4 right-4 w-[46px] h-[46px] rounded-full flex items-center justify-center backdrop-blur-md border bg-white/[0.12] border-white/35 transition-colors duration-200 group-hover:bg-accent group-hover:border-accent">
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white transition-colors duration-200 group-hover:text-bg"
        >
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </div>

      <h3 className="absolute left-[22px] right-[22px] bottom-6 font-serif text-[24px] leading-[1.15] text-t1">
        {project.name}
      </h3>
    </>
  )

  const className =
    'group relative shrink-0 w-[300px] sm:w-[330px] lg:w-[360px] aspect-[17/22] rounded-2xl overflow-hidden bg-surface select-none'
  const style = { border: '1px solid var(--bdr)' }

  if (!project.href || project.href === '#') {
    return (
      <article data-card className={className} style={style}>
        {inner}
      </article>
    )
  }

  return (
    <a
      data-card
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      className={`${className} block`}
      style={style}
      aria-label={`Abrir projeto ${project.name}`}
    >
      {inner}
    </a>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  /** Quando true, o carrossel deixa de acompanhar o scroll da página. */
  const releasedRef = useRef(false)
  const [edges, setEdges] = useState({ atStart: true, atEnd: true })

  const release = useCallback(() => {
    releasedRef.current = true
  }, [])

  const syncEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdges({ atStart: el.scrollLeft <= 1, atEnd: el.scrollLeft >= max - 1 })
  }, [])

  const step = useCallback(() => {
    const el = trackRef.current
    if (!el) return 0
    const cards = el.querySelectorAll<HTMLElement>('[data-card]')
    if (cards.length > 1) return cards[1].offsetLeft - cards[0].offsetLeft
    return el.clientWidth * GAP_FALLBACK
  }, [])

  const nudge = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current
      if (!el) return
      release()
      el.scrollBy({ left: dir * step(), behavior: 'smooth' })
    },
    [release, step],
  )

  useGSAP(
    () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      syncEdges()

      // ── Interações que assumem o controle do carrossel ────────────────
      // Roda vertical sobre o track é scroll de página, não do carrossel:
      // só solta em gesto horizontal.
      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) release()
      }

      let dragging = false
      let startX = 0
      let startLeft = 0
      let moved = 0

      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return // toque usa o scroll nativo
        dragging = true
        moved = 0
        startX = e.clientX
        startLeft = track.scrollLeft
        track.setPointerCapture(e.pointerId)
        track.style.cursor = 'grabbing'
        release()
      }
      const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return
        const dx = e.clientX - startX
        moved = Math.max(moved, Math.abs(dx))
        track.scrollLeft = startLeft - dx
      }
      const onPointerUp = (e: PointerEvent) => {
        if (!dragging) return
        dragging = false
        track.releasePointerCapture?.(e.pointerId)
        track.style.cursor = ''
      }
      // Arrastar não pode virar clique no link do card.
      const onClickCapture = (e: MouseEvent) => {
        if (moved > 6) {
          e.preventDefault()
          e.stopPropagation()
        }
      }

      track.addEventListener('wheel', onWheel, { passive: true })
      track.addEventListener('touchstart', release, { passive: true })
      track.addEventListener('keydown', release)
      track.addEventListener('pointerdown', onPointerDown)
      track.addEventListener('pointermove', onPointerMove)
      track.addEventListener('pointerup', onPointerUp)
      track.addEventListener('pointercancel', onPointerUp)
      track.addEventListener('click', onClickCapture, true)
      track.addEventListener('scroll', syncEdges, { passive: true })

      // ── Primeira passagem: o scroll da página avança o carrossel ──────
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const proxy = { p: 0 }
        const tween = gsap.to(proxy, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.6,
          },
          // Solta no fim do MOVIMENTO, não no fim do range de scroll: o scrub
          // tem 0.6s de atraso e soltar antes travaria o carrossel no meio.
          onComplete: release,
          onUpdate: () => {
            if (releasedRef.current) return
            const max = track.scrollWidth - track.clientWidth
            if (max > 0) track.scrollLeft = proxy.p * max
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      return () => {
        mm.revert()
        track.removeEventListener('wheel', onWheel)
        track.removeEventListener('touchstart', release)
        track.removeEventListener('keydown', release)
        track.removeEventListener('pointerdown', onPointerDown)
        track.removeEventListener('pointermove', onPointerMove)
        track.removeEventListener('pointerup', onPointerUp)
        track.removeEventListener('pointercancel', onPointerUp)
        track.removeEventListener('click', onClickCapture, true)
        track.removeEventListener('scroll', syncEdges)
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="projetos"
      ref={sectionRef}
      style={{ padding: 'clamp(64px,10vw,128px) 0' }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between gap-8 mb-14">
          <div className="max-w-[520px]">
            <TextReveal as="h2" className="font-serif text-[clamp(34px,4.5vw,58px)] text-t1 mb-3">
              Projetos Selecionados
            </TextReveal>
          </div>

          <Reveal delay={140} className="hidden md:block shrink-0">
            <div className="flex gap-3">
              {([
                ['prev', -1, edges.atStart, 'M15 18l-6-6 6-6'],
                ['next', 1, edges.atEnd, 'M9 18l6-6-6-6'],
              ] as const).map(([key, dir, disabled, path]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => nudge(dir)}
                  disabled={disabled}
                  aria-label={dir === -1 ? 'Projeto anterior' : 'Próximo projeto'}
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-colors duration-200 disabled:cursor-default"
                  style={{ border: `1px solid var(${disabled ? '--bdr' : '--bdr-h'})` }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={disabled ? 'text-t4' : 'text-t1'}
                  >
                    <path d={path} />
                  </svg>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        className="no-scrollbar overflow-x-auto overscroll-x-contain cursor-grab focus:outline-none"
      >
        <Stagger className="flex gap-4 lg:gap-6 pl-6 md:pl-12 xl:pl-[calc((100vw-1200px)/2+48px)] pr-6 md:pr-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}
