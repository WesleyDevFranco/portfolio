'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextReveal } from './TextReveal'
import { useStackedPanel } from './useStackedPanel'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Planejamento',
    desc: 'Entendo o problema, mapeio requisitos e defino o escopo antes de escrever qualquer linha de código.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Arquitetura',
    desc: 'Defino a estrutura técnica mais adequada, pensando em escalabilidade, manutenção e performance.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Desenvolvimento',
    desc: 'Código limpo e bem organizado, com revisões constantes e atenção a cada detalhe ao longo do processo.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Entrega',
    desc: 'Deploy cuidadoso, monitoramento ativo e suporte contínuo — a responsabilidade não termina no merge.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  // Painel 1 da pilha: fica preso enquanto a Trajetória sobe por cima.
  useStackedPanel(sectionRef)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const cards = gsap.utils.toArray<HTMLElement>('[data-step]')
      if (!cards.length) return

      const mm = gsap.matchMedia()

      // Os cards entram ENQUANTO o painel ainda sobe até o topo. Termina em
      // 'top 15%', antes do pin começar (ver useStackedPanel), com folga para
      // o scrub alcançar — assim a animação acaba antes de qualquer cobertura.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const cardsTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 0.5,
          },
        })
        cardsTl.from(cards, { yPercent: 18, opacity: 0, stagger: 0.12, ease: 'power2.out' })

        return () => {
          cardsTl.scrollTrigger?.kill()
          cardsTl.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="processo"
      // Painel opaco e de tela cheia: precisa cobrir o que está atrás e não
      // deixar sobra de fundo enquanto está preso. O padding é relativo à
      // ALTURA (não à largura, como nas outras seções) porque aqui o conteúdo
      // tem que caber na tela — preso, o que sobra fica cortado e inalcançável.
      className="relative z-0 bg-bg min-h-svh flex items-center py-[clamp(48px,8vh,128px)]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">


        <TextReveal as="h2" delay={70} className="font-serif text-[clamp(34px,4.5vw,58px)] text-t1 mb-3">
          Como eu posso te ajudar
        </TextReveal>
        <TextReveal delay={140} className="text-[16.5px] text-t3 leading-[1.72] max-w-[480px] mb-14">
          Cada solução é feita pensada para o seu produto, e você receberá atualizações reais do progresso.
        </TextReveal>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 rounded-[10px] overflow-hidden"
          style={{ border: '1px solid var(--bdr)' }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              data-step
              className="p-8 lg:p-[36px_28px] transition-colors duration-150 hover:bg-surface group"
              style={{
                borderRight: i < steps.length - 1 ? '1px solid var(--bdr)' : 'none',
              }}
            >
              <div className="text-[14px] font-bold tracking-[0.14em] uppercase text-t4 mb-5">
                {step.num}
              </div>
              <div
                className="w-9 h-9 flex items-center justify-center rounded-[7px] text-t3 mb-5"
                style={{ border: '1px solid var(--bdr-h)' }}
              >
                {step.icon}
              </div>
              <div className="font-serif text-[20px] text-t1 tracking-[0.01em] mb-2.5">
                {step.title}
              </div>
              <p className="text-[17px] text-t3 leading-[1.68]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
