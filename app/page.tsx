import Link from "next/link";

export default function Home() {
  const demos = [
    {
      href: "/surf",
      title: "Viajes de Surf",
      subtitle: "Tailandia",
      desc: "Landing page para una agencia de viajes de surf. Galería, paquetes, testimonios y formulario de contacto.",
      color: "from-blue-900 to-cyan-700",
      img: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80&auto=format&fit=crop",
    },
    {
      href: "/food",
      title: "Tienda Gourmet",
      subtitle: "Online",
      desc: "E-commerce de comida sofisticada con catálogo filtrable, carrito de compras y diseño de lujo.",
      color: "from-stone-900 to-amber-900",
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop",
    },
    {
      href: "/barberia",
      title: "Barbería",
      subtitle: "Reserva de turnos",
      desc: "Sitio para barbería premium con servicios, galería, equipo y sistema de reservas online.",
      color: "from-zinc-900 to-yellow-900",
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">Demo Templates</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Sitios web listos para tu negocio
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Elegí el template que más se parezca a tu rubro. En 48hs tu negocio puede tener una web así.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={demo.img}
                  alt={demo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${demo.color} opacity-70`} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs uppercase tracking-widest text-white/60 mb-1">{demo.subtitle}</p>
                <h2 className="text-xl font-bold text-white mb-2">{demo.title}</h2>
                <p className="text-sm text-white/70 leading-relaxed">{demo.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white/90 group-hover:text-white">
                  Ver demo
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 text-center">
          <p className="text-zinc-400 text-sm">
            ¿Tu negocio no tiene web todavía? Estas páginas demuestran lo que podés conseguir.
          </p>
          <p className="text-zinc-500 text-xs mt-2">
            Diseño profesional · SEO · Mobile-first · Listo en 48hs
          </p>
        </div>
      </div>
    </div>
  );
}
