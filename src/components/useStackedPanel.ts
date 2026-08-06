'use client'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Quanto tempo (em frações da altura da tela) um painel fica sozinho, ocupando
 * 100% da tela, antes do próximo começar a cobri-lo.
 *
 * Este número precisa bater com a margem `md:motion-safe:mt-[50vh]` aplicada
 * nos painéis que cobrem — é ela que segura o painel seguinte fora da tela
 * durante a pausa. O `end` abaixo lê essa distância do próprio DOM, então
 * mudar a margem já ajusta o scroll junto.
 */
export const PANEL_DWELL = 0.5

/**
 * Prende a seção no topo enquanto a seguinte sobe por cima dela — o efeito de
 * painéis empilhados.
 *
 * `pinSpacing: false` é o que faz o próximo painel cobrir este em vez de ser
 * empurrado para baixo. Só no desktop e com movimento permitido: em tela de
 * toque, pinar briga com o scroll nativo.
 *
 * @param last Painel final, que ninguém cobre. Usa espaçador para segurar a
 *             tela e depois liberar o rodapé no fluxo normal.
 */
export function useStackedPanel(ref: RefObject<HTMLElement | null>, { last = false } = {}) {
  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => {
            const next = section.nextElementSibling
            if (!last && next) {
              // Distância exata que o próximo painel precisa andar para cobrir
              // este por inteiro. Vem do DOM, então já embute a margem de
              // respiro dele — não há número mágico para manter em sincronia.
              return '+=' + (next.getBoundingClientRect().top - section.getBoundingClientRect().top)
            }
            return '+=' + window.innerHeight * PANEL_DWELL
          },
          pin: true,
          pinSpacing: last,
          invalidateOnRefresh: true,
        })

        return () => st.kill()
      })

      return () => mm.revert()
    },
    { scope: ref },
  )
}
