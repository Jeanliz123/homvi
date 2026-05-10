'use client'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#d4af37]/30 font-sans">
      {/* Nav */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-2xl font-bold tracking-tighter text-[#d4af37]">HOMVI</div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-[0.2em] text-gray-400">
          <a href="#" className="hover:text-white transition-colors text-xs">Producto</a>
          <a href="#" className="hover:text-white transition-colors text-xs">Precios</a>
          <a href="#" className="hover:text-white transition-colors text-xs">Contacto</a>
        </div>
        <Link href="/today" className="bg-[#d4af37] text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-[#b8962e] transition-all">
          COMENZAR
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <span className="text-[#d4af37] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">CRM Inmobiliario Premium</span>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
          Tu cartera de clientes, <br />
          <span className="italic text-[#d4af37]">bajo control total.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Homvi es el CRM diseñado para agentes inmobiliarios que operan con estándares de lujo. Pipeline visual, seguimiento preciso, cierre inteligente.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/today" className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-all">
            EMPIEZA GRATIS
          </Link>
          <button className="border border-white/20 px-8 py-4 rounded-full font-medium hover:bg-white/5 transition-all">
            VER DEMO
          </button>
        </div>
      </section>

      {/* Visual Pipeline Preview */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl shadow-[#d4af37]/5">
          <h3 className="text-[#d4af37] text-xs uppercase tracking-widest mb-8 text-center">Pipeline de Clientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['Lead', 'Buscando', 'En Oferta', 'Cierre'].map((step) => (
              <div key={step} className="bg-white/5 p-4 rounded-xl border border-white/5">
                <p className="text-[10px] uppercase tracking-tighter text-gray-500 mb-3">{step}</p>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4af37] w-2/3"></div>
                  </div>
                  <p className="text-xs text-gray-300">Gestionando activos...</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/5">
            <div className="text-center">
              <p className="text-3xl font-light">2,400+</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2">Agentes activos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light">$18B</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2">Propiedades gestionadas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light">34%</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2">Más cierres</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light">99%</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2">Satisfacción</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-4">Todo lo que necesita un agente de alto nivel</h2>
          <p className="text-gray-500 italic">Diseñado para los que operan con excelencia</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { n: "01", t: "Pipeline Visual", d: "Visualiza el estado de cada cliente en tiempo real. De lead a cierre, sin fricción." },
            { n: "02", t: "Follow-ups Precisos", d: "Nunca pierda un seguimiento. Recordatorios, historial y priorización automática." },
            { n: "03", t: "Catálogo de Propiedades", d: "Conecta clientes con propiedades. Filtra por zona, precio y características al instante." }
          ].map((feat) => (
            <div key={feat.n} className="space-y-4">
              <span className="text-[#d4af37] font-serif italic text-4xl">{feat.n}</span>
              <h4 className="text-xl font-medium">{feat.t}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{feat.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 text-center bg-[#d4af37]/5 border-y border-[#d4af37]/10">
        <h2 className="text-4xl font-light mb-4">Empieza a cerrar más. Hoy.</h2>
        <p className="text-gray-400 mb-8">Sin tarjeta de crédito. Configura en 5 minutos.</p>
        <div className="max-w-md mx-auto flex flex-col md:flex-row gap-2">
          <input 
            type="email" 
            placeholder="tu@email.com" 
            className="flex-1 bg-black border border-white/10 rounded-full px-6 py-3 text-sm focus:border-[#d4af37] outline-none"
          />
          <button className="bg-[#d4af37] text-black px-8 py-3 rounded-full text-sm font-bold hover:bg-[#b8962e] transition-all">
            COMENZAR GRATIS
          </button>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-600 text-[10px] tracking-widest uppercase">
        <p>© 2026 Homvi. Elevando el estándar inmobiliario.</p>
      </footer>
    </div>
  )
}
}
