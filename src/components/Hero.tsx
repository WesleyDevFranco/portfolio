'use client'
import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { resolveIntroMode, onIntroDone, onIntroFly, FLY_DURATION } from '@/lib/intro'

gsap.registerPlugin(ScrollTrigger, SplitText)

/** Defasagem entre a subida de cada elemento do Hero. */
const RISE_STAGGER = 0.06

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let offIntro: (() => void) | undefined
    let offFly: (() => void) | undefined
    let safety: ReturnType<typeof setTimeout> | undefined

    const ctx = gsap.context(() => {
      const headline = headlineRef.current
      const els = gsap.utils.toArray<HTMLElement>('[data-hero-el]', sectionRef.current)

      if (resolveIntroMode() === 'flip') {
        // O loader voa o nome dele até aqui e pousa em cima deste título, que
        // fica invisível até o pouso — trocamos os dois no mesmo frame.
        if (headline) gsap.set(headline, { opacity: 0 })

        // Cada elemento parte de FORA da tela: o topo dele encostado na borda
        // inferior da viewport. Como cada um está numa altura diferente, cada
        // um percorre uma distância diferente — é isso que dá naturalidade.
        // Medimos todos antes de deslocar (transform não afeta layout, mas
        // manter a medição separada evita depender disso).
        const offsets = els.map((el) => window.innerHeight - el.getBoundingClientRect().top)
        els.forEach((el, i) => gsap.set(el, { y: offsets[i] }))

        const settle = () => {
          if (headline) gsap.set(headline, { opacity: 1 })
          gsap.set(els, { y: 0 })
        }

        // Os elementos sobem DURANTE o voo do nome. A duração de cada um
        // encolhe conforme seu atraso, então TODOS pousam no mesmo instante em
        // que as letras chegam — é isso que faz as duas telas parecerem um
        // movimento só.
        offFly = onIntroFly(() => {
          els.forEach((el, i) => {
            const delay = i * RISE_STAGGER
            gsap.to(el, {
              y: 0,
              duration: FLY_DURATION - delay,
              delay,
              ease: 'power2.out',
            })
          })
        })

        offIntro = onIntroDone(() => {
          if (headline) gsap.set(headline, { opacity: 1 })
        })
        // Rede de segurança: nunca deixar o Hero invisível
        safety = setTimeout(settle, 6000)
      } else if (headline) {
        // Fallback: o script do intro não rodou, então não há voo para esperar
        // e o título faz a própria entrada.
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

    return () => {
      offIntro?.()
      offFly?.()
      if (safety) clearTimeout(safety)
      ctx.revert()
    }
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
            <div data-hero-el>
              <p className="text-[14px] font-medium tracking-[0.1em] uppercase text-t4 mb-5 flex items-center gap-3">
                <span className="block w-6 h-px bg-t4" />
                Desenvolvedor Full Stack
              </p>
            </div>

            <h1
              ref={headlineRef}
              className="font-serif text-[clamp(68px,9vw,120px)] leading-[0.93] tracking-[0.01em] text-t1 mb-8"
            >
              <span className="block" data-hero-word="Wesley">Wesley</span>
              <span className="block" data-hero-word="Franco">Franco</span>
            </h1>

            <div data-hero-el>
              <div className="w-9 h-px bg-accent mb-6" />
              <p className="text-[17px] text-t3 leading-[1.75] max-w-[400px] mb-9">
                Você fala direto comigo, do primeiro wireframe ao deploy.
                Sem intermediários, sem enrolação — só entrega.
              </p>
            </div>

            <div data-hero-el>
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
            </div>
          </div>

          {/* ── Direita: foto ── */}
          <div data-hero-el className="flex justify-center lg:justify-end">
            <div ref={photoRef} className="relative">
              <div
                className="relative w-full max-w-[340px] lg:max-w-none lg:w-[380px] aspect-[4/5] bg-surface rounded-lg overflow-hidden"
                style={{ border: '1px solid var(--bdr-h)', borderLeft: '2px solid #C9A84C' }}
              >
                {/* A foto é 3:2 e a moldura 4:5, então `cover` corta as laterais.
                    `sizes` considera esse corte: a fonte precisa ser ~1.9x a
                    largura da caixa para preencher — pedir só a largura da caixa
                    entregaria uma imagem ampliada e borrada. */}
                <Image
                  src="/photo.jpg"
                  alt="Wesley Franco"
                  fill
                  preload
                  sizes="(max-width: 1024px) 640px, 720px"
                  className="object-cover object-center"
                />
              </div>

              {/* Detalhe decorativo deslocado */}
              <div
                className="absolute -bottom-3 -right-3 w-16 h-16 rounded-sm -z-10"
                style={{ border: '1px solid var(--bdr-h)' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
