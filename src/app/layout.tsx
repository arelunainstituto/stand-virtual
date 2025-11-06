import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/gtm'
import { StructuredData } from '@/components/structured-data'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Pinklegion - Stand de Carros Usados em Braga | Financiamento Sem Juros',
    template: '%s | Pinklegion',
  },
  description: siteConfig.description,
  keywords: [
    'carros usados Braga',
    'stand automóvel',
    'viaturas seminovas',
    'carros financiamento sem juros',
    'Pinklegion',
    'comprar carro usado',
    'venda carros usados Portugal',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'Automóveis',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: 'Pinklegion - Stand de Carros Usados em Braga',
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/logo%20pink%20legion.png`,
        width: 1200,
        height: 630,
        alt: 'Pinklegion - Stand de Carros Usados',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinklegion - Stand de Carros Usados em Braga',
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/logo%20pink%20legion.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/images/logo pink legion.png',
  },
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
        <StructuredData />
      </head>
      <body className={inter.className}>
        <GoogleTagManagerBody />
        {children}
      </body>
    </html>
  )
}

