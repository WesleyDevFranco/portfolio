'use client'
import { useRef, useLayoutEffect, ReactNode, CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  stagger?: number
}

/**
 * Reveals its direct children in a staggered ripple when the group scrolls
 * into view. Replaces manual per-item `delay` props — self-adjusts to any
 * number of children. Respects prefers-reduced-motion.
 */
export function Stagger({ children, className = '', style, stagger = 0.09 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = Array.from(el.children) as HTMLElement[]
    if (!targets.length) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [stagger])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
