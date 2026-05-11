'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function TodayPage() {
  const [notes, setNotes] = useState([
    'Llamar a la constructora por el avance de obra en Bella Vista.',
    'Enviar contrato actualizado a María R. antes de las 5pm.',
    'Confirmar visita de Carlos M. al Penthouse mañana a las 10am.',
  ])
  const [newNote, setNewNote] = useState('')

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()])
      setNewNote('')
    }
  }

  const appointments = [
    { time: '09:00 AM', client: 'Pedro N.', action: 'Llamada de seguimiento', type: 'Llamada' },
    { time: '11:30 AM', client: 'Ana M.', action: 'Presentación PH Naco', type: 'Cita' },
    { time: '14:00 PM', client: 'Carlos M.', action: 'Visita Penthouse', type: 'Cita' },
    { time: '16:30 PM', client: 'María R.', action: 'Revisión de Contrato', type: 'Urgente' },
    { time: '18:00 PM', client: 'Roberto D.', action: 'Cierre Villa Cacicazgos', type: 'Cierre' },
  ]

  const typeColor: Record<string, string> = {
    'Llamada': 'border-white/10 text-gray-400',
    'Cita': 'border-blue-400/30 text-blue-400',
    'Urgente': 'border-red-400/30 text-red-400',
    'Cierre': 'border-green-400/30 text-green-400',
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#d4af37]/30">
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <header className="mb-10">
          <h1 className="text-4xl font-light tracking-tight italic">Resumen de <span className="not-italic text-[#d4af37]">Hoy</span></h1>
          <p className="text-gray-500 text-sm mt-2 font-light italic">Bienvenido, Luis. Esto es lo que tienes pendiente para cerrar el día.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Citas */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-[#d4af37] text-xs uppercase tracking-[0.2em] font-bold mb-6">Próximas Citas</h3>
            {appointments.map((item, index) => (
              <div key={index} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[2rem] flex items-center justify-between hover:border-[#d4af37]/30 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="text-[#d4af37] font-mono text-base tracking-tighter w-20">{item.time}</div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-[#d4af37] transition-colors">{item.action}</h4>
                    <p className="text-gray-500 text-xs mt-1 italic">Cliente: {item.client}</p>
                  </div>
                </div>
                <span className={`text-[9px] border px-4 py-1 rounded-full uppercase tracking-widest ${typeColor[item.type]}`}>
                  {item.type}
                </span>
              </div>
            ))}
            <button className="w-full border border-dashed border-white/10 p-5 rounded-[2rem] text-gray-600 text-xs uppercase tracking-widest hover:border-[#d4af37]/40 hover:text-[#d4af37] transition-all">
              + Programar nueva actividad
            </button>
          </div>

          {/* Notas */}
          <div className="space-y-4">
            <h3 className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mb-6">Notas Rápidas</h3>
            {notes.map((note, i) => (
              <div key={i} className="bg-[#d4af37]/5 border border-[#d4af37]/10 p-5 rounded-[1.5rem]">
                <p className="text-gray-300 text-sm font-light leading-relaxed">{note}</p>
              </div>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Nueva nota..."
                className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4af37]/50 resize-none h-20 transition-all"
              />
              <button
                onClick={addNote}
                className="w-full py-3 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs uppercase tracking-widest font-bold hover:bg-[#d4af37] hover:text-black transition-all"
              >
                + Añadir nota
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
