'use client'
import Link from 'next/link'

export default function PropertiesPage() {
  const properties = [
    { id: 1, name: 'Penthouse Bella Vista', loc: 'Piantini, SD', price: '$1.2M', status: 'Disponible', area: '450m²' },
    { id: 2, name: 'Villa Mar Azul', loc: 'Punta Cana', price: '$3.5M', status: 'En Oferta', area: '1,200m²' },
    { id: 3, name: 'Mansión Los Lagos', loc: 'Casa de Campo', price: '$5.2M', status: 'Vendido', area: '2,500m²' },
    { id: 4, name: 'Sky Loft Central', loc: 'Naco, SD', price: '$750k', status: 'Disponible', area: '280m²' },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#d4af37]/30">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex items-center gap-8">
          <div className="text-[#d4af37] text-xl font-bold tracking-tighter uppercase italic">Homvi</div>
          <div className="hidden md:flex gap-6 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/properties" className="text-[#d4af37]">Propiedades</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-gray-500 tracking-widest uppercase font-medium">Luis Betances</span>
          <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center text-black text-xs font-bold shadow-lg shadow-[#d4af37]/20">LB</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-light tracking-tight italic">Catálogo de <span className="not-italic text-[#d4af37]">Propiedades</span></h1>
            <p className="text-gray-500 text-sm mt-2 font-light italic">Curaduría exclusiva de activos inmobiliarios de alto nivel.</p>
          </div>
          <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-all">
            + Añadir Inmueble
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <div key={prop.id} className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-[#d4af37]/30 transition-all shadow-2xl">
              <div className="h-64 bg-zinc-900 relative">
                {/* Placeholder para imagen real */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className={`absolute top-6 right-6 px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                  prop.status === 'Disponible' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                  prop.status === 'En Oferta' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                  'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                  {prop.status}
                </span>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-[#d4af37] transition-colors">{prop.name}</h3>
                    <p className="text-gray-500 text-xs italic">{prop.loc} • {prop.area}</p>
                  </div>
                  <span className="text-[#d4af37] font-mono text-xl">{prop.price}</span>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex gap-4">
                  <button className="flex-1 text-[10px] uppercase tracking-widest py-3 rounded-xl border border-white/10 hover:bg-white hover:text-black transition-all">Detalles</button>
                  <button className="flex-1 text-[10px] uppercase tracking-widest py-3 rounded-xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 hover:bg-[#d4af37] hover:text-black transition-all">Editar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

¿Qué te parece? ¡Homvi está empezando a verse como una plataforma completa!
  )
}
