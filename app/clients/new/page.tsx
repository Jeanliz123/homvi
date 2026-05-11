'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewClientPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#d4af37]/30">
      <main className="max-w-2xl mx-auto p-8 md:p-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-light tracking-tight italic">Nuevo <span className="not-italic text-[#d4af37]">Registro</span></h1>
          <p className="text-gray-500 text-sm mt-4 font-light">Añade un nuevo cliente exclusivo a tu cartera.</p>
        </header>

        <div className="space-y-5 bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold ml-1">Nombre Completo</label>
              <input 
                type="text" 
                placeholder="Ej. Julian Casablancas" 
                className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700 text-white" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Teléfono</label>
              <input 
                type="tel" 
                placeholder="Ej. +1 809 555 0000" 
                className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700 text-white" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Email</label>
            <input 
              type="email" 
              placeholder="Ej. julian@email.com" 
              className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700 text-white" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Propiedad de Interés</label>
            <input 
              type="text" 
              placeholder="Ej. Mansión Los Lagos" 
              className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700 text-white" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Presupuesto</label>
              <input 
                type="text" 
                placeholder="Ej. $500K - $1M" 
                className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700 text-white" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Etapa</label>
              <select className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#d4af37] outline-none transition-all text-gray-400">
                <option value="lead">Lead</option>
                <option value="visita">Visita</option>
                <option value="negociacion">Negociación</option>
                <option value="cierre">Cierre</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Notas</label>
            <textarea 
              placeholder="Observaciones sobre el cliente..." 
              className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700 text-white resize-none h-24" 
            />
          </div>

          <div className="pt-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full font-extrabold py-5 rounded-full transition-all text-xs tracking-[0.2em] uppercase shadow-xl active:scale-95 flex justify-center items-center ${
                isSaving 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-[#d4af37] text-black hover:bg-white shadow-[#d4af37]/10'
              }`}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : 'Guardar Cliente VIP'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
