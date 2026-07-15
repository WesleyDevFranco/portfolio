/**
 * Coordenação do intro (loader → Hero).
 *
 * Dois componentes precisam concordar sobre o que vai acontecer com o título:
 * - `flip`: o loader roda e o nome VOA da tela de loading até o título do Hero.
 *           O Hero não deve animar o título sozinho — ele só aparece no fim.
 * - `none`: sem loader (reduced-motion). O Hero faz a própria entrada com
 *           SplitText.
 *
 * Quem DECIDE o modo é o script inline no <head> (ver `layout.tsx`), que roda
 * antes do primeiro paint e grava `data-intro` no <html>. Aqui apenas lemos
 * essa decisão — fonte única da verdade, já resolvida quando o React monta.
 */

const INTRO_DONE = 'wf:intro-done'

export type IntroMode = 'flip' | 'none'

let mode: IntroMode | null = null
let done = false

export function resolveIntroMode(): IntroMode {
  if (mode !== null) return mode
  mode = document.documentElement.dataset.intro === 'flip' ? 'flip' : 'none'
  return mode
}

export function markIntroDone() {
  if (done) return
  done = true
  window.dispatchEvent(new Event(INTRO_DONE))
}

/** Executa `cb` quando o intro terminar — imediatamente, se já terminou. */
export function onIntroDone(cb: () => void) {
  if (done) {
    cb()
    return () => {}
  }
  const handler = () => cb()
  window.addEventListener(INTRO_DONE, handler, { once: true })
  return () => window.removeEventListener(INTRO_DONE, handler)
}
