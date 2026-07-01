'use client'
import { Reveal } from './Reveal'
import { ReactNode } from 'react'

function Icon({ children }: { children: ReactNode }) {
  return <div className="w-7 h-7 text-t3 mb-3.5">{children}</div>
}

const items = [
  {
    title: 'Código Limpo',
    desc: 'Código legível, bem estruturado e organizado — fácil de manter, evoluir e qualquer dev compreender.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    title: 'Boas Práticas',
    desc: 'SOLID, DRY, Clean Architecture — princípios de engenharia aplicados de forma consistente.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    title: 'Performance',
    desc: 'Aplicações otimizadas em todas as camadas — do banco de dados à interface, sem gargalos.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  },
  {
    title: 'Responsividade',
    desc: 'Interfaces que funcionam perfeitamente em qualquer dispositivo, mantendo a mesma qualidade visual.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2"/></svg>,
  },
  {
    title: 'Arquitetura Escalável',
    desc: 'Sistemas projetados para crescer sem reescritas — decisões pensadas no longo prazo desde o início.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
  },
  {
    title: 'Documentação',
    desc: 'Código, APIs e decisões técnicas documentadas para facilitar colaboração e continuidade do projeto.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
]

export function Differentials() {
  return (
    <section id="diferenciais" style={{ borderTop: '1px solid var(--bdr)', padding: 'clamp(64px,10vw,128px) 0' }}>
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">

        <Reveal><span className="text-[17px] font-medium tracking-[0.13em] uppercase text-t4 block mb-3">Diferenciais</span></Reveal>
        <Reveal delay={70}><h2 className="font-serif text-[clamp(34px,4.5vw,58px)] text-t1 mb-14">O que você pode esperar</h2></Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 70}>
              <div
                className="bg-surface p-6 rounded-[9px] transition-all duration-200 hover:bg-surface-h h-full"
                style={{ border: '1px solid var(--bdr)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr-h)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr)')}
              >
                <Icon>{item.icon}</Icon>
                <div className="font-serif text-[17px] text-t1 tracking-[0.01em] mb-1.5">{item.title}</div>
                <p className="text-[16.5px] text-t3 leading-[1.62]">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
