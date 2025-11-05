import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/gtm'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pinklegion - Carros Usados',
  description: 'Encontre o carro dos seus sonhos na Pinklegion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <head>
        <GoogleTagManagerHead />
      </head>
      <body className={inter.className}>
        <GoogleTagManagerBody />
        {children}
      </body>
    </html>
  )
}

