'use client'
import { useInView } from '@/hooks/useInView'
import { ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}

export function Reveal({ children, delay = 0, className = '', style }: Props) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
