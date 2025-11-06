import type { Metadata, ResolvingMetadata } from 'next'
import { ReactNode } from 'react'
import { mockVehicles } from '@/data/mock-vehicles'
import { siteConfig } from '@/lib/site-config'

type Params = {
  id: string
}

function getVehicleMeta(id: string) {
  const vehicle = mockVehicles.find((item) => item.id === id)

  if (!vehicle) {
    return {
      title: `Detalhes da viatura ${id}`,
      description:
        'Consulte detalhes completos, fotos e condições de financiamento das viaturas disponíveis na Pinklegion.',
      image: `${siteConfig.url}/images/logo%20pink%20legion.png`,
    }
  }

  return {
    title: `${vehicle.marca} ${vehicle.modelo} ${vehicle.ano}`,
    description: `Veja fotos, preço e características do ${vehicle.marca} ${vehicle.modelo} ${vehicle.ano} disponível na Pinklegion.`,
    image: vehicle.imagem || `${siteConfig.url}/images/logo%20pink%20legion.png`,
  }
}

export async function generateMetadata(
  { params }: { params: Params },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { title, description, image } = getVehicleMeta(params.id)

  return {
    title,
    description,
    alternates: {
      canonical: `/viaturas/${params.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/viaturas/${params.id}`,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [image],
      card: 'summary_large_image',
    },
  }
}

export default function VehicleLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

