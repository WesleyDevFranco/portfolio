'use client'
import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { resolveIntroMode, onIntroDone } from '@/lib/intro'

gsap.registerPlugin(ScrollTrigger, SplitText)

const RISE_STAGGER = 0.09


function goToContato(e: React.MouseEvent) {
  e.preventDefault()
  const smoother = ScrollSmoother.get()
  if (smoother) smoother.scrollTo('#contato', true)
  else document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const photoWrapRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    let offIntro: (() => void) | undefined
    let safety: ReturnType<typeof setTimeout> | undefined

    const headline = headlineRef.current
    const els = gsap.utils.toArray<HTMLElement>('[data-hero-el]')

    if (resolveIntroMode() === 'flip') {
      const photoWrap = photoWrapRef.current

      if (headline) gsap.set(headline, { opacity: 0.01 })

     if (photoWrap) gsap.set(photoWrap, { yPercent: 100 })
      gsap.set(els, { opacity: 0, y: 36 })

      const settle = () => {
        if (headline) gsap.set(headline, { opacity: 1 })
        gsap.set(els, { opacity: 1, y: 0 })
        if (photoWrap) gsap.set(photoWrap, { yPercent: 0 })
      }

      offIntro = onIntroDone(() => {
        if (headline) gsap.set(headline, { opacity: 1 })
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
        if (photoWrap) tl.to(photoWrap, { yPercent: 0, duration: 1.15 }, 0)
        tl.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: RISE_STAGGER }, 0.1)
      })
      safety = setTimeout(settle, 6000)
    } else if (headline) {
      const split = new SplitText(headline, { type: 'words', wordsClass: 'overflow-hidden' })
      gsap.from(split.words, {
        yPercent: 120,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.12,
        delay: 0.1,
      })
    }

