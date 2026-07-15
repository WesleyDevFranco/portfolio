import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, IM_Fell_Double_Pica } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fell = IM_Fell_Double_Pica({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-fell',
  display: 'swap',
})

/**
 * Decide o modo do intro ANTES do primeiro paint.
 *
 * A intro roda sempre que a página abre; só quem pede `prefers-reduced-motion`
 * cai direto no conteúdo. Precisa rodar aqui (e não no React) porque o servidor
 * manda o overlay visível: se a decisão ficasse para a hidratação, o loader
 * piscaria antes de sumir.
 */
const introScript = `(function(){try{document.documentElement.dataset.intro=matchMedia('(prefers-reduced-motion: reduce)').matches?'none':'flip'}catch(e){document.documentElement.dataset.intro='flip'}})()`

export const metadata: Metadata = {
  title: 'Wesley Franco — Desenvolvedor Full Stack',
  description:
    'Construo aplicações web completas — do backend ao frontend. Foco em código limpo, performance e produtos que realmente funcionam.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: o script inline grava `data-intro` no <html>
    // antes da hidratação, então o servidor nunca terá esse atributo. É o
    // mesmo padrão usado por bibliotecas de tema.
    <html
      lang="pt-BR"
      className={`${plusJakarta.variable} ${fell.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="font-sans bg-bg text-t1">{children}</body>
    </html>
  )
}
