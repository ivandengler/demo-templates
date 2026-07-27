import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import negocios from '@/data/negocios.json'

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

// ─── Contenido por rubro ─────────────────────────────────────────────────────

function SeccionRestaurant({ cp }: { cp: string }) {
  const platos = [
    { nombre: 'Plato del día', desc: 'Preparado con ingredientes frescos de temporada', precio: '$2.800' },
    { nombre: 'Entrada especial', desc: 'Selección de la casa para compartir', precio: '$1.600' },
    { nombre: 'Postre casero', desc: 'Elaborado diariamente por nuestro chef', precio: '$950' },
  ]
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] mb-3 font-medium" style={{ color: cp }}>Nuestra carta</p>
        <h2 className="text-3xl font-bold mb-12 text-zinc-900">Lo que más piden nuestros clientes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {platos.map((p) => (
            <div key={p.nombre} className="border border-zinc-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-full aspect-[4/3] rounded-xl mb-4 overflow-hidden bg-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&auto=format&fit=crop"
                  alt={p.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg mb-1 text-zinc-900">{p.nombre}</h3>
              <p className="text-zinc-500 text-sm mb-3">{p.desc}</p>
              <p className="text-xl font-bold" style={{ color: cp }}>{p.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SeccionHairSalon({ cp, cs }: { cp: string; cs: string }) {
  const servicios = [
    { nombre: 'Corte y peinado', duracion: '45 min', precio: '$4.500' },
    { nombre: 'Coloración completa', duracion: '2 hs', precio: '$8.000' },
    { nombre: 'Mechas / Balayage', duracion: '2:30 hs', precio: '$12.000' },
    { nombre: 'Tratamiento capilar', duracion: '1 hs', precio: '$5.500' },
    { nombre: 'Peinado de evento', duracion: '1 hs', precio: '$6.000' },
    { nombre: 'Manicura y pedicura', duracion: '1 hs', precio: '$3.800' },
  ]
  return (
    <section className="py-20 px-6" style={{ backgroundColor: cs }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] mb-3 font-medium" style={{ color: cp }}>Servicios</p>
        <h2 className="text-3xl font-bold mb-12 text-zinc-900">¿Qué necesitás hoy?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {servicios.map((s) => (
            <div key={s.nombre} className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
              <div>
                <p className="font-semibold text-zinc-900">{s.nombre}</p>
                <p className="text-zinc-400 text-sm">{s.duracion}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold" style={{ color: cp }}>{s.precio}</p>
                <p className="text-xs text-zinc-400">por sesión</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SeccionGym({ cp, cs }: { cp: string; cs: string }) {
  const clases = [
    { nombre: 'Musculación', horario: 'Lun a Vie · 7:00 – 22:00', cupos: 'Sin límite' },
    { nombre: 'Spinning', horario: 'Lun, Mié, Vie · 9:00 y 19:00', cupos: '20 cupos' },
    { nombre: 'CrossFit', horario: 'Mar, Jue · 18:00 y 20:00', cupos: '15 cupos' },
    { nombre: 'Yoga', horario: 'Mié y Sáb · 8:00 y 10:00', cupos: '12 cupos' },
    { nombre: 'Zumba', horario: 'Lun, Mié · 20:00', cupos: '25 cupos' },
    { nombre: 'Pilates', horario: 'Mar, Jue, Sáb · 9:00', cupos: '10 cupos' },
  ]
  return (
    <section className="py-20 px-6" style={{ backgroundColor: cs }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] mb-3 font-medium" style={{ color: cp }}>Clases</p>
        <h2 className="text-3xl font-bold mb-12 text-zinc-900">Horarios y actividades</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clases.map((c) => (
            <div key={c.nombre} className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-lg mb-1" style={{ color: cp }}>{c.nombre}</h3>
              <p className="text-zinc-600 text-sm">{c.horario}</p>
              <p className="text-zinc-400 text-xs mt-2">{c.cupos}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SeccionGeneral({ cp, cs, rubro }: { cp: string; cs: string; rubro: string }) {
  const config = {
    hardware_store: {
      titulo: 'Nuestros servicios',
      items: ['Materiales de construcción', 'Herramientas eléctricas y manuales', 'Pinturería y revestimientos', 'Sanitarios y plomería', 'Electricidad e iluminación', 'Atención personalizada'],
    },
    veterinary_care: {
      titulo: 'Servicios veterinarios',
      items: ['Consultas y diagnóstico', 'Cirugías programadas y de urgencia', 'Vacunación y desparasitación', 'Peluquería canina y felina', 'Internación y cuidados', 'Atención de urgencias 24 hs'],
    },
  }
  const data = config[rubro as keyof typeof config] ?? config.hardware_store
  return (
    <section className="py-20 px-6" style={{ backgroundColor: cs }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] mb-3 font-medium" style={{ color: cp }}>Lo que hacemos</p>
        <h2 className="text-3xl font-bold mb-12 text-zinc-900">{data.titulo}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.items.map((item) => (
            <div key={item} className="bg-white rounded-xl p-5 flex items-start gap-3 shadow-sm">
              <span className="text-lg mt-0.5" style={{ color: cp }}>✓</span>
              <p className="text-zinc-700 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const n = negocios.find((x) => x.slug === slug)
  if (!n) notFound()

  const cp = n.colores.primary
  const cs = n.colores.secondary

  const style = { '--cp': cp, '--cs': cs } as CSSProperties

  return (
    <div style={style} className="min-h-screen bg-white font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10" style={{ backgroundColor: cp }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-white font-bold text-lg tracking-tight">{n.nombre}</span>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
            {n.rubro === 'restaurant' && <><a href="#servicios" className="hover:text-white">Menú</a><a href="#contacto" className="hover:text-white">Contacto</a></>}
            {n.rubro === 'hair_salon' && <><a href="#servicios" className="hover:text-white">Servicios</a><a href="#contacto" className="hover:text-white">Turnos</a></>}
            {n.rubro === 'gym' && <><a href="#servicios" className="hover:text-white">Clases</a><a href="#contacto" className="hover:text-white">Membresías</a></>}
            {(n.rubro === 'hardware_store' || n.rubro === 'veterinary_care') && <><a href="#servicios" className="hover:text-white">Servicios</a><a href="#contacto" className="hover:text-white">Contacto</a></>}
            <a
              href="#contacto"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full font-medium transition-colors"
            >
              {n.rubro === 'hair_salon' ? 'Reservar turno' : n.rubro === 'restaurant' ? 'Ver menú' : 'Consultar'}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={n.foto_url}
          alt={n.nombre}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${cp}e6 0%, ${cp}99 50%, transparent 100%)` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <p className="text-white/70 text-sm uppercase tracking-[0.3em] mb-4 font-medium">
              {n.rubro === 'restaurant' ? 'Gastronomía · Rosario' :
               n.rubro === 'hair_salon' ? 'Salón de belleza · Rosario' :
               n.rubro === 'gym' ? 'Centro de fitness · Rosario' :
               n.rubro === 'hardware_store' ? 'Ferretería y materiales · Rosario' :
               'Veterinaria · Rosario'}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Bienvenidos a<br />{n.nombre}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              {n.rubro === 'restaurant' ? 'Cocina de autor con los mejores ingredientes de la región. Abrimos todos los días para que disfrutes de una experiencia única.' :
               n.rubro === 'hair_salon' ? 'Tu imagen es nuestra pasión. Servicios de peluquería y estética de primer nivel, con los mejores profesionales de Rosario.' :
               n.rubro === 'gym' ? 'Alcanzá tus objetivos con equipamiento de última generación y los mejores instructores certificados de la ciudad.' :
               n.rubro === 'hardware_store' ? 'Todo lo que necesitás para tu obra o reparación. Stock permanente, atención personalizada y los mejores precios.' :
               'La salud de tu mascota en las mejores manos. Atención profesional, con amor y dedicación, todos los días.'}
            </p>
            <a
              href="#contacto"
              className="inline-block text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 border-2 border-white/30 hover:bg-white/10"
            >
              {n.rubro === 'hair_salon' ? 'Reservar turno →' :
               n.rubro === 'restaurant' ? 'Ver menú →' :
               'Contactanos →'}
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN ESPECÍFICA POR RUBRO */}
      <section id="servicios">
        {n.rubro === 'restaurant'     && <SeccionRestaurant cp={cp} />}
        {n.rubro === 'hair_salon'     && <SeccionHairSalon cp={cp} cs={cs} />}
        {n.rubro === 'gym'            && <SeccionGym cp={cp} cs={cs} />}
        {(n.rubro === 'hardware_store' || n.rubro === 'veterinary_care') && <SeccionGeneral cp={cp} cs={cs} rubro={n.rubro} />}
      </section>

      {/* CTA / CONTACTO */}
      <section id="contacto" className="py-24 px-6 text-white text-center" style={{ backgroundColor: cp }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            {n.rubro === 'hair_salon' ? '¿Cuándo te damos turno?' :
             n.rubro === 'restaurant' ? '¿Hacemos una reserva?' :
             n.rubro === 'gym' ? '¿Empezamos hoy?' :
             '¿En qué te podemos ayudar?'}
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Encontranos en {n.direccion}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${n.telefono}`}
              className="bg-white font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
              style={{ color: cp }}
            >
              Escribinos por WhatsApp
            </a>
            <a
              href={`tel:+${n.telefono}`}
              className="border-2 border-white/40 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              Llamar al local
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 bg-zinc-950 text-zinc-500 text-sm text-center">
        <p>{n.nombre} · {n.direccion}</p>
        <p className="mt-1 text-zinc-600">© 2025 · Sitio web profesional</p>
      </footer>

    </div>
  )
}
