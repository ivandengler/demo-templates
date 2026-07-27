import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import negocios from '@/data/negocios.json'
import FoodDemo from './FoodDemo'
import BarberoDemo from './BarberoDemo'
import InfoDemo from './InfoDemo'

export const dynamicParams = false

export function generateStaticParams() {
  return negocios.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const n = negocios.find((x) => x.slug === slug)
  return { title: n ? `${n.nombre} — Tu sitio web` : 'Demo' }
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const n = negocios.find((x) => x.slug === slug)
  if (!n) notFound()

  if (n.rubro === 'restaurant') {
    return <FoodDemo nombre={n.nombre} />
  }

  if (n.rubro === 'hair_salon') {
    return <BarberoDemo nombre={n.nombre} direccion={n.direccion} telefono={n.telefono} />
  }

  return <InfoDemo nombre={n.nombre} />
}
