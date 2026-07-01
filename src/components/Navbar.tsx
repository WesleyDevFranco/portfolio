'use client'
import { useState, useEffect } from 'react'

const links = [
  { label: 'Início',      href: '#inicio' },
  { label: 'Projetos',    href: '#projetos' },
  { label: 'Sobre',       href: '#sobre' },
  { label: 'Tecnologias', href: '#tecnologias' },
  { label: 'Contato',     href: '#contato' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 h-14 flex items-center transition-colors duration-300"
        style={{
          background: scrolled ? 'rgba(11,11,11,0.92)' : 'rgba(11,11,11,0.7)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          borderBottom: '1px solid var(--bdr)',
        }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('#inicio')}
            className="font-serif text-base text-t1 tracking-wide cursor-pointer"
          >
            Wesley Franco
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-[13px] text-t3 hover:text-t1 transition-colors duration-150 cursor-pointer"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('#contato')}
              className="text-[12px] font-medium text-t1 px-3.5 py-1.5 rounded-md transition-colors duration-150 hidden sm:block cursor-pointer"
              style={{ border: '1px solid var(--bdr-h)' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.borderColor = 'var(--bdr-h)')}
            >
              Entrar em contato
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <span
                className="block h-px bg-t2 transition-all duration-200"
                style={{ transform: open ? 'translateY(5px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block h-px bg-t2 transition-all duration-200"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="block h-px bg-t2 transition-all duration-200"
                style={{ transform: open ? 'translateY(-5px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="fixed inset-x-0 top-14 z-40 md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: open ? '320px' : '0',
          background: 'rgba(11,11,11,0.97)',
          backdropFilter: 'blur(22px)',
          borderBottom: open ? '1px solid var(--bdr)' : 'none',
        }}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-left text-[15px] text-t2 hover:text-t1 transition-colors py-2.5 border-b cursor-pointer"
              style={{ borderColor: 'var(--bdr)' }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contato')}
            className="mt-3 text-[13px] font-medium text-t1 py-2.5 rounded-md cursor-pointer"
            style={{ border: '1px solid var(--bdr-h)' }}
          >
            Entrar em contato
          </button>
        </nav>
      </div>
    </>
  )
}
