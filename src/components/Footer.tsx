export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="w-full"
      style={{ borderTop: '1px solid var(--bdr)' }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-serif text-[13px] text-t4">Wesley Franco</span>
          <span className="text-[11.5px] text-t4">© {year} — Todos os direitos reservados</span>
        </div>
        <div className="flex items-center gap-5">
          {[
            { label: 'GitHub',   href: 'https://github.com/WesleyDevFranco' },
            { label: 'LinkedIn', href: '#' },
            { label: 'E-mail',   href: 'mailto:wesleycaiobusiness@gmail.com' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[11.5px] text-t4 hover:text-t2 transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
