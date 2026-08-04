'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { onIntroDone } from '@/lib/intro'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)


export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useGSAP(() => {

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    ScrollSmoother.create({
      smooth: 1,        // segundos para "alcançar" a posição real do scroll
      effects: true,    // habilita data-speed / data-lag nos elementos
      smoothTouch: 0.1, // no toque quase nada, senão a página parece travada
    })

    return onIntroDone(() => ScrollTrigger.refresh())
  }, { dependencies: [] })

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
