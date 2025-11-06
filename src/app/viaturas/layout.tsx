import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Viaturas Usadas em Braga',
  description:
    'Veja o stock atualizado de carros usados da Pinklegion com financiamento sem juros e garantia incluída.',
  alternates: {
    canonical: '/viaturas',
  },
  openGraph: {
    title: 'Viaturas Pinklegion',
    description:
      'Encontre carros seminovos inspecionados, com garantia e condições especiais na Pinklegion Braga.',
    url: `${siteConfig.url}/viaturas`,
  },
}

export default function ViaturasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

