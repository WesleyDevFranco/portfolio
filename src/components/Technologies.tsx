import { Reveal } from './Reveal'
import { Stagger } from './Stagger'

const categories = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML & CSS'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'APIs REST', 'Prisma ORM', 'JWT & Auth'],
  },
  {
    title: 'Banco de Dados',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    title: 'Ferramentas',
    items: ['Git & GitHub', 'Docker', 'Linux', 'Figma', 'VS Code'],
  },
]

export function Technologies() {
  return (
    <section id="tecnologias" style={{ borderTop: '1px solid var(--bdr)', padding: 'clamp(64px,10vw,128px) 0' }}>
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">

        <Reveal><span className="text-[17px] font-medium tracking-[0.13em] uppercase text-t4 block mb-3">Stack</span></Reveal>
        <Reveal delay={70}><h2 className="font-serif text-[clamp(34px,4.5vw,58px)] text-t1 mb-3">Tecnologias</h2></Reveal>
        <Reveal delay={140}><p className="text-[16.5px] text-t3 leading-[1.72] max-w-[480px] mb-14">Ferramentas que utilizo para construir aplicações modernas, escaláveis e de alta performance.</p></Reveal>

        <Stagger
          className="grid grid-cols-2 lg:grid-cols-4 rounded-[10px] overflow-hidden"
          style={{ border: '1px solid var(--bdr)' }}
        >
          {categories.map((cat, i) => (
              <div
                key={cat.title}
                className="p-8 lg:p-[34px_30px]"
                style={{
                  borderRight: i < categories.length - 1 ? '1px solid var(--bdr)' : 'none',
                  /* stack 2-col: right border only on odd-indexed items */
                  ...(i % 2 === 0 && i !== categories.length - 1
                    ? {}
                    : {}),
                }}
              >
                <h4 className="text-[14px] font-semibold tracking-[0.13em] uppercase text-t4 mb-5">
                  {cat.title}
                </h4>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[17px] text-t2">
                      <span className="w-[3px] h-[3px] rounded-full bg-t4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </Stagger>
      </div>
    </section>
  )
}
