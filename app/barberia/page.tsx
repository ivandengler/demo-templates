'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scissors, Clock, MapPin, Phone, Globe, Star, ChevronRight, Check } from 'lucide-react'
import Link from 'next/link'

const services = [
  { name: "Corte clásico", desc: "Tijera y máquina. Incluye lavado y peinado final.", price: 4500, duration: "45 min", icon: "✂️" },
  { name: "Arreglo de barba", desc: "Perfilado, delineado y aceite hidratante de barba.", price: 3200, duration: "30 min", icon: "🪒" },
  { name: "Combo total", desc: "Corte + Barba + Hot towel + Tratamiento de cuero cabelludo.", price: 6800, duration: "75 min", icon: "👑", popular: true },
  { name: "Afeitado clásico", desc: "Afeitado con navaja, hot towel y loción aftershave premium.", price: 3800, duration: "40 min", icon: "🪒" },
  { name: "Corte infantil", desc: "Para los más chicos, hasta 12 años. Con paciencia y cuidado.", price: 3000, duration: "30 min", icon: "✂️" },
  { name: "Tratamiento capilar", desc: "Hidratación profunda, masaje de cuero cabelludo y secado.", price: 4000, duration: "50 min", icon: "💆" },
]

const team = [
  { name: "Ricardo Vega", role: "Fundador & Master Barber", exp: "15 años de experiencia", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&auto=format&fit=crop&facepad=2&faces=1" },
  { name: "Mateo Romero", role: "Senior Barber", exp: "8 años de experiencia", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop&facepad=2&faces=1" },
  { name: "Diego Salas", role: "Barber & Colorist", exp: "5 años de experiencia", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80&auto=format&fit=crop&facepad=2&faces=1" },
]

const gallery = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=400&q=80&auto=format&fit=crop",
]

const hours = [
  { day: "Lunes", time: "09:00 – 20:00" },
  { day: "Martes", time: "09:00 – 20:00" },
  { day: "Miércoles", time: "09:00 – 20:00" },
  { day: "Jueves", time: "09:00 – 21:00" },
  { day: "Viernes", time: "09:00 – 21:00" },
  { day: "Sábado", time: "09:00 – 18:00" },
  { day: "Domingo", time: "Cerrado" },
]

const timeSlots = ["09:00", "09:45", "10:30", "11:15", "12:00", "14:00", "14:45", "15:30", "16:15", "17:00", "17:45", "18:30"]

export default function BarberiaPage() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', time: '' })
  const [step, setStep] = useState<'form' | 'confirm' | 'done'>('form')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('confirm')
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-[#111] text-white font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scissors className="text-[#C9A84C] w-5 h-5" />
            <div>
              <div className="text-white font-bold tracking-widest text-sm uppercase">Vega Barber</div>
              <div className="text-[#C9A84C] text-xs tracking-wider uppercase">Premium · Rosario</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#galeria" className="hover:text-white transition-colors">Galería</a>
            <a href="#equipo" className="hover:text-white transition-colors">Equipo</a>
            <a href="#reservas" className="bg-[#C9A84C] text-black font-semibold px-5 py-2 rounded-full hover:bg-[#b8953e] transition-colors">
              Reservar turno
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=85&auto=format&fit=crop"
          alt="Barbería"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-6 font-medium">Est. 2015 · Rosario, Argentina</p>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
              El arte del
              <br />
              <span className="text-[#C9A84C]">corte perfecto</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              Más de una década ofreciendo servicios de barbería premium en Rosario. Técnica, precisión y una experiencia que vas a querer repetir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#reservas"
                className="flex items-center justify-center gap-2 bg-[#C9A84C] text-black font-bold px-8 py-4 rounded-full hover:bg-[#b8953e] transition-all hover:scale-105"
              >
                Reservar turno <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#servicios"
                className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
              >
                Ver servicios
              </a>
            </div>

            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="flex -space-x-2">
                {["?w=40&seed=1", "?w=40&seed=5", "?w=40&seed=9"].map((q, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={`https://i.pravatar.cc/40${q}`} alt="Cliente" className="w-9 h-9 rounded-full border-2 border-[#111] object-cover" />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />)}
                </div>
                <p className="text-white/50 text-xs">+500 clientes satisfechos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-3">Lo que hacemos</p>
            <h2 className="text-4xl font-bold">Nuestros servicios</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((srv, i) => (
              <motion.div
                key={srv.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative p-7 rounded-2xl border transition-all group ${srv.popular ? 'bg-[#C9A84C]/10 border-[#C9A84C]/40 hover:border-[#C9A84C]' : 'bg-white/3 border-white/8 hover:border-white/20'}`}
              >
                {srv.popular && (
                  <span className="absolute -top-3 left-6 bg-[#C9A84C] text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                    Más pedido
                  </span>
                )}
                <div className="text-3xl mb-4">{srv.icon}</div>
                <h3 className="text-lg font-bold mb-2">{srv.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{srv.desc}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${srv.popular ? 'text-[#C9A84C]' : 'text-white'}`}>
                      ${srv.price.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-white/30 text-xs mt-0.5">
                      <Clock className="w-3 h-3" /> {srv.duration}
                    </div>
                  </div>
                  <a
                    href="#reservas"
                    onClick={() => setForm(f => ({ ...f, service: srv.name }))}
                    className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${srv.popular ? 'bg-[#C9A84C] text-black hover:bg-[#b8953e]' : 'border border-white/20 text-white/60 hover:text-white hover:border-white/40'}`}
                  >
                    Reservar
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-16 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-2">Nuestro trabajo</p>
            <h2 className="text-3xl font-bold">Galería</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="overflow-hidden rounded-xl aspect-square"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Trabajo ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="equipo" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-3">Quiénes somos</p>
            <h2 className="text-4xl font-bold">Nuestro equipo</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-white/5 group-hover:ring-[#C9A84C]/30 transition-all">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-[#C9A84C] text-sm mt-1">{member.role}</p>
                <p className="text-white/30 text-xs mt-1">{member.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVAS */}
      <section id="reservas" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Formulario */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-4">Reservas online</p>
                <h2 className="text-4xl font-bold mb-2">Reservá tu turno</h2>
                <p className="text-white/40 mb-8">Sin esperas. Elegí el servicio, el día y el horario que más te convenga.</p>
              </motion.div>

              {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Tu nombre completo"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="WhatsApp / Teléfono"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  <select
                    required
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  >
                    <option value="">Seleccioná un servicio</option>
                    {services.map(s => <option key={s.name} value={s.name}>{s.name} — ${s.price.toLocaleString()} ({s.duration})</option>)}
                  </select>
                  <input
                    required
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  {form.date && (
                    <div>
                      <p className="text-white/40 text-xs mb-3 uppercase tracking-widest">Horario disponible</p>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm({ ...form, time: t })}
                            className={`py-2 rounded-lg text-sm font-medium transition-all ${form.time === t ? 'bg-[#C9A84C] text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={!form.time}
                    className="w-full bg-[#C9A84C] disabled:opacity-30 text-black font-bold py-4 rounded-full hover:bg-[#b8953e] transition-all hover:scale-[1.02] disabled:hover:scale-100"
                  >
                    Confirmar turno
                  </button>
                </form>
              )}

              {step === 'confirm' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-bold mb-4">Confirmá tu reserva</h3>
                  <div className="space-y-2 text-sm text-white/60 mb-6">
                    <p>👤 <span className="text-white">{form.name}</span></p>
                    <p>✂️ <span className="text-white">{form.service}</span></p>
                    <p>📅 <span className="text-white">{form.date} a las {form.time}</span></p>
                    <p>📱 <span className="text-white">{form.phone}</span></p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('done')}
                      className="flex-1 bg-[#C9A84C] text-black font-bold py-3 rounded-full hover:bg-[#b8953e] transition-colors"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => setStep('form')}
                      className="flex-1 border border-white/10 text-white/60 py-3 rounded-full hover:border-white/30 transition-colors"
                    >
                      Editar
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'done' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-[#C9A84C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">¡Turno reservado!</h3>
                  <p className="text-white/40">Te mandamos la confirmación por WhatsApp al {form.phone}.</p>
                  <button onClick={() => { setStep('form'); setForm({ name: '', phone: '', service: '', date: '', time: '' }) }} className="mt-6 text-[#C9A84C] text-sm hover:underline">
                    Hacer otra reserva
                  </button>
                </motion.div>
              )}
            </div>

            {/* Info + Horarios */}
            <div className="space-y-8">
              <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                <h3 className="font-bold mb-4 text-[#C9A84C] uppercase tracking-widest text-xs">Horarios de atención</h3>
                <div className="space-y-2">
                  {hours.map(h => (
                    <div key={h.day} className="flex justify-between text-sm">
                      <span className="text-white/60">{h.day}</span>
                      <span className={h.time === 'Cerrado' ? 'text-white/20' : 'text-white'}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                <h3 className="font-bold mb-4 text-[#C9A84C] uppercase tracking-widest text-xs">Dónde encontrarnos</h3>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                    <span>Córdoba 1456, Rosario, Santa Fe</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                    <span>+54 341 555-0123</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                    <span>@vegabarber.rosario</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-2xl p-6">
                <p className="text-[#C9A84C] font-semibold mb-1">Política de cancelación</p>
                <p className="text-white/40 text-sm leading-relaxed">Podés cancelar o reprogramar tu turno hasta 2 horas antes sin cargo. Después de ese plazo, el turno queda tomado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <div className="flex items-center gap-2">
            <Scissors className="text-[#C9A84C] w-4 h-4" />
            <span className="text-white/60 font-semibold tracking-widest uppercase text-xs">Vega Barber Premium</span>
          </div>
          <p>© 2025 Vega Barber. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Phone className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-30">
        <Link href="/" className="bg-zinc-900/80 backdrop-blur text-white/60 text-xs px-3 py-2 rounded-full hover:text-white transition-colors border border-white/10">
          ← Ver todos los demos
        </Link>
      </div>
    </div>
  )
}