const exitScroll = () => ({
      trigger: sectionRef.current!,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      invalidateOnRefresh: true,
    })

    if (photoRef.current && sectionRef.current) {
      gsap.to(photoRef.current, {
        yPercent: 12,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: exitScroll(),
      })
    }

  const drift = gsap.utils.toArray<HTMLElement>('[data-hero-drift]')
    if (drift.length && sectionRef.current) {
      gsap.to(drift, { y: 70, ease: 'none', scrollTrigger: exitScroll() })
    }

 let offMouse: (() => void) | undefined
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (tiltRef.current && fine && !reduce) {
      const xTo = gsap.quickTo(tiltRef.current, 'x', { duration: 0.7, ease: 'power3.out' })
      const yTo = gsap.quickTo(tiltRef.current, 'y', { duration: 0.7, ease: 'power3.out' })
      const rTo = gsap.quickTo(tiltRef.current, 'rotation', { duration: 0.7, ease: 'power3.out' })
      const onMove = (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2  // -1 (esq) .. 1 (dir)
        const ny = (e.clientY / window.innerHeight - 0.5) * 2 // -1 (topo) .. 1 (base)
        xTo(nx * 16)
        yTo(ny * 12)
        rTo(nx * 1.4)
      }
      window.addEventListener('pointermove', onMove)
      offMouse = () => window.removeEventListener('pointermove', onMove)
    }

    return () => {
      offIntro?.()
      offMouse?.()
      if (safety) clearTimeout(safety)
    }
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      
      <div className="relative w-full max-w-[1440px] mx-auto h-[min(900px,100svh)] overflow-hidden">

        {/* ── Nome gigante, atrás da foto ── */}
        <h1
          ref={headlineRef}
          className="absolute inset-x-0 top-[5%] md:top-[6%] z-0 px-4 text-center uppercase font-sans font-extrabold text-t1 select-none whitespace-normal md:whitespace-nowrap
                     text-[clamp(52px,11vw,152px)] leading-[0.92] tracking-[-0.04em]"
        >
          <span data-hero-word="Wesley">Wesley</span>{' '}
          <span data-hero-word="Franco">Franco</span>
        </h1>

        {/* ── Foto recortada em arco, no centro ── */}
        <div
          ref={photoWrapRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[clamp(260px,32vw,420px)] will-change-transform"
        >
          <div ref={tiltRef} className="will-change-transform">
          <div
            ref={photoRef}
            className="relative aspect-[420/788] rounded-t-full overflow-hidden origin-bottom"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)' }}
          >
            <Image
              src="/hero-retrato.jpg"
              alt="Wesley Franco"
              fill
              preload
              quality={90}
              sizes="(max-width: 768px) 75vw, 460px"
              className="object-cover object-top"
            />
            {/* Escurece a base e dá um leve tom dourado à figura. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-accent/10"
              style={{ mixBlendMode: 'color' }}
            />
            {/* Funde as bordas da figura no fundo: topo e laterais somem, e a
                base dissolve para dentro da página — sem recorte "colado". */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, #0B0B0B 0%, rgba(11,11,11,0) 14%, rgba(11,11,11,0) 56%, rgba(11,11,11,0.85) 84%, #0B0B0B 100%),' +
                  'linear-gradient(90deg, rgba(11,11,11,0.9) 0%, rgba(11,11,11,0) 22%, rgba(11,11,11,0) 78%, rgba(11,11,11,0.9) 100%)',
              }}
            />
          </div>
          </div>
        </div>

        {/* ── Fade inferior: costura a foto e o palco no fundo da página ── */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 z-[15] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(11,11,11,0) 0%, rgba(11,11,11,0.9) 60%, #0B0B0B 100%)',
          }}
        />

        {/* ── Bloco esquerda: assinatura ── */}
        <div
          data-hero-el
          className="absolute left-[6%] top-[38%] z-20 max-w-[300px] hidden md:block will-change-transform"
        >
          <div data-hero-drift className="will-change-transform">
            <p className="uppercase text-[13px] font-medium text-t3 tracking-[0.09em] leading-[2]">
              Desenvolvedor full stack que cria produtos digitais rápidos, bem
              acabados e memoráveis <span className="text-accent">✦</span>
            </p>
          </div>
        </div>

        {/* ── CTA direita: pílula com borda em degradê dourado ──
            O wrapper é o alvo do GSAP na entrada (só transform/opacity, SEM
            transição CSS). O hover mora no <a> interno, com a própria
            transição — separados, os dois transforms nunca se atropelam. Era
            isso que fazia o botão "travar e andar depois" na revelação. */}
        <div
          data-hero-el
          className="absolute right-[6%] top-[36%] z-20 hidden md:block will-change-transform"
        >
          <div data-hero-drift className="will-change-transform">
            <a
              href="#contato"
              onClick={goToContato}
              className="group block rounded-full p-px transition-transform duration-200 ease-out hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(180deg, #C9A84C 0%, #DDB95E 50%, rgba(201,168,76,0.2) 100%)',
              }}
            >
              <span className="block rounded-full bg-bg px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.11em] text-t1 transition-colors duration-200 group-hover:bg-surface">
                Falar comigo
              </span>
            </a>
          </div>
        </div>

        {/* ── Descrição + CTA no mobile: empilhados abaixo do nome ── */}
        <div
          data-hero-el
          className="absolute inset-x-0 bottom-8 z-20 px-6 md:hidden"
        >
          {/* O flex desceu para esta camada junto com o drift: se ficasse na
              de fora, o wrapper viraria filho único e o `gap-6` entre texto e
              botão sumiria. */}
          <div
            data-hero-drift
            className="flex flex-col items-center gap-6 text-center will-change-transform"
          >
            <p className="uppercase text-[12px] font-medium text-t3 tracking-[0.09em] leading-[1.9] max-w-[280px]">
              Desenvolvedor full stack que cria produtos digitais rápidos, bem
              acabados e memoráveis <span className="text-accent">✦</span>
            </p>
            <a
              href="#contato"
              onClick={goToContato}
              className="rounded-full p-px"
              style={{ background: 'linear-gradient(180deg, #C9A84C 0%, #DDB95E 50%, rgba(201,168,76,0.2) 100%)' }}
            >
              <span className="block rounded-full bg-bg px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.11em] text-t1">
                Falar comigo
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
