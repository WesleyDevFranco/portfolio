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

export const metadata: Metadata = {
  title: 'Wesley Franco — Desenvolvedor Full Stack',
  description:
    'Construo aplicações web completas — do backend ao frontend. Foco em código limpo, performance e produtos que realmente funcionam.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} ${fell.variable}`}>
      <body className="font-sans bg-bg text-t1">{children}</body>
    </html>
  )
}
