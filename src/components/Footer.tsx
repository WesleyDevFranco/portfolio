export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="w-full"
      style={{ borderTop: '1px solid var(--bdr)' }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-nowrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="font-serif text-[17px] text-t4">Wesley Franco</span>
          <span className="text-t4 opacity-40">·</span>
          <span className="text-[17.5px] text-t4">© {year} — Todos os direitos reservados</span>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          {[
            { label: 'GitHub',   href: 'https://github.com/WesleyDevFranco' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wesley-franco-dev/' },
            { label: 'E-mail',   href: 'mailto:francowesley4@gmail.com' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[17.5px] text-t4 hover:text-t2 transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
