'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Waves, Sun, Wind, Users, Star, ChevronDown, Phone, Mail, Globe, MessageCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const packages = [
  {
    name: "Escapada Express",
    days: 7,
    price: 1890,
    level: "Principiante",
    includes: ["Vuelos ida y vuelta", "Hotel beachfront 4★", "5 clases de surf", "Traslados aeropuerto", "Seguro de viaje"],
    featured: false,
  },
  {
    name: "Inmersión Surf",
    days: 14,
    price: 3200,
    level: "Intermedio",
    includes: ["Vuelos ida y vuelta", "Villa privada frente al mar", "Clases ilimitadas", "Excursiones incluidas", "Traslados y seguro", "Chef personal 3 noches"],
    featured: true,
  },
  {
    name: "Expedición Total",
    days: 21,
    price: 4800,
    level: "Avanzado",
    includes: ["Vuelos business", "Resort premium 5★", "Coaching profesional", "4 destinos diferentes", "Equipo de surf incluido", "Fotografía y video"],
    featured: false,
  },
]

const testimonials = [
  { name: "Martina García", location: "Buenos Aires", text: "La mejor experiencia de mi vida. Las olas de Koh Lanta son increíbles y los instructores son de primera. Ya estoy pensando en volver.", stars: 5, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop" },
  { name: "Lucas Fernández", location: "Rosario", text: "Nunca había surfeado y en una semana ya estaba parándome en la tabla. El equipo es increíble y Tailandia es un paraíso.", stars: 5, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop" },
  { name: "Sofía Rodríguez", location: "Córdoba", text: "Fui con mi pareja y fue el viaje más memorable. Paisajes, gastronomía, surf y una organización impecable. 100% recomendado.", stars: 5, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop" },
]

const gallery = [
  "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80&auto=format&fit=crop",
  "https://images.pexels.com/photos/1654696/pexels-photo-1654696.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536768139911-e290a59011e4?w=600&q=80&auto=format&fit=crop",
  "https://images.pexels.com/photos/3338597/pexels-photo-3338597.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=600",
]

export default function SurfPage() {
  const [formSent, setFormSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', package: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
  }

  return (
    <div className="font-sans bg-white text-zinc-900">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B2040]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="text-cyan-400 w-5 h-5" />
            <span className="text-white font-bold text-lg tracking-tight">WaveSoul Thailand</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#destino" className="hover:text-white transition-colors">Destino</a>
            <a href="#paquetes" className="hover:text-white transition-colors">Paquetes</a>
            <a href="#galeria" className="hover:text-white transition-colors">Galería</a>
            <a href="#contacto" className="bg-cyan-500 text-white px-4 py-2 rounded-full hover:bg-cyan-400 transition-colors font-medium">Reservar</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1920&q=85&auto=format&fit=crop"
          alt="Surf en Tailandia"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2040]/70 via-[#0B2040]/50 to-[#0B2040]/80" />

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-6 font-medium"
          >
            Viajes de surf · Tailandia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
          >
            Tu ola perfecta te
            <br />
            <span className="text-cyan-400">espera en Tailandia</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Paquetes de surf todo incluido para todos los niveles. Destinos exclusivos, instructores certificados y experiencias que cambian vidas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#paquetes" className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105">
              Ver paquetes
            </a>
            <a href="#galeria" className="border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-all hover:bg-white/10">
              Ver galería
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/50 w-6 h-6" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0B2040] py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "500+", label: "Viajeros al año" },
            { value: "12", label: "Destinos en Tailandia" },
            { value: "98%", label: "Satisfacción" },
            { value: "8 años", label: "De experiencia" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-cyan-400 mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUÉ TAILANDIA */}
      <section id="destino" className="py-24 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-cyan-600 text-sm uppercase tracking-[0.3em] mb-3">El destino</p>
            <h2 className="text-4xl font-bold mb-4">¿Por qué Tailandia?</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">El sudeste asiático ofrece condiciones únicas para el surf durante todo el año, con una cultura y gastronomía que no encontrarás en ningún otro lugar.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Waves className="w-8 h-8 text-cyan-500" />, title: "Olas todo el año", desc: "Las corrientes del Golfo de Tailandia generan olas perfectas en cada estación. Siempre hay un spot activo." },
              { icon: <Sun className="w-8 h-8 text-cyan-500" />, title: "Clima tropical", desc: "Con temperaturas entre 25°C y 32°C durante todo el año, el agua es una delicia y la experiencia, inigualable." },
              { icon: <Users className="w-8 h-8 text-cyan-500" />, title: "Instructores certificados", desc: "Todos nuestros coaches tienen certificación ISA. Principiantes y avanzados tienen programas adaptados a su nivel." },
              { icon: <Wind className="w-8 h-8 text-cyan-500" />, title: "Spots exclusivos", desc: "Accedemos a spots poco conocidos, alejados del turismo masivo. Olas para vos solo." },
              { icon: <Star className="w-8 h-8 text-cyan-500" />, title: "Alojamiento premium", desc: "Hoteles y villas seleccionados por su ubicación y calidad. Siempre frente al mar, siempre a los mejores precios." },
              { icon: <Phone className="w-8 h-8 text-cyan-500" />, title: "Soporte 24/7", desc: "Nuestro equipo está disponible antes, durante y después del viaje. Tu tranquilidad es nuestra prioridad." },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feat.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PAQUETES */}
      <section id="paquetes" className="py-24 bg-[#0B2040]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-3">Nuestros paquetes</p>
            <h2 className="text-4xl font-bold text-white mb-4">Elegí tu aventura</h2>
            <p className="text-white/50 max-w-xl mx-auto">Todos los paquetes incluyen asistencia en Argentina, coordinación en Tailandia y acceso a nuestra red de spots.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } } }}
                className={`relative rounded-2xl p-8 ${pkg.featured ? 'bg-cyan-500 text-white ring-2 ring-cyan-400 ring-offset-4 ring-offset-[#0B2040]' : 'bg-white/5 text-white border border-white/10'}`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                    Más elegido
                  </div>
                )}
                <div className="mb-2">
                  <span className={`text-xs uppercase tracking-widest font-medium ${pkg.featured ? 'text-white/80' : 'text-cyan-400'}`}>{pkg.level}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                <p className={`text-sm mb-6 ${pkg.featured ? 'text-white/70' : 'text-white/50'}`}>{pkg.days} días en Tailandia</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">USD {pkg.price.toLocaleString()}</span>
                  <span className={`text-sm ml-1 ${pkg.featured ? 'text-white/70' : 'text-white/40'}`}>por persona</span>
                </div>
                <ul className="space-y-2 mb-8">
                  {pkg.includes.map((item) => (
                    <li key={item} className={`text-sm flex items-start gap-2 ${pkg.featured ? 'text-white/90' : 'text-white/60'}`}>
                      <span className={`mt-1 w-4 h-4 rounded-full flex-shrink-0 text-xs flex items-center justify-center ${pkg.featured ? 'bg-white/20' : 'bg-cyan-500/20 text-cyan-400'}`}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className={`block w-full text-center py-3 rounded-full font-semibold text-sm transition-all ${pkg.featured ? 'bg-white text-cyan-600 hover:bg-cyan-50' : 'border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white'}`}
                >
                  Consultar disponibilidad
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-cyan-600 text-sm uppercase tracking-[0.3em] mb-3">Momentos reales</p>
            <h2 className="text-4xl font-bold">Galería de viajes</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`overflow-hidden rounded-xl ${i === 0 || i === 4 ? 'row-span-2' : ''}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Foto de viaje ${i + 1}`}
                  className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-cyan-600 text-sm uppercase tracking-[0.3em] mb-3">Opiniones</p>
            <h2 className="text-4xl font-bold">Lo que dicen nuestros viajeros</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-600 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-zinc-400 text-xs">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24 bg-[#0B2040]">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-3">Reservas</p>
            <h2 className="text-4xl font-bold text-white mb-4">Comenzá tu aventura</h2>
            <p className="text-white/50">Completá el formulario y te contactamos en menos de 24hs con disponibilidad y más info.</p>
          </motion.div>

          {formSent ? (
            <div className="text-center text-white py-16">
              <div className="text-5xl mb-4">🤙</div>
              <h3 className="text-2xl font-bold mb-2">¡Recibido!</h3>
              <p className="text-white/60">Te contactamos en menos de 24 horas con toda la info.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <input
                  required
                  type="email"
                  placeholder="Tu email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <select
                value={form.package}
                onChange={e => setForm({ ...form, package: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="">Paquete de interés (opcional)</option>
                {packages.map(p => <option key={p.name} value={p.name}>{p.name} — {p.days} días</option>)}
              </select>
              <textarea
                rows={4}
                placeholder="¿Cuándo querés viajar? ¿Cuántas personas? ¿Alguna consulta especial?"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-4 rounded-full transition-all hover:scale-[1.02]"
              >
                Enviar consulta
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#070F1E] py-12 text-white/40 text-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Waves className="text-cyan-400 w-4 h-4" />
            <span className="text-white/70 font-semibold">WaveSoul Thailand</span>
          </div>
          <p>© 2025 WaveSoul. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <MessageCircle className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Mail className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>

    </div>
  )
}
