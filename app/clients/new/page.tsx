'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewClientPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    
    // Simulamos una carga de red de 1.5 segundos
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#d4af37]/30">
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
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full font-extrabold py-5 rounded-full transition-all text-[11px] tracking-[0.2em] uppercase shadow-xl active:scale-95 flex justify-center items-center ${
                isSaving 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-[#d4af37] text-black hover:bg-white shadow-[#d4af37]/10'
              }`}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
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
