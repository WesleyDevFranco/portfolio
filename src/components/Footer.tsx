export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="w-full"
      style={{ borderTop: '1px solid var(--bdr)' }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex items-center justify-center gap-2">
        <span className="font-serif text-[17px] text-t4">Wesley Franco</span>
        <span className="text-t4 opacity-40">·</span>
        <span className="text-[17.5px] text-t4">© {year} — Todos os direitos reservados</span>
      </div>
    </footer>
  )
}
