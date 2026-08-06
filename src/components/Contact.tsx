'use client'
import { useRef } from 'react'
import { TextReveal } from './TextReveal'
import { useStackedPanel } from './useStackedPanel'

const links = [
  {
    label: 'Enviar e-mail',
    href: 'mailto:francowesley4@gmail.com',
    accent: true,
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/wesley-franco-dev/',
    accent: false,
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/WesleyDevFranco',
    accent: false,
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>,
  },
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useStackedPanel(sectionRef, { last: true })

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="relative z-20 bg-bg min-h-svh flex items-center py-[clamp(48px,8vh,128px)] panel-dwell"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 text-center">
        <TextReveal
          as="h2"
          from="right"
          className="font-serif text-[clamp(38px,5.5vw,72px)] text-t1 leading-[1.05] tracking-[0.01em] mb-5"
        >
          Precisa de um Desenvolvedor<br />com essas características?
        </TextReveal>
        <TextReveal
          delay={140}
          from="right"
          className="text-[16.5px] text-t3 leading-[1.72] max-w-[380px] mx-auto mb-12"
        >
          Você pode me encontrar em qualquer uma das plataformas abaixo!
        </TextReveal>

        {/* Botões fixos: sem revelação, para o movimento ficar só no texto. */}
        <div className="flex flex-wrap gap-2.5 justify-center">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[17px] font-medium px-5 py-3 rounded-md transition-all duration-180 hover:-translate-y-0.5"
                style={
                  l.accent
                    ? { border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }
                    : { border: '1px solid var(--bdr-h)', color: '#DADADA' }
                }
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  if (l.accent) {
                    el.style.background = 'rgba(201,168,76,0.06)'
                    el.style.borderColor = '#C9A84C'
                  } else {
                    el.style.color = '#FFFFFF'
                    el.style.borderColor = 'rgba(255,255,255,0.26)'
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  if (l.accent) {
                    el.style.background = ''
                    el.style.borderColor = 'rgba(201,168,76,0.3)'
                  } else {
                    el.style.color = '#DADADA'
                    el.style.borderColor = 'var(--bdr-h)'
                  }
                }}
              >
                {l.icon}
                {l.label}
              </a>
          ))}
        </div>
      </div>
    </section>
  )
}
