'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../app/lib/supabase'

interface Cliente {
  id: string
  nombre: string
  etapa: string
  tipoPropiedad: string[]
  presupuestoMin: string
}

interface Recordatorio {
  id: string
  cliente_id: string
  texto: string
  fecha: string
  completado: boolean
  clienteNombre?: string
}

export default function Dashboard() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([])

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from('clientes')
        .select('id, nombre, etapa, tipo_propiedad, presupuesto_min')
        .order('created_at', { ascending: false })

      if (data) {
        setClientes(data.map((c) => ({
          id: c.id,
          nombre: c.nombre,
          etapa: c.etapa,
          tipoPropiedad: c.tipo_propiedad || [],
          presupuestoMin: c.presupuesto_min || '',
        })))
      }
    }

    const cargarRecordatorios = async () => {
      const hoy = new Date().toISOString().split('T')[0]
      const en7dias = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

      const { data } = await supabase
        .from('recordatorios')
        .select('*, clientes(nombre)')
        .eq('completado', false)
        .lte('fecha', en7dias)
        .order('fecha', { ascending: true })

      if (data) {
        setRecordatorios(data.map((r) => ({
          id: r.id,
          cliente_id: r.cliente_id,
          texto: r.texto,
          fecha: r.fecha,
          completado: r.completado,
          clienteNombre: r.clientes?.nombre || '',
        })))
      }
    }

    cargar()
    cargarRecordatorios()
  }, [])

  const completarRecordatorio = async (id: string) => {
    await supabase.from('recordatorios').update({ completado: true }).eq('id', id)
    setRecordatorios((prev) => prev.filter((r) => r.id !== id))
  }

  const etapaColor: Record<string, string> = {
    'LEAD': 'text-gray-400 bg-white/5',
    'BUSCANDO': 'text-blue-400 bg-blue-400/10',
    'EN OFERTA': 'text-[#d4af37] bg-[#d4af37]/10',
    'CIERRE': 'text-green-400 bg-green-400/10',
  }

  function formatFechaRecordatorio(fecha: string) {
    const hoy = new Date().toISOString().split('T')[0]
    const manana = new Date(Date.now() + 86400000).toISOString().split('T')[0]
    if (fecha === hoy) return { label: 'Hoy', color: 'text-red-400' }
    if (fecha === manana) return { label: 'Mañana', color: 'text-[#d4af37]' }
    const d = new Date(fecha + 'T12:00:00')
    return {
      label: d.toLocaleDateString('es-DO', { day: 'numeric', month: 'short' }),
      color: 'text-gray-400'
    }
  }

  const recordatoriosHoy = recordatorios.filter(r => r.fecha === new Date().toISOString().split('T')[0])
  const recordatoriosProximos = recordatorios.filter(r => r.fecha !== new Date().toISOString().split('T')[0])

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <nav className="flex justify-between items-center p-6 border-b border-white/5">
        <div className="text-[#d4af37] text-xl font-bold tracking-tighter uppercase italic">Homvi</div>
        <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center text-black text-xs font-bold">LB</div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-light tracking-tight">Bienvenido, <span className="text-[#d4af37] italic">Luis</span></h1>
          <p className="text-gray-500 text-sm mt-2 font-light">Este es el estado actual de tu portafolio hoy.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5">
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-2">Ventas del Mes</p>
            <h2 className="text-3xl font-bold text-[#d4af37]">$4.2M</h2>
          </div>
          <Link href="/properties" className="group">
            <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 group-hover:border-[#d4af37]/50 transition-all cursor-pointer relative overflow-hidden">
              <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-2">Propiedades Activas</p>
              <h2 className="text-3xl font-bold group-hover:text-[#d4af37] transition-colors">24 Unidades</h2>
              <div className="absolute right-8 bottom-8 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
                Ver catálogo →
              </div>
            </div>
          </Link>
          <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5">
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-2">Clientes Activos</p>
            <h2 className="text-3xl font-bold">{clientes.length > 0 ? `+${clientes.length}` : '0'}</h2>
          </div>
        </div>

        {/* Recordatorios */}
        {recordatorios.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                Recordatorios Pendientes
                <span className="ml-2 bg-red-400/10 text-red-400 border border-red-400/30 px-2 py-0.5 rounded-full text-xs">
                  {recordatorios.length}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {recordatorios.map((r) => {
                const { label, color } = formatFechaRecordatorio(r.fecha)
                return (
                  <div key={r.id} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex items-start gap-3 hover:border-[#d4af37]/20 transition-all group">
                    <button
                      onClick={() => completarRecordatorio(r.id)}
                      className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0 mt-0.5 hover:border-green-400 hover:bg-green-400/10 transition-all flex items-center justify-center group-hover:border-[#d4af37]/50"
                      title="Marcar como completado"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white leading-snug">{r.texto}</p>
                      {r.clienteNombre && (
                        <Link href={`/clients/${r.cliente_id}`} className="text-xs text-[#d4af37] hover:underline mt-0.5 block truncate">
                          {r.clienteNombre.split(' ').map((n: string) => n.charAt(0).toUpperCase() + n.slice(1)).join(' ')}
                        </Link>
                      )}
                    </div>
                    <span className={`text-xs font-bold flex-shrink-0 ${color}`}>{label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Pipeline + Agenda */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-[#0a0a0a] rounded-[2rem] border border-white/5 p-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-6">Pipeline de Clientes</h3>
            {clientes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-sm">No hay clientes aún.</p>
                <Link href="/clients/new" className="mt-4 inline-block text-xs text-[#d4af37] uppercase tracking-widest hover:text-white transition-colors">
                  + Registrar primer cliente
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {clientes.map((c) => (
                  <Link key={c.id} href={`/clients/${c.id}`}>
                    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/2 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] text-xs font-bold">
                          {c.nombre.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:text-[#d4af37] transition-colors">
                            {c.nombre.split(' ').map((n) => n.charAt(0).toUpperCase() + n.slice(1)).join(' ')}
                          </p>
                          <p className="text-gray-500 text-xs">{c.tipoPropiedad?.[0] || '—'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${etapaColor[c.etapa] || 'text-gray-400 bg-white/5'}`}>
                          {c.etapa}
                        </span>
                        <span className="text-sm font-bold text-[#d4af37]">
                          {c.presupuestoMin ? `$${Number(c.presupuestoMin.replace(/\D/g,'')).toLocaleString()}` : '—'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 p-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-6">Agenda de Hoy</h3>
            <div className="space-y-5">
              {[
                { hora: '10:00 AM', cliente: 'María González', tipo: 'Firma de contrato' },
                { hora: '2:00 PM', cliente: 'Carlos Reyes', tipo: 'Segunda visita' },
                { hora: '4:30 PM', cliente: 'Pedro Núñez', tipo: 'Llamada de seguimiento' },
              ].map((c, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-[#d4af37] text-xs font-bold w-16 pt-0.5">{c.hora}</div>
                  <div className="border-l border-white/10 pl-4">
                    <p className="text-sm font-medium">{c.cliente}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{c.tipo}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/today" className="mt-8 block text-center text-xs text-[#d4af37] hover:text-white transition-colors uppercase tracking-widest">
              Ver agenda completa →
            </Link>
          </div>
        </div>

        <section>
          <h3 className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-6 font-bold">Acciones Rápidas</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/today" className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#d4af37] transition-colors">
              Ver Agenda de Hoy
            </Link>
            <Link href="/clients/new" className="px-8 py-4 bg-transparent border border-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">
              Nuevo Cliente
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
