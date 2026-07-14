'use client'
import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Reveal } from './Reveal'

gsap.registerPlugin(ScrollTrigger, SplitText)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // #1 — Headline: lines rise in from behind a mask on load
      const headline = headlineRef.current
      if (headline) {
        const split = new SplitText(headline, { type: 'lines', mask: 'lines' })
        gsap.from(split.lines, {
          yPercent: 115,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.1,
        })
      }

      // #3 — Photo: subtle parallax drift as the hero scrolls away
      if (photoRef.current && sectionRef.current) {
        gsap.to(photoRef.current, {
          yPercent: 9,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="min-h-screen flex items-center py-20"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-center">

          {/* ── Esquerda: texto ── */}
          <div>
            <Reveal>
              <p className="text-[14px] font-medium tracking-[0.1em] uppercase text-t4 mb-5 flex items-center gap-3">
                <span className="block w-6 h-px bg-t4" />
                Desenvolvedor Full Stack
              </p>
            </Reveal>

            <h1
              ref={headlineRef}
              className="font-serif text-[clamp(68px,9vw,120px)] leading-[0.93] tracking-[0.01em] text-t1 mb-8"
            >
              Wesley<br />Franco
            </h1>

            <Reveal delay={140}>
              <div className="w-9 h-px bg-accent mb-6" />
              <p className="text-[17px] text-t3 leading-[1.75] max-w-[400px] mb-9">
                Você fala direto comigo, do primeiro wireframe ao deploy.
                Sem intermediários, sem enrolação — só entrega.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#projetos"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#projetos')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="inline-flex items-center gap-2 bg-t1 text-bg text-[17px] font-medium px-5 py-2.5 rounded-md hover:bg-t2 transition-all duration-200 hover:-translate-y-px"
                >
                  Ver Projetos
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#contato"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="inline-flex items-center gap-2 text-t2 text-[17px] font-medium px-5 py-2.5 rounded-md transition-all duration-200 hover:text-t1"
                  style={{ border: '1px solid var(--bdr-h)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.28)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr-h)')}
                >
                  Falar comigo
                </a>
              </div>
            </Reveal>
          </div>

          {/* ── Direita: foto ── */}
          <Reveal delay={140} className="flex justify-center lg:justify-end">
            <div ref={photoRef} className="relative">
              <div
                className="w-full max-w-[340px] lg:max-w-none lg:w-[380px] aspect-[4/5] bg-surface rounded-lg overflow-hidden flex items-center justify-center"
                style={{ border: '1px solid var(--bdr-h)', borderLeft: '2px solid #C9A84C' }}
              >
                {/*
                  Para adicionar sua foto, substitua este bloco por:
                  <Image src="/photo.jpg" alt="Wesley Franco" fill className="object-cover" />
                  e adicione o arquivo em /public/photo.jpg
                */}
                <div className="flex flex-col items-center gap-3 select-none">
                  <span className="font-serif text-[64px] text-t4 opacity-30 leading-none tracking-widest">
                    WF
                  </span>
                  <span className="text-[14px] font-medium tracking-[0.12em] uppercase text-t4 opacity-40">
                    Inserir foto aqui
                  </span>
                </div>
              </div>

              {/* Detalhe decorativo deslocado */}
              <div
                className="absolute -bottom-3 -right-3 w-16 h-16 rounded-sm -z-10"
                style={{ border: '1px solid var(--bdr-h)' }}
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
