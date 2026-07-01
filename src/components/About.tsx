import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="sobre" style={{ borderTop: '1px solid var(--bdr)', padding: 'clamp(64px,10vw,128px) 0' }}>
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-24 items-start">

          {/* Esquerda sticky */}
          <div className="lg:sticky lg:top-20">
            <Reveal><span className="text-[17px] font-medium tracking-[0.13em] uppercase text-t4 block mb-3">Sobre</span></Reveal>
            <Reveal delay={70}>
              <h2 className="font-serif text-[clamp(36px,4.5vw,52px)] text-t1 leading-[1.05] tracking-[0.01em] mb-6">
                Quem<br />sou eu
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <div className="w-7 h-px bg-accent" />
            </Reveal>
          </div>

          {/* Direita */}
          <div className="space-y-[18px]">
            {[
              'Sou um desenvolvedor Full Stack focado em construir produtos digitais que resolvem problemas reais. Trabalho com todo o ciclo de desenvolvimento — da ideia à produção — entregando aplicações rápidas, organizadas e fáceis de manter.',
              'Tenho experiência com React, Node.js, TypeScript e bancos de dados relacionais e não-relacionais. Mais importante: sei tomar decisões técnicas que fazem sentido para o produto, não apenas para o código.',
              'Trabalho bem com times e com clientes. Gosto de entender o problema antes de escrever a solução, e de comunicar com clareza o que está sendo construído e por quê.',
              'Se você tem um produto para construir — ou um sistema para melhorar — estou disponível para conversar.',
            ].map((text, i) => (
              <Reveal key={i} delay={i * 70}>
                <p className="text-[16.5px] text-t2 leading-[1.85]">{text}</p>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
