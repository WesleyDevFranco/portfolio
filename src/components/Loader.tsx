'use client'
import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import {
  resolveIntroMode,
  markIntroFly,
  markIntroDone,
  LOAD_DURATION,
  FLY_DURATION,
} from '@/lib/intro'

gsap.registerPlugin(SplitText)

const WORDS = ['Wesley', 'Franco'] as const

/** Duração do "pop" de cada letra (dourado → branco + escala). */
const POP_DURATION = 0.35

/**
 * Intro: "Wesley Franco" centralizado em serifa dourada, com barra dourada no
 * topo. Conforme a barra avança (1.5s), as letras viram brancas uma a uma, cada
 * qual com um "pop" de escala. No fim, cada palavra VOA até pousar exatamente
 * sobre o título do Hero — crescendo por `fontSize` real, não por transform
 * scale (que esticaria os glifos) — e o overlay se dissolve revelando a página.
 *
 * Roda sempre que a página abre, exceto com `prefers-reduced-motion`.
 */
export function Loader() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const overlay = overlayRef.current
    const nameEl = nameRef.current
    if (!overlay || !nameEl) return

    if (resolveIntroMode() === 'none') {
      gsap.set(overlay, { display: 'none' })
      markIntroDone()
      return
    }

    document.body.style.overflow = 'hidden'

    const loaderWords = WORDS.map((w) =>
      nameEl.querySelector<HTMLElement>(`[data-loader-word="${w}"]`),
    )
    const heroWords = WORDS.map((w) =>
      document.querySelector<HTMLElement>(`[data-hero-word="${w}"]`),
    )
    const canFly = loaderWords.every(Boolean) && heroWords.every(Boolean)

    // Quebra cada palavra em caracteres. Feito por palavra (e não no container)
    // para os spans [data-loader-word] continuarem intactos como alvos do voo.
    const splits = canFly ? loaderWords.map((w) => new SplitText(w!, { type: 'chars' })) : []
    const chars = splits.flatMap((s) => s.chars)

    let splitsReverted = false
    const revertSplits = () => {
      if (splitsReverted) return
      splitsReverted = true
      splits.forEach((s) => s.revert())
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Esconder o overlay e revelar o título do Hero no MESMO frame,
          // senão pisca — as palavras do loader estão pousadas exatamente
          // em cima do título real.
          gsap.set(overlay, { display: 'none' })
          document.body.style.overflow = ''
          markIntroDone()
        },
      })

      tl.fromTo(
        nameEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        0,
      ).to(barRef.current, { scaleX: 1, duration: LOAD_DURATION, ease: 'none' }, 0)

      // Letra a letra, no ritmo da barra: dourado → branco com um "pop" de
      // escala. O stagger é calculado para a última letra fechar junto com a
      // barra, em vez de estourar o tempo de carregamento.
      if (chars.length) {
        const each = chars.length > 1 ? (LOAD_DURATION - POP_DURATION) / (chars.length - 1) : 0
        tl.to(
          chars,
          {
            keyframes: [
              { scale: 1.28, color: '#FFFFFF', duration: POP_DURATION * 0.45, ease: 'power2.out' },
              { scale: 1, duration: POP_DURATION * 0.55, ease: 'power2.inOut' },
            ],
            stagger: { each },
          },
          0,
        )
      }

      if (canFly) {
        tl.add(() => {
          // Dispara junto com o voo: o Hero sobe seus elementos no mesmo
          // intervalo, para tudo assentar no mesmo instante.
          markIntroFly()

          // As letras já chegaram brancas: desfaz a divisão para cada palavra
          // voltar a ser um texto único — exatamente como o <span> do Hero.
          // Voar caractere a caractere renderiza diferente do destino e o
          // pouso nunca fecharia.
          revertSplits()
          gsap.set(loaderWords, { color: '#FFFFFF' })

          // O fade-in deixou um transform no container, e um transform em
          // QUALQUER ancestral faz `position: fixed` ancorar nele em vez de na
          // viewport — as palavras voariam para coordenadas erradas.
          gsap.set(nameEl, { clearProps: 'transform,willChange' })

          // Medir TUDO antes de tirar qualquer palavra do fluxo — a primeira a
          // virar `fixed` faria a outra deslizar e corromperia a medida.
          const from = loaderWords.map((w) => w!.getBoundingClientRect())
          const to = heroWords.map((w) => w!.getBoundingClientRect())
          const toSize = heroWords.map((w) => parseFloat(getComputedStyle(w!).fontSize))

          loaderWords.forEach((word, i) => {
            gsap.set(word!, {
              position: 'fixed',
              margin: 0,
              left: from[i].left,
              top: from[i].top,
            })
          })

          // Cresce a FONTE de verdade (o navegador re-renderiza os glifos em
          // cada tamanho) em vez de aplicar transform scale, que esticaria o
          // texto — as caixas do loader e do Hero têm proporções diferentes.
          loaderWords.forEach((word, i) => {
            gsap.to(word!, {
              left: to[i].left,
              top: to[i].top,
              fontSize: toSize[i],
              duration: FLY_DURATION,
              ease: 'power2.inOut',
            })
          })
        }, LOAD_DURATION)
          .to(barRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' }, LOAD_DURATION)
          // Dissolve o fundo do overlay para a página aparecer enquanto as
          // palavras ainda estão voando.
          .to(
            overlay,
            { backgroundColor: 'rgba(11,11,11,0)', duration: 0.8, ease: 'power2.inOut' },
            LOAD_DURATION + 0.15,
          )
          // Segura a timeline até o voo (que roda fora dela) terminar.
          .to({}, { duration: FLY_DURATION + 0.1 }, LOAD_DURATION)
      } else {
        tl.to(overlay, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' })
      }
    }, overlayRef)

    return () => {
      ctx.revert()
      revertSplits()
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      {/* Sem JS o overlay nunca sairia — esconde de cara */}
      <noscript>
        <style>{`.wf-loader { display: none !important; }`}</style>
      </noscript>

      <div
        ref={overlayRef}
        className="wf-loader fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        aria-hidden="true"
      >
        {/* Barra de progresso — topo da tela, sempre dourada */}
        <div
          ref={barRef}
          className="absolute top-0 left-0 h-[2px] w-full bg-accent origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* leading e tracking espelham o <h1> do Hero de propósito: as palavras
            voam daqui até lá, e caixas com proporções diferentes fariam o texto
            pousar desalinhado. */}
        <div
          ref={nameRef}
          className="flex gap-[0.28em] font-serif text-[clamp(30px,4.5vw,56px)] leading-[0.93] tracking-[0.01em]"
          style={{ opacity: 0 }}
        >
          {WORDS.map((w) => (
            <span key={w} data-loader-word={w} className="text-accent">
              {w}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
