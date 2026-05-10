'use client'
import Link from 'next/link'

export default function DashboardPage() {
  const stats = [
    { label: 'Clientes Activos', value: '12', trend: '+2 esta semana' },
    { label: 'Cierres del Mes', value: '$1.2M', trend: 'Objetivo: $2M' },
    { label: 'Follow-ups Hoy', value: '5', color: '#d4af37' },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Sidebar / Nav Interna */}
      <div className="flex">
        <aside className="w-64 border-r border-white/5 min-h-screen p-6 hidden md:block">
          <div className="text-[#d4af37] text-xl font-bold tracking-tighter mb-12">HOMVI</div>
          <nav className="space-y-6">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Menú Principal</div>
            <Link href="/dashboard" className="block text-[#d4af37] text-sm">Dashboard</Link>
            <Link href="/clients" className="block text-gray-400 hover:text-white text-sm transition-colors">Clientes</Link>
            <Link href="/properties" className="block text-gray-400 hover:text-white text-sm transition-colors">Propiedades</Link>
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-3xl font-light tracking-tight">Bienvenido, <span className="italic">Luis</span></h1>
              <p className="text-gray-500 text-sm mt-1">Aquí está el estado de tu cartera hoy.</p>
            </div>
            <Link href="/clients/new" className="bg-[#d4af37] text-black px-6 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-all">
              + NUEVO CLIENTE
            </Link>
          </header>

          {/* Tarjetas de Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl font-light mb-1">{stat.value}</p>
                <p className="text-[#d4af37] text-[10px] italic">{stat.trend}</p>
              </div>
            ))}
          </div>

          {/* Sección de Tabla / Lista */}
          <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-sm font-medium uppercase tracking-widest text-gray-400">Pipeline Reciente</h3>
              <span className="text-[10px] text-[#d4af37] cursor-pointer hover:underline">Ver todo</span>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-white/5 text-[10px] uppercase tracking-tighter">
                    <th className="px-6 py-4 font-normal text-gray-400">Cliente</th>
                    <th className="px-6 py-4 font-normal text-gray-400">Propiedad</th>
                    <th className="px-6 py-4 font-normal text-gray-400">Estado</th>
                    <th className="px-6 py-4 font-normal text-gray-400">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: 'María Rodríguez', prop: 'Penthouse Bella Vista', status: 'En Oferta', val: '$450k' },
                    { name: 'Carlos Mendoza', prop: 'Villa Mar Azul', status: 'Cierre', val: '$1.2M' },
                    { name: 'Ana Peralta', prop: 'Residencial Lujo', status: 'Lead', val: '$280k' },
                  ].map((row) => (
                    <tr key={row.name} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 font-light">{row.name}</td>
                      <td className="px-6 py-4 text-gray-500">{row.prop}</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full text-[10px]">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">{row.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
  )
}
