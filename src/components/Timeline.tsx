import { Reveal } from './Reveal'

const events = [
  { year: '2023', title: 'Primeiros projetos', desc: 'Início da jornada no desenvolvimento web, construção dos fundamentos com HTML, CSS, JavaScript e os primeiros projetos com React e Node.js.', current: false },
  { year: '2024', title: 'Projetos profissionais', desc: 'Projetos mais complexos, aprofundamento em TypeScript, bancos de dados relacionais, autenticação e arquitetura de APIs REST robustas.', current: false },
  { year: '2025', title: 'Desenvolvimento Full Stack consolidado', desc: 'Consolidação como desenvolvedor Full Stack com projetos de ponta a ponta, Docker, deployment em produção e boas práticas de engenharia.', current: false },
  { year: '2026', title: 'Projetos próprios e crescimento', desc: 'Foco em projetos autorais de maior impacto, aprendizado contínuo e soluções cada vez mais robustas e escaláveis.', current: true },
]

export function Timeline() {
  return (
    <section id="trajetoria" style={{ borderTop: '1px solid var(--bdr)', padding: 'clamp(64px,10vw,128px) 0' }}>
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">

        <Reveal><span className="text-[11px] font-medium tracking-[0.13em] uppercase text-t4 block mb-3">Trajetória</span></Reveal>
        <Reveal delay={70}><h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-t1 mb-14">Linha do Tempo</h2></Reveal>

        <Reveal delay={70}>
          <div className="relative pl-7 md:pl-8">
            {/* Linha vertical */}
            <div
              className="absolute left-0 top-3 bottom-3 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--bdr-h), var(--bdr), transparent)' }}
            />

            <div className="space-y-11">
              {events.map((ev) => (
                <div key={ev.year} className="grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr] gap-7 md:gap-10 relative">
                  {/* Dot */}
                  <span
                    className="absolute -left-[29px] top-[7px] w-[7px] h-[7px] rounded-full"
                    style={{
                      background: ev.current ? '#C9A84C' : '#3A3A3A',
                      boxShadow: ev.current ? '0 0 0 3px rgba(201,168,76,0.14)' : '0 0 0 3px rgba(255,255,255,0.03)',
                    }}
                  />

                  <span
                    className="text-[11.5px] font-semibold pt-0.5"
                    style={{ color: ev.current ? '#C9A84C' : '#3A3A3A' }}
                  >
                    {ev.year}
                  </span>

                  <div>
                    <h4 className="font-serif text-[15.5px] text-t1 tracking-[0.01em] mb-1.5">{ev.title}</h4>
                    <p className="text-[13px] text-t3 leading-[1.68]">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
