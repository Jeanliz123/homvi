'use client'
import Link from 'next/link'

export default function NewClientPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#d4af37]/30">
      {/* Nav de retorno */}
      <nav className="p-6 border-b border-white/5 max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-[#d4af37] text-xl font-bold tracking-tighter italic uppercase">Homvi</div>
        <Link href="/dashboard" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#d4af37] transition-colors font-bold">
          ← Volver al Panel
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto p-12 mt-10">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-tight italic">Nuevo <span className="not-italic text-[#d4af37]">Registro</span></h1>
          <p className="text-gray-500 text-sm mt-4 font-light">Añade un nuevo cliente exclusivo a tu cartera.</p>
        </header>

        {/* Tarjeta del Formulario */}
        <div className="space-y-6 bg-[#0a0a0a] p-10 rounded-[2rem] border border-white/5 shadow-2xl">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-bold ml-1">Nombre Completo</label>
            <input 
              type="text" 
              placeholder="Ej. Julian Casablancas" 
              className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700 text-white" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Propiedad de Interés</label>
            <input 
              type="text" 
              placeholder="Ej. Mansion Los Lagos" 
              className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700 text-white" 
            />
          </div>

          <div className="pt-6">
            <button className="w-full bg-[#d4af37] text-black font-extrabold py-5 rounded-full hover:bg-white transition-all text-[11px] tracking-[0.2em] uppercase shadow-xl shadow-[#d4af37]/10 active:scale-95">
              Guardar Cliente VIP
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
