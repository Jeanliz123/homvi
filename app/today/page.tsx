'use client'

export default function TodayPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-light tracking-tight">
          Resumen de <span className="text-[#d4af37] font-medium">Hoy</span>
        </h1>
        <p className="text-gray-400 mt-2">Bienvenido, Luis. Esto es lo que tienes pendiente.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Ejemplo */}
        <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
          <h3 className="text-[#d4af37] text-sm uppercase tracking-widest mb-4">Próximas Citas</h3>
          <ul className="space-y-4">
            <li className="flex flex-col border-l-2 border-[#d4af37] pl-4">
              <span className="font-medium">Visita Penthouse</span>
              <span className="text-xs text-gray-500">14:00 PM - Cliente: Carlos M.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}