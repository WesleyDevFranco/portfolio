'use client'
import { useRef, type ElementType, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface Props {
  children: ReactNode
  /** Tag renderizada. É ESTE elemento que o SplitText divide — por isso o
   *  componente renderiza o próprio h2/p/span, e não um wrapper em volta. */
  as?: ElementType
  className?: string
  /** Atraso antes da primeira linha subir, em ms (mesma unidade do Reveal). */
  delay?: number
  /** `lines` para blocos de texto; `words` para títulos curtos. */
  split?: 'lines' | 'words'
  /** De onde a linha entra: `up` sobe de baixo, `right` desliza da direita. */
  from?: 'up' | 'right'
  stagger?: number
  duration?: number
}

/**
 * Revela texto por trás de uma máscara, linha a linha.
 *
 * O `mask` do SplitText embrulha cada unidade num elemento com overflow
 * recortado, então a linha entra de dentro dela — nada de fade genérico. O
 * recorte vale nos dois eixos, então a mesma máscara serve para `up` e
 * `right`; só muda qual propriedade é animada.
 *
 * Diferente do `Reveal`, aqui o texto NÃO começa com opacity 0 no HTML: se o
 * JS falhar, o conteúdo continua legível.
 */
export function TextReveal({
  children,
  as = 'p',
  className,
  delay = 0,
  split = 'lines',
  from = 'up',
  stagger = 0.09,
  duration = 0.9,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      // `innerText` respeita o <br> (vira \n); o textContent que o SplitText usa
      // para montar o aria-label não, e colaria "Quem" em "sou eu".
      const label = el.innerText.replace(/\s+/g, ' ').trim()

      const mm = gsap.matchMedia()

      // Com reduced-motion nem chega a dividir: o texto já está no lugar.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const instance = SplitText.create(el, {
          type: split,
          mask: split,
          linesClass: 'tr-unit',
          wordsClass: 'tr-unit',
          // Re-divide quando as fontes carregam ou a largura muda — sem isso
          // as linhas quebram no lugar errado.
          autoSplit: true,
          // A animação precisa nascer aqui dentro para mirar os elementos
          // recém-criados a cada re-divisão; devolvê-la deixa o SplitText
          // reverter e ressincronizar o tempo sozinho.
          onSplit: (self) => {
            el.setAttribute('aria-label', label)
            return gsap.from(self[split], {
              // 100% da própria largura/altura: a unidade parte inteiramente
              // fora da máscara e desliza para o lugar.
              ...(from === 'right' ? { xPercent: 100 } : { yPercent: 100 }),
              duration,
              ease: 'expo.out',
              stagger,
              delay: delay / 1000,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            })
          },
        })

        return () => instance.revert()
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  const Tag = as
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
