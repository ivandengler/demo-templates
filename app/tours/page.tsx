'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Clock, Users, Star, Calendar, ChevronRight,
  X, ChevronLeft, ChevronDown, Phone, Mail, Share2,
  Mountain, Compass, Camera, Leaf, Globe, Check
} from 'lucide-react'

// ─── i18n ────────────────────────────────────────────────────────────────────

const i18n = {
  en: {
    nav: { destinations: 'Destinations', about: 'About Us', reviews: 'Reviews', contact: 'Contact', cta: 'Book Now' },
    hero: {
      badge: 'Small-group tours · Chiang Mai, Thailand',
      title1: 'Discover Chiang Mai',
      title2: 'like a local',
      sub: 'Expert guides. Tiny groups. Experiences you will never forget.',
      btn1: 'Explore tours',
      btn2: 'How it works',
    },
    stats: [
      { n: '+800', label: 'Happy travellers' },
      { n: '8', label: 'Curated tours' },
      { n: '10 yrs', label: 'Of experience' },
      { n: '4.9 ★', label: 'Average rating' },
    ],
    tours: { title: 'Our tours', sub: 'Scheduled departures year-round. Max 12 people per group.', difficulty: 'Difficulty', includes: 'Included', pickDate: 'Choose your date', spots: 'spots', fewSpots: 'Only {n} left!', from: 'from', perPerson: 'per person', nextDates: 'Next departures:', details: 'See details', easy: 'Easy', moderate: 'Moderate', },
    modal: { people: 'Number of people', total: 'Total', reserve: 'Pre-book this tour', selectFirst: 'Select a date to continue', back: 'Back' },
    form: { name: 'Full name', whatsapp: 'WhatsApp / Phone', email: 'Email', dest: 'Which tour interests you?', msg: 'Message (optional)', msgPlaceholder: 'Any questions or special needs?', submit: 'Send enquiry', namePh: 'Your name', emailPh: 'you@email.com' },
    done: { title: 'Pre-booking sent!', tour: 'Tour:', date: 'Date:', body: 'We will contact you via WhatsApp within 2 hours to confirm your spot.', close: 'Close' },
    why: {
      title: 'Why travel with us',
      sub: "We're not a mass-market agency. We're a team of passionate guides who craft every itinerary as if we were going ourselves.",
      items: [
        { title: 'Small groups always', desc: 'Max 12 people. More attention, less noise, better experience.' },
        { title: 'Certified local guides', desc: 'All our guides are licensed and have years in the field.' },
        { title: 'Unmissable moments', desc: "We arrive early, stay later. The best shots are from our tours." },
        { title: 'Transparent pricing', desc: 'The price includes everything we say. No hidden fees, ever.' },
      ],
    },
    testimonials: { title: 'What our travellers say' },
    contact: { title: 'Ready to go?', sub: 'Fill in the form and we\'ll reply within 24 hours with everything you need.', noPayment: 'No payment required now. We confirm your spot via WhatsApp.' },
    footer: 'Responsible tourism in Thailand · License No. 0000',
  },
  es: {
    nav: { destinations: 'Destinos', about: 'Nosotros', reviews: 'Opiniones', contact: 'Contacto', cta: 'Reservar' },
    hero: {
      badge: 'Tours en grupos pequeños · Chiang Mai, Tailandia',
      title1: 'Descubrí Chiang Mai',
      title2: 'como un local',
      sub: 'Guías expertos. Grupos reducidos. Experiencias que no vas a olvidar.',
      btn1: 'Ver tours',
      btn2: 'Cómo funciona',
    },
    stats: [
      { n: '+800', label: 'Viajeros felices' },
      { n: '8', label: 'Tours únicos' },
      { n: '10 años', label: 'De experiencia' },
      { n: '4.9 ★', label: 'Calificación promedio' },
    ],
    tours: { title: 'Nuestros tours', sub: 'Salidas programadas todo el año. Máximo 12 personas por grupo.', difficulty: 'Dificultad', includes: 'Incluye', pickDate: 'Elegí tu fecha', spots: 'lugares', fewSpots: '¡Solo {n} lugares!', from: 'desde', perPerson: 'por persona', nextDates: 'Próximas salidas:', details: 'Ver detalles', easy: 'Fácil', moderate: 'Moderado', },
    modal: { people: 'Cantidad de personas', total: 'Total', reserve: 'Pre-reservar este tour', selectFirst: 'Elegí una fecha para continuar', back: 'Volver' },
    form: { name: 'Nombre y apellido', whatsapp: 'WhatsApp / Teléfono', email: 'Email', dest: '¿Qué tour te interesa?', msg: 'Mensaje (opcional)', msgPlaceholder: '¿Alguna pregunta o necesidad especial?', submit: 'Enviar consulta', namePh: 'Tu nombre', emailPh: 'tu@email.com' },
    done: { title: '¡Pre-reserva enviada!', tour: 'Tour:', date: 'Fecha:', body: 'Te contactamos por WhatsApp en menos de 2 horas para confirmar tu lugar.', close: 'Cerrar' },
    why: {
      title: 'Por qué viajar con nosotros',
      sub: 'No somos una agencia masiva. Somos un equipo apasionado que arma cada viaje con el mismo cuidado con el que lo haríamos para nosotros.',
      items: [
        { title: 'Grupos pequeños siempre', desc: 'Máximo 12 personas. Más atención, menos ruido, mejor experiencia.' },
        { title: 'Guías locales certificados', desc: 'Todos nuestros guías tienen licencia y años de experiencia en el terreno.' },
        { title: 'Momentos únicos', desc: 'Llegamos temprano, nos quedamos más. Las mejores fotos son de nuestros tours.' },
        { title: 'Precios transparentes', desc: 'El precio incluye todo lo que decimos. Sin costos ocultos.' },
      ],
    },
    testimonials: { title: 'Lo que dicen nuestros viajeros' },
    contact: { title: '¿Listo para partir?', sub: 'Completá el formulario y te respondemos en menos de 24 horas con toda la información.', noPayment: 'No se realiza ningún pago ahora. Confirmamos tu lugar por WhatsApp.' },
    footer: 'Turismo responsable en Tailandia · Legajo Nº 0000',
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const tours = [
  {
    id: 1,
    name: { en: 'Elephant Sanctuary Experience', es: 'Santuario de Elefantes' },
    location: 'Mae Taeng Valley',
    duration: { en: '1 day', es: '1 día' },
    groupSize: 'Max 10',
    difficulty: 'easy',
    rating: 5.0,
    reviews: 214,
    price: 89,
    currency: 'USD',
    badge: { en: 'Most booked', es: 'Más elegido' },
    badgeColor: 'bg-amber-500',
    description: {
      en: 'Spend a full day caring for rescued elephants in an ethical sanctuary. Feed, bathe, and walk alongside these gentle giants — no riding, no shows, just pure connection.',
      es: 'Pasá un día completo cuidando elefantes rescatados en un santuario ético. Alimentalos, bañalos y caminá junto a estos gigantes gentiles, sin shows ni jinetes.',
    },
    highlights: {
      en: ['Meet rescued elephants ethically', 'Feed & bathe them in the river', 'Traditional Thai lunch included', 'Max 10 guests per group'],
      es: ['Contacto ético con elefantes rescatados', 'Alimentarlos y bañarlos en el río', 'Almuerzo tailandés tradicional incluido', 'Máximo 10 personas por grupo'],
    },
    images: [
      '/elephant-sanctuary.jpg',
      'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-09', spots: 5 },
      { date: '2026-08-16', spots: 2 },
      { date: '2026-08-23', spots: 8 },
      { date: '2026-08-30', spots: 10 },
      { date: '2026-09-06', spots: 3 },
    ],
    accent: 'from-amber-700/70 to-amber-500/30',
    icon: <Leaf size={18} />,
  },
  {
    id: 2,
    name: { en: 'Doi Inthanon Summit Trek', es: 'Trek al Doi Inthanon' },
    location: 'Doi Inthanon National Park',
    duration: { en: '1 day', es: '1 día' },
    groupSize: 'Max 12',
    difficulty: 'moderate',
    rating: 4.9,
    reviews: 98,
    price: 75,
    currency: 'USD',
    badge: { en: "Thailand's roof", es: 'El techo de Tailandia' },
    badgeColor: 'bg-teal-600',
    description: {
      en: "Hike to the highest point in Thailand through misty cloud forests, hidden waterfalls and Hmong hill tribe villages. A world away from the city heat.",
      es: 'Trekking hasta el punto más alto de Tailandia atravesando bosques de niebla, cascadas escondidas y aldeas de la tribu Hmong. Otro mundo.',
    },
    highlights: {
      en: ['Summit at 2,565m — highest in Thailand', 'Two stunning royal chedis', 'Napahaeo & Sirithan waterfalls', 'Hmong market visit'],
      es: ['Cumbre a 2.565m — la más alta de Tailandia', 'Dos magníficos chedis reales', 'Cascadas Napahaeo y Sirithan', 'Visita al mercado Hmong'],
    },
    images: [
      'https://www.thainationalparks.com/img/poi/2019/12/10/394801/two-chedis-w-900.jpg',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-12', spots: 8 },
      { date: '2026-08-19', spots: 1 },
      { date: '2026-08-26', spots: 12 },
      { date: '2026-09-02', spots: 6 },
      { date: '2026-09-09', spots: 10 },
    ],
    accent: 'from-teal-900/70 to-teal-700/30',
    icon: <Mountain size={18} />,
  },
  {
    id: 3,
    name: { en: 'Chiang Rai & White Temple', es: 'Chiang Rai y el Templo Blanco' },
    location: 'Chiang Rai Province',
    duration: { en: 'Full day trip', es: 'Excursión de día completo' },
    groupSize: 'Max 12',
    difficulty: 'easy',
    rating: 4.9,
    reviews: 143,
    price: 69,
    currency: 'USD',
    badge: { en: 'Iconic', es: 'Icónico' },
    badgeColor: 'bg-rose-500',
    description: {
      en: 'Visit the surreal White Temple (Wat Rong Khun), the golden Blue Temple, the Black House museum and a hilltribe village — all in one unforgettable day from Chiang Mai.',
      es: 'Visitá el surrealista Templo Blanco (Wat Rong Khun), el dorado Templo Azul, el museo Black House y una aldea de tribus montañesas, todo en un día.',
    },
    highlights: {
      en: ['Wat Rong Khun (White Temple)', 'Wat Rong Suea Ten (Blue Temple)', 'Baan Dam Black House Museum', 'Doi Tung hilltribe village'],
      es: ['Wat Rong Khun (Templo Blanco)', 'Wat Rong Suea Ten (Templo Azul)', 'Museo Baan Dam', 'Aldea de tribus del Doi Tung'],
    },
    images: [
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-10', spots: 4 },
      { date: '2026-08-17', spots: 11 },
      { date: '2026-08-24', spots: 7 },
      { date: '2026-08-31', spots: 2 },
      { date: '2026-09-07', spots: 12 },
    ],
    accent: 'from-rose-900/60 to-rose-600/30',
    icon: <Compass size={18} />,
  },
  {
    id: 4,
    name: { en: 'Thai Cooking & Night Bazaar', es: 'Cocina Tailandesa y Bazar Nocturno' },
    location: 'Chiang Mai Old City',
    duration: { en: 'Half day + evening', es: 'Tarde + noche' },
    groupSize: 'Max 8',
    difficulty: 'easy',
    rating: 4.8,
    reviews: 177,
    price: 55,
    currency: 'USD',
    badge: { en: 'Best for foodies', es: 'Para los amantes de la comida' },
    badgeColor: 'bg-orange-500',
    description: {
      en: "Learn to cook 5 classic Thai dishes with a local chef, shop at the Warorot fresh market for ingredients, then explore the famous Night Bazaar as the city comes alive.",
      es: 'Aprendé a cocinar 5 platos tailandeses clásicos con una chef local, comprá los ingredientes en el mercado Warorot y explorá el famoso Bazar Nocturno.',
    },
    highlights: {
      en: ['Cook 5 authentic Thai dishes', 'Market tour with local chef', 'Recipe booklet to take home', 'Night Bazaar guided walk'],
      es: ['Cocinar 5 platos tailandeses auténticos', 'Recorrido por el mercado con chef local', 'Libro de recetas para llevar', 'Caminata guiada por el Bazar Nocturno'],
    },
    images: [
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-08', spots: 6 },
      { date: '2026-08-15', spots: 3 },
      { date: '2026-08-22', spots: 8 },
      { date: '2026-08-29', spots: 1 },
      { date: '2026-09-05', spots: 8 },
    ],
    accent: 'from-orange-900/70 to-orange-600/30',
    icon: <Camera size={18} />,
  },
]

const testimonials = {
  en: [
    { name: 'Sarah K.', city: 'London, UK', text: 'The elephant sanctuary was life-changing. The guides were incredibly knowledgeable and the whole experience felt genuine and ethical. Highly recommend!' },
    { name: 'Marco L.', city: 'Buenos Aires', text: 'Chiang Rai day trip was absolutely stunning. The White Temple blew my mind. Small group made it feel very personal and relaxed.' },
    { name: 'Yuki T.', city: 'Tokyo, Japan', text: 'The cooking class was the highlight of my whole Thailand trip. Chef Noi was so fun and patient. I have already cooked pad thai twice at home!' },
  ],
  es: [
    { name: 'Sarah K.', city: 'Londres, Reino Unido', text: 'El santuario de elefantes fue transformador. Los guías sabían todo y la experiencia se sintió genuina y ética. ¡Muy recomendable!' },
    { name: 'Marco L.', city: 'Buenos Aires', text: 'La excursión a Chiang Rai fue increíble. El Templo Blanco me voló la cabeza. El grupo pequeño lo hizo muy personal y tranquilo.' },
    { name: 'Yuki T.', city: 'Tokio, Japón', text: 'La clase de cocina fue lo mejor de mi viaje a Tailandia. La chef Noi fue muy divertida y paciente. ¡Ya cociné pad thai dos veces en casa!' },
  ],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

type Lang = 'en' | 'es'

function formatDate(dateStr: string, lang: Lang) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-AR', { weekday: 'short', day: 'numeric', month: 'long' })
}

function formatPrice(p: number, currency: string) {
  return `${currency} ${p.toLocaleString()}`
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ToursPage() {
  const [lang, setLang] = useState<Lang>('en')
  const [langOpen, setLangOpen] = useState(false)
  const [selectedTour, setSelectedTour] = useState<typeof tours[0] | null>(null)
  const [activeImg, setActiveImg] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [pax, setPax] = useState(2)
  const [reservaStep, setReservaStep] = useState<'browse' | 'form' | 'payment' | 'done'>('browse')
  const [navScrolled, setNavScrolled] = useState(false)
  const t = i18n[lang]

  useEffect(() => {
    const h = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  function openTour(tour: typeof tours[0]) {
    setSelectedTour(tour)
    setActiveImg(0)
    setSelectedDate(null)
    setPax(2)
    setReservaStep('browse')
    document.body.style.overflow = 'hidden'
  }

  function closeTour() {
    setSelectedTour(null)
    document.body.style.overflow = ''
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setReservaStep('payment')
  }

  const diffLabel = (d: string) => d === 'easy' ? t.tours.easy : t.tours.moderate

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: '#FDF7EE', color: '#1A1208' }}
    >
      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navScrolled ? 'rgba(253,247,238,0.95)' : 'transparent',
          backdropFilter: navScrolled ? 'blur(12px)' : 'none',
          borderBottom: navScrolled ? '1px solid rgba(232,134,42,0.2)' : '1px solid transparent',
          boxShadow: navScrolled ? '0 2px 20px rgba(232,134,42,0.08)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#E8862A' }}>
              <Compass size={15} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tight" style={{ color: '#1A1208' }}>Lotus Trails</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: '#5C3A1A' }}>
            <a href="#tours" className="hover:text-amber-600 transition-colors">{t.nav.destinations}</a>
            <a href="#about" className="hover:text-amber-600 transition-colors">{t.nav.about}</a>
            <a href="#reviews" className="hover:text-amber-600 transition-colors">{t.nav.reviews}</a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">{t.nav.contact}</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(o => !o)}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-all"
                style={{ borderColor: '#E8862A', color: '#E8862A', background: 'rgba(232,134,42,0.08)' }}
              >
                <Globe size={14} />
                {lang === 'en' ? 'EN' : 'ES'}
                <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 rounded-xl overflow-hidden shadow-xl border"
                    style={{ background: '#FDF7EE', borderColor: 'rgba(232,134,42,0.2)', minWidth: 120 }}
                  >
                    {(['en', 'es'] as Lang[]).map(l => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangOpen(false) }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-amber-50 transition-colors"
                        style={{ color: lang === l ? '#E8862A' : '#5C3A1A' }}
                      >
                        <span>{l === 'en' ? '🇬🇧 English' : '🇦🇷 Español'}</span>
                        {lang === l && <Check size={13} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#contact"
              className="hidden sm:block font-bold text-sm px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90 shadow-md"
              style={{ background: '#E8862A', boxShadow: '0 4px 14px rgba(232,134,42,0.35)' }}
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=1800&q=90&auto=format&fit=crop"
            alt="Chiang Mai temples"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%)' }} />
        </div>

        <div className="relative text-center px-4 max-w-3xl mx-auto pt-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(232,134,42,0.15)', border: '1px solid rgba(232,134,42,0.4)', color: '#E8862A' }}
            >
              <Compass size={14} />
              {t.hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-none mb-6 tracking-tight text-white drop-shadow-lg">
              {t.hero.title1}<br />
              <span style={{ color: '#F5C87A' }}>{t.hero.title2}</span>
            </h1>
            <p className="text-xl text-stone-200 mb-10 leading-relaxed max-w-xl mx-auto">{t.hero.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#tours"
                className="font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-xl text-white"
                style={{ background: '#E8862A', boxShadow: '0 8px 30px rgba(232,134,42,0.45)' }}
              >
                {t.hero.btn1}
              </a>
              <a
                href="#about"
                className="font-semibold px-8 py-4 rounded-full text-lg transition-all border text-white hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.4)' }}
              >
                {t.hero.btn2}
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={28} style={{ color: '#E8862A' }} />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section style={{ background: '#E8862A' }} className="py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {t.stats.map(s => (
            <div key={s.label}>
              <div className="text-3xl font-black">{s.n}</div>
              <div className="text-sm font-medium mt-1 opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOURS ─────────────────────────────────────────────────── */}
      <section id="tours" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#1A1208' }}>{t.tours.title}</h2>
            <p className="text-lg max-w-lg mx-auto" style={{ color: '#7A4E2A' }}>{t.tours.sub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {tours.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                onClick={() => openTour(tour)}
                className="group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(232,134,42,0.15)',
                  boxShadow: '0 4px 24px rgba(90,40,10,0.06)',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 40px rgba(232,134,42,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(90,40,10,0.06)')}
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={tour.images[0]}
                    alt={tour.name[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${tour.accent}`} />
                  <span className={`absolute top-4 left-4 ${tour.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                    {tour.badge[lang]}
                  </span>
                  <div className="absolute bottom-4 right-4 text-right">
                    <div className="text-xs text-white/70">{t.tours.from}</div>
                    <div className="text-amber-300 font-black text-xl drop-shadow">{formatPrice(tour.price, tour.currency)}</div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-medium mb-1" style={{ color: '#E8862A' }}>
                        <MapPin size={12} /> {tour.location}
                      </div>
                      <h3 className="text-xl font-black leading-tight" style={{ color: '#1A1208' }}>{tour.name[lang]}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#7A4E2A' }}>{tour.description[lang]}</p>
                  <div className="flex items-center gap-5 text-sm mb-4" style={{ color: '#A06030' }}>
                    <span className="flex items-center gap-1.5"><Clock size={13} />{tour.duration[lang]}</span>
                    <span className="flex items-center gap-1.5"><Users size={13} />{tour.groupSize}</span>
                    <span className="flex items-center gap-1.5"><Star size={13} className="fill-amber-400 text-amber-400" />{tour.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className="text-xs font-medium" style={{ color: '#A06030' }}>{t.tours.nextDates}</span>
                    {tour.dates.slice(0, 3).map(d => (
                      <span key={d.date} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: '#FEF3E2', color: '#E8862A', border: '1px solid rgba(232,134,42,0.25)' }}>
                        {formatDate(d.date, lang)}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tour.difficulty === 'easy' ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-700'}`}>
                      {diffLabel(tour.difficulty)}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all" style={{ color: '#E8862A' }}>
                      {t.tours.details} <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <section id="about" className="py-24" style={{ background: '#FFF8EF' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#1A1208' }}>{t.why.title}</h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#7A4E2A' }}>{t.why.sub}</p>
            <div className="space-y-5">
              {t.why.items.map(item => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(232,134,42,0.12)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: '#E8862A' }} />
                  </div>
                  <div>
                    <div className="font-bold mb-0.5" style={{ color: '#1A1208' }}>{item.title}</div>
                    <div className="text-sm" style={{ color: '#7A4E2A' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&q=85&auto=format&fit=crop" alt="" className="rounded-2xl h-52 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=500&q=85&auto=format&fit=crop" alt="" className="rounded-2xl h-52 w-full object-cover mt-8" />
            <img src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500&q=85&auto=format&fit=crop" alt="" className="rounded-2xl h-52 w-full object-cover -mt-4" />
            <img src="https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&q=85&auto=format&fit=crop" alt="" className="rounded-2xl h-52 w-full object-cover mt-4" />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section id="reviews" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-2">
              <svg width="36" height="34" viewBox="0 0 55 52" fill="none">
                <path d="M27.5 0L33.85 20.22H55L38.08 32.72L44.43 52.9L27.5 40.4L10.57 52.9L16.92 32.72L0 20.22H21.15L27.5 0Z" fill="#00B67A"/>
                <path d="M39.4 37.1L37.75 31.8L27.5 40.4L39.4 37.1Z" fill="#005128"/>
              </svg>
              <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 28, color: '#191919', letterSpacing: '-0.5px' }}>Trustpilot</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{ background: '#00B67A', borderRadius: 5, width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="0 0 55 52" fill="none">
                    <path d="M27.5 0L33.85 20.22H55L38.08 32.72L44.43 52.9L27.5 40.4L10.57 52.9L16.92 32.72L0 20.22H21.15L27.5 0Z" fill="white"/>
                    <path d="M39.4 37.1L37.75 31.8L27.5 40.4L39.4 37.1Z" fill="rgba(0,0,0,0.15)"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-4xl font-black text-center mb-16" style={{ color: '#1A1208' }}>{t.testimonials.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials[lang].map(t2 => (
              <div key={t2.name} className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.15)', boxShadow: '0 2px 16px rgba(90,40,10,0.06)' }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#5C3A1A' }}>&ldquo;{t2.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#1A1208' }}>{t2.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#A06030' }}>{t2.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="py-24" style={{ background: '#FFF8EF' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4" style={{ color: '#1A1208' }}>{t.contact.title}</h2>
          <p className="mb-10" style={{ color: '#7A4E2A' }}>{t.contact.sub}</p>
          <form
            onSubmit={e => { e.preventDefault(); alert(lang === 'en' ? 'Thank you! We\'ll be in touch.' : '¡Gracias! Te contactamos pronto.') }}
            className="rounded-3xl p-8 text-left space-y-5"
            style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.18)', boxShadow: '0 4px 32px rgba(90,40,10,0.08)' }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.name}</label>
                <input required className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.25)', color: '#1A1208' }} placeholder={t.form.namePh} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.25)'} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.whatsapp}</label>
                <input required className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.25)', color: '#1A1208' }} placeholder="+66 81 000 0000" onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.25)'} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.email}</label>
              <input type="email" required className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.25)', color: '#1A1208' }} placeholder={t.form.emailPh} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.25)'} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.dest}</label>
              <select className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.25)', color: '#1A1208' }} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.25)'}>
                <option value="">{lang === 'en' ? 'Choose a tour...' : 'Elegir tour...'}</option>
                {tours.map(t2 => <option key={t2.id}>{t2.name[lang]}</option>)}
                <option>{lang === 'en' ? "I'm not sure yet" : 'No sé todavía'}</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.msg}</label>
              <textarea rows={3} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none" style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.25)', color: '#1A1208' }} placeholder={t.form.msgPlaceholder} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.25)'} />
            </div>
            <button type="submit" className="w-full font-bold py-4 rounded-xl text-lg text-white transition-all hover:opacity-90" style={{ background: '#E8862A', boxShadow: '0 4px 20px rgba(232,134,42,0.3)' }}>
              {t.form.submit}
            </button>
          </form>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm flex-wrap" style={{ color: '#A06030' }}>
            <a href="#" className="flex items-center gap-2 hover:text-amber-600 transition-colors"><Phone size={15} />+66 81 000 0000</a>
            <a href="#" className="flex items-center gap-2 hover:text-amber-600 transition-colors"><Share2 size={15} />@lotusrailstrails</a>
            <a href="#" className="flex items-center gap-2 hover:text-amber-600 transition-colors"><Mail size={15} />hello@lotusrails.com</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="py-8 text-center text-sm border-t" style={{ borderColor: 'rgba(232,134,42,0.15)', color: '#A06030' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#E8862A' }}>
            <Compass size={12} className="text-white" />
          </div>
          <span className="font-black" style={{ color: '#5C3A1A' }}>Lotus Trails</span>
        </div>
        <p>© 2026 · {t.footer}</p>
      </footer>

      {/* ── MODAL ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            style={{ background: 'rgba(26,18,8,0.65)', backdropFilter: 'blur(6px)' }}
            onClick={e => { if (e.target === e.currentTarget) closeTour() }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 26 }}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl"
              style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.2)' }}
            >
              {/* Gallery */}
              <div className="relative h-64 md:h-72 overflow-hidden rounded-t-3xl shrink-0">
                <img src={selectedTour.images[activeImg]} alt={selectedTour.name[lang]} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${selectedTour.accent}`} />
                <button onClick={closeTour} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors" style={{ background: 'rgba(26,18,8,0.5)' }}>
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {selectedTour.images.map((_, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} className="h-2 rounded-full transition-all" style={{ width: activeImg === i ? 24 : 8, background: activeImg === i ? '#fff' : 'rgba(255,255,255,0.45)' }} />
                  ))}
                </div>
                {activeImg > 0 && (
                  <button onClick={() => setActiveImg(activeImg - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: 'rgba(26,18,8,0.45)' }}>
                    <ChevronLeft size={18} />
                  </button>
                )}
                {activeImg < selectedTour.images.length - 1 && (
                  <button onClick={() => setActiveImg(activeImg + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: 'rgba(26,18,8,0.45)' }}>
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>

              <div className="p-6">
                {reservaStep === 'done' ? (
                  <div className="text-center py-10">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="text-2xl font-black mb-2" style={{ color: '#1A1208' }}>{t.done.title}</h3>
                    <p style={{ color: '#7A4E2A' }} className="mb-1">{t.done.tour} <strong style={{ color: '#1A1208' }}>{selectedTour.name[lang]}</strong></p>
                    {selectedDate && <p style={{ color: '#7A4E2A' }} className="mb-6">{t.done.date} <strong style={{ color: '#1A1208' }}>{formatDate(selectedDate, lang)}</strong></p>}
                    <p style={{ color: '#7A4E2A' }} className="mb-8 text-sm">{t.done.body}</p>
                    <button onClick={closeTour} className="font-bold px-8 py-3 rounded-full text-white" style={{ background: '#E8862A' }}>{t.done.close}</button>
                  </div>
                ) : reservaStep === 'payment' ? (
                  <div>
                    <button onClick={() => setReservaStep('form')} className="flex items-center gap-1 text-sm mb-5 transition-colors hover:opacity-70" style={{ color: '#E8862A' }}>
                      <ChevronLeft size={15} /> {t.modal.back}
                    </button>
                    <h3 className="text-xl font-black mb-1" style={{ color: '#1A1208' }}>{lang === 'en' ? 'Complete your payment' : 'Completá tu pago'}</h3>
                    <p className="text-sm mb-6" style={{ color: '#7A4E2A' }}>
                      {selectedTour?.name[lang]} · {selectedDate && formatDate(selectedDate, lang)} · {pax} {lang === 'en' ? `person${pax > 1 ? 's' : ''}` : `persona${pax > 1 ? 's' : ''}`}
                    </p>
                    <div className="rounded-xl p-4 mb-6 flex items-center justify-between" style={{ background: 'rgba(232,134,42,0.08)', border: '1px solid rgba(232,134,42,0.2)' }}>
                      <span className="font-medium" style={{ color: '#5C3A1A' }}>{lang === 'en' ? 'Total to pay' : 'Total a pagar'}</span>
                      <span className="text-2xl font-black" style={{ color: '#E8862A' }}>{selectedTour && formatPrice(selectedTour.price * pax, selectedTour.currency)}</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div>
                        <label className="text-xs font-semibold mb-1.5 block uppercase tracking-wide" style={{ color: '#7A4E2A' }}>{lang === 'en' ? 'Card number' : 'Número de tarjeta'}</label>
                        <input className="w-full rounded-xl px-4 py-3 text-sm outline-none font-mono" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder="4242 4242 4242 4242" maxLength={19} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold mb-1.5 block uppercase tracking-wide" style={{ color: '#7A4E2A' }}>{lang === 'en' ? 'Expiry' : 'Vencimiento'}</label>
                          <input className="w-full rounded-xl px-4 py-3 text-sm outline-none font-mono" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder="MM / YY" maxLength={7} />
                        </div>
                        <div>
                          <label className="text-xs font-semibold mb-1.5 block uppercase tracking-wide" style={{ color: '#7A4E2A' }}>CVC</label>
                          <input className="w-full rounded-xl px-4 py-3 text-sm outline-none font-mono" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder="···" maxLength={4} />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setReservaStep('done')}
                      className="w-full font-bold py-4 rounded-xl text-white text-base transition-all hover:opacity-90"
                      style={{ background: '#E8862A', boxShadow: '0 4px 20px rgba(232,134,42,0.3)' }}
                    >
                      {lang === 'en' ? `Pay ${selectedTour ? formatPrice(selectedTour.price * pax, selectedTour.currency) : ''}` : `Pagar ${selectedTour ? formatPrice(selectedTour.price * pax, selectedTour.currency) : ''}`}
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A06030" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <p className="text-xs text-center" style={{ color: '#A06030' }}>{lang === 'en' ? 'Secure payment · SSL encrypted' : 'Pago seguro · Cifrado SSL'}</p>
                    </div>
                  </div>
                ) : reservaStep === 'form' ? (
                  <div>
                    <button onClick={() => setReservaStep('browse')} className="flex items-center gap-1 text-sm mb-5 transition-colors hover:opacity-70" style={{ color: '#E8862A' }}>
                      <ChevronLeft size={15} /> {t.modal.back}
                    </button>
                    <h3 className="text-xl font-black mb-1" style={{ color: '#1A1208' }}>{selectedTour.name[lang]}</h3>
                    {selectedDate && (
                      <p className="text-sm mb-6" style={{ color: '#7A4E2A' }}>
                        {formatDate(selectedDate, lang)} · {pax} {lang === 'en' ? `person${pax > 1 ? 's' : ''}` : `persona${pax > 1 ? 's' : ''}`}
                      </p>
                    )}
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {[
                        { label: t.form.name, ph: t.form.namePh, type: 'text' },
                        { label: t.form.whatsapp, ph: '+66 81 000 0000', type: 'text' },
                        { label: t.form.email, ph: t.form.emailPh, type: 'email' },
                      ].map(f => (
                        <div key={f.label}>
                          <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{f.label}</label>
                          <input required type={f.type} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder={f.ph} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.3)'} />
                        </div>
                      ))}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.msg}</label>
                        <textarea rows={2} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder={t.form.msgPlaceholder} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.3)'} />
                      </div>
                      <button type="submit" className="w-full font-bold py-4 rounded-xl text-white" style={{ background: '#E8862A' }}>{t.form.submit}</button>
                      <p className="text-xs text-center" style={{ color: '#A06030' }}>{t.contact.noPayment}</p>
                    </form>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium mb-1" style={{ color: '#E8862A' }}>
                          <MapPin size={12} /> {selectedTour.location}
                        </div>
                        <h3 className="text-2xl font-black" style={{ color: '#1A1208' }}>{selectedTour.name[lang]}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs mb-0.5" style={{ color: '#A06030' }}>{t.tours.from}</div>
                        <div className="text-xl font-black" style={{ color: '#E8862A' }}>{formatPrice(selectedTour.price, selectedTour.currency)}</div>
                        <div className="text-xs" style={{ color: '#A06030' }}>{t.tours.perPerson}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm mb-4 flex-wrap" style={{ color: '#A06030' }}>
                      <span className="flex items-center gap-1.5"><Clock size={13} />{selectedTour.duration[lang]}</span>
                      <span className="flex items-center gap-1.5"><Users size={13} />{selectedTour.groupSize}</span>
                      <span className="flex items-center gap-1.5"><Star size={13} className="fill-amber-400 text-amber-400" />{selectedTour.rating} ({selectedTour.reviews})</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: '#5C3A1A' }}>{selectedTour.description[lang]}</p>

                    {/* Highlights */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#A06030' }}>{t.tours.includes}</h4>
                      <div className="space-y-2">
                        {selectedTour.highlights[lang].map(h => (
                          <div key={h} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C3A1A' }}>
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(232,134,42,0.15)' }}>
                              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#E8862A' }} />
                            </div>
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#A06030' }}>{t.tours.pickDate}</h4>
                      <div className="space-y-2">
                        {selectedTour.dates.map(d => {
                          const sel = selectedDate === d.date
                          const low = d.spots <= 3
                          return (
                            <button
                              key={d.date}
                              onClick={() => setSelectedDate(d.date)}
                              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm transition-all"
                              style={{
                                background: sel ? 'rgba(232,134,42,0.1)' : '#fff',
                                borderColor: sel ? '#E8862A' : 'rgba(232,134,42,0.2)',
                                color: sel ? '#1A1208' : '#5C3A1A',
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Calendar size={14} style={{ color: sel ? '#E8862A' : '#A06030' }} />
                                <span className="font-medium capitalize">{formatDate(d.date, lang)}</span>
                              </div>
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: low ? 'rgba(239,68,68,0.1)' : 'rgba(232,134,42,0.1)', color: low ? '#DC2626' : '#E8862A' }}>
                                {low ? t.tours.fewSpots.replace('{n}', String(d.spots)) : `${d.spots} ${t.tours.spots}`}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Pax */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#A06030' }}>{t.modal.people}</h4>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setPax(Math.max(1, pax - 1))} className="w-10 h-10 rounded-full border font-bold text-xl flex items-center justify-center transition-colors hover:border-amber-400" style={{ borderColor: 'rgba(232,134,42,0.3)', color: '#E8862A' }}>−</button>
                        <span className="text-2xl font-black w-8 text-center" style={{ color: '#1A1208' }}>{pax}</span>
                        <button onClick={() => setPax(Math.min(12, pax + 1))} className="w-10 h-10 rounded-full border font-bold text-xl flex items-center justify-center transition-colors hover:border-amber-400" style={{ borderColor: 'rgba(232,134,42,0.3)', color: '#E8862A' }}>+</button>
                        <span className="text-sm ml-2" style={{ color: '#7A4E2A' }}>
                          {t.modal.total}: <strong style={{ color: '#1A1208' }}>{formatPrice(selectedTour.price * pax, selectedTour.currency)}</strong>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => selectedDate ? setReservaStep('form') : undefined}
                      className="w-full font-bold py-4 rounded-xl text-white text-base transition-all"
                      style={{ background: selectedDate ? '#E8862A' : '#C9A98A', cursor: selectedDate ? 'pointer' : 'default', boxShadow: selectedDate ? '0 4px 20px rgba(232,134,42,0.3)' : 'none' }}
                    >
                      {selectedDate ? t.modal.reserve : t.modal.selectFirst}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
