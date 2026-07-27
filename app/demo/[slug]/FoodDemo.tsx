'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Plus, Minus, ChevronRight, Globe, MessageCircle, Star } from 'lucide-react'

type Category = 'Todos' | 'Entradas' | 'Principales' | 'Postres' | 'Bebidas'

interface Product {
  id: number
  name: string
  desc: string
  price: number
  category: Exclude<Category, 'Todos'>
  img: string
  badge?: string
}

const products: Product[] = [
  { id: 1, name: "Burrata con tomates heirloom", desc: "Burrata cremosa, tomates de temporada, aceite de albahaca y flor de sal", price: 1850, category: "Entradas", img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80&auto=format&fit=crop", badge: "Popular" },
  { id: 2, name: "Tartare de salmón", desc: "Salmón fresco, aguacate, alcaparras, limón y chips de wonton", price: 2200, category: "Entradas", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&auto=format&fit=crop" },
  { id: 3, name: "Tabla de charcutería", desc: "Selección de fiambres artesanales, quesos madurados, frutos secos y mermeladas", price: 2800, category: "Entradas", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80&auto=format&fit=crop" },
  { id: 4, name: "Risotto al nero di seppia", desc: "Arroz arborio, tinta de calamar, langostinos salteados, parmesano y limón", price: 3400, category: "Principales", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80&auto=format&fit=crop", badge: "Chef's choice" },
  { id: 5, name: "Lomo Wellington", desc: "Lomo al punto, duxelles de hongos, masa hojaldrada, salsa de vino tinto", price: 4200, category: "Principales", img: "https://images.pexels.com/photos/5340297/pexels-photo-5340297.jpeg?auto=compress&cs=tinysrgb&w=400", badge: "Signature" },
  { id: 6, name: "Pasta all'amatriciana", desc: "Pasta artesanal, guanciale crujiente, tomate San Marzano, pecorino romano", price: 2900, category: "Principales", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80&auto=format&fit=crop" },
  { id: 7, name: "Pollo a las hierbas provenzales", desc: "Muslo de pollo confitado, vegetales de temporada, salsa de mostaza Dijon", price: 2600, category: "Principales", img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=80&auto=format&fit=crop" },
  { id: 8, name: "Tarta tatin de manzana", desc: "Manzanas caramelizadas, masa brisa, crema fraîche y caramelo salado", price: 1400, category: "Postres", img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&q=80&auto=format&fit=crop" },
  { id: 9, name: "Fondant de chocolate 70%", desc: "Coulant tibio de cacao Valrhona, helado de vainilla de Madagascar", price: 1600, category: "Postres", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80&auto=format&fit=crop", badge: "Popular" },
  { id: 10, name: "Pannacotta al limoncello", desc: "Pannacotta sedosa, gel de limoncello, frutos rojos frescos, tuile de almendras", price: 1300, category: "Postres", img: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&q=80&auto=format&fit=crop" },
  { id: 11, name: "Negroni Bianco", desc: "Gin Tanqueray, Campari Bianco, Vermut Blanco, twist de naranja", price: 1200, category: "Bebidas", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80&auto=format&fit=crop" },
  { id: 12, name: "Limonada de jengibre", desc: "Limón prensado en frío, jengibre fresco, miel de manuka, agua gasificada", price: 850, category: "Bebidas", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80&auto=format&fit=crop" },
]

interface CartItem extends Product { qty: number }

export default function FoodDemo({ nombre }: { nombre: string }) {
  const [category, setCategory] = useState<Category>('Todos')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [ordered, setOrdered] = useState(false)

  const categories: Category[] = ['Todos', 'Entradas', 'Principales', 'Postres', 'Bebidas']
  const filtered = category === 'Todos' ? products : products.filter(p => p.category === category)

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id))
  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0))
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[#D4A853] font-bold text-xl tracking-tight">{nombre}</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#menu" className="hover:text-white transition-colors">Menú</a>
            <a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#D4A853] text-black font-semibold px-4 py-2 rounded-full hover:bg-[#c49a40] transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Pedido
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85&auto=format&fit=crop"
          alt="Gastronomía"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#D4A853] text-sm uppercase tracking-[0.3em] mb-3">Gastronomía de autor · Rosario</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-2xl">
              Una experiencia que va más allá del sabor
            </h1>
            <p className="text-white/60 mt-4 max-w-xl text-lg">Ingredientes de temporada, técnicas europeas y el alma de Rosario en cada plato.</p>
            <a href="#menu" className="inline-flex items-center gap-2 mt-8 bg-[#D4A853] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#c49a40] transition-colors">
              Ver menú completo <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* MENÚ */}
      <section id="menu" className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <p className="text-[#D4A853] text-sm uppercase tracking-[0.3em] mb-2">Nuestro menú</p>
            <h2 className="text-3xl font-bold">Carta del día</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-[#D4A853] text-black' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-[#D4A853]/30 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#D4A853] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-[#D4A853] text-xs uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="font-semibold text-base mb-2 leading-snug">{product.name}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price.toLocaleString()}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-1.5 bg-[#D4A853] text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#c49a40] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agregar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
          >
            <p className="text-[#D4A853] text-sm uppercase tracking-[0.3em] mb-4">Nuestra historia</p>
            <h2 className="text-4xl font-bold mb-6 leading-tight">Cocina con alma, ingredientes con historia</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              {nombre} nació de la obsesión de nuestro chef por los mercados de temporada y las técnicas aprendidas en Lyon, París y Barcelona. Cada plato es un puente entre la tradición europea y el producto local.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Trabajamos con productores de la región de Rosario y Santa Fe, seleccionando ingredientes que respetan los ciclos naturales y la tierra que nos rodea.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {[{ n: "8+", l: "Años de trayectoria" }, { n: "4.9", l: "Calificación promedio" }, { n: "200+", l: "Platos creados" }].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-bold text-[#D4A853]">{s.n}</div>
                  <div className="text-white/40 text-xs mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              "https://images.pexels.com/photos/2491273/pexels-photo-2491273.jpeg?auto=compress&cs=tinysrgb&w=400",
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80&auto=format&fit=crop",
            ].map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="Plato" className="w-full aspect-square object-cover rounded-xl" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 text-white/30 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/60 font-semibold">{nombre} · Rosario</span>
          <p>© 2025 {nombre}. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <MessageCircle className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#222] z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-lg font-bold">Tu pedido</h2>
                <button onClick={() => setCartOpen(false)}>
                  <X className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-white/30 py-16">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Tu pedido está vacío</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight">{item.name}</p>
                        <p className="text-[#D4A853] text-sm mt-1">${(item.price * item.qty).toLocaleString()}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-white/60 flex-shrink-0">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10">
                  <div className="flex justify-between mb-4">
                    <span className="text-white/60">Total</span>
                    <span className="text-xl font-bold">${total.toLocaleString()}</span>
                  </div>
                  {ordered ? (
                    <div className="text-center py-4">
                      <p className="text-green-400 font-semibold">✓ Pedido enviado</p>
                      <p className="text-white/40 text-sm mt-1">Te contactamos para confirmar</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setOrdered(true)}
                      className="w-full bg-[#D4A853] hover:bg-[#c49a40] text-black font-semibold py-4 rounded-full transition-colors"
                    >
                      Confirmar pedido
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
