'use client'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center pt-14 pb-20"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-center">

          {/* ── Esquerda: texto ── */}
          <div>
            <Reveal>
              <p className="text-[12px] font-medium tracking-[0.1em] uppercase text-t4 mb-5 flex items-center gap-3">
                <span className="block w-6 h-px bg-t4" />
                Desenvolvedor Full Stack
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="font-serif text-[clamp(56px,8vw,104px)] leading-[0.93] tracking-[0.01em] text-t1 mb-8">
                Wesley<br />Franco
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <div className="w-9 h-px bg-accent mb-6" />
              <p className="text-[15px] text-t3 leading-[1.75] max-w-[400px] mb-9">
                Construo aplicações web completas — do backend ao frontend.
                Foco em código limpo, performance e produtos que realmente funcionam.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#projetos"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#projetos')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="inline-flex items-center gap-2 bg-t1 text-bg text-[13px] font-medium px-5 py-2.5 rounded-md hover:bg-t2 transition-all duration-200 hover:-translate-y-px"
                >
                  Ver Projetos
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#contato"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="inline-flex items-center gap-2 text-t2 text-[13px] font-medium px-5 py-2.5 rounded-md transition-all duration-200 hover:text-t1"
                  style={{ border: '1px solid var(--bdr-h)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.28)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--bdr-h)')}
                >
                  Contato
                </a>
              </div>
            </Reveal>
          </div>

          {/* ── Direita: foto ── */}
          <Reveal delay={140} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="w-full max-w-[340px] lg:max-w-none lg:w-[380px] aspect-[4/5] bg-surface rounded-lg overflow-hidden flex items-center justify-center"
                style={{ border: '1px solid var(--bdr-h)', borderLeft: '2px solid #C9A84C' }}
              >
                {/*
                  Para adicionar sua foto, substitua este bloco por:
                  <Image src="/photo.jpg" alt="Wesley Franco" fill className="object-cover" />
                  e adicione o arquivo em /public/photo.jpg
                */}
                <div className="flex flex-col items-center gap-3 select-none">
                  <span className="font-serif text-[64px] text-t4 opacity-30 leading-none tracking-widest">
                    WF
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-t4 opacity-40">
                    Inserir foto aqui
                  </span>
                </div>
              </div>

              {/* Detalhe decorativo deslocado */}
              <div
                className="absolute -bottom-3 -right-3 w-16 h-16 rounded-sm -z-10"
                style={{ border: '1px solid var(--bdr-h)' }}
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
