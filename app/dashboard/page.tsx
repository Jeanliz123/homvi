'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Cliente {
  id: string
  nombre: string
  etapa: string
  telefono: string
  email: string
  createdAt?: number
}

const etapaColor: Record<string, string> = {
  LEAD: '#4a90e8', BUSCANDO: '#f0a040', 'EN OFERTA': '#4ecb71', CIERRE: '#c060e0',
}

const columnasBase = ['LEAD', 'BUSCANDO', 'EN OFERTA', 'CIERRE']

function getScore(cliente: Cliente): { label: string; emoji: string } {
  if (!cliente.createdAt) return { label: 'Nuevo', emoji: '🔴' }
  const dias = Math.floor((Date.now() - cliente.createdAt) / (1000 * 60 * 60 * 24))
  if (dias <= 3) return { label: 'Caliente', emoji: '🔴' }
  if (dias <= 7) return { label: 'Tibio', emoji: '🟡' }
  return { label: 'Frio', emoji: '⚪' }
}

export default function Dashboard() {
  const router = useRouter()
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    const guardados = localStorage.getItem('homvi_clientes')
    if (guardados) {
      const parsed: Cliente[] = JSON.parse(guardados)
      const conFecha = parsed.map((c) => ({
        ...c,
        createdAt: c.createdAt || Date.now(),
      }))
      localStorage.setItem('homvi_clientes', JSON.stringify(conFecha))
      setClientes(conFecha)
    }
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#1a1a2e', minHeight: '100vh', color: 'white', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#d4a853', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px', color: '#1a1a2e' }}>H</div>
          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>Homvi</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.push('/today')} style={{ background: '#2a2a1a', border: '1px solid #c9b98a44', color: '#c9b98a', padding: '7px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>⚡ Today</button>
          <button onClick={() => router.push('/properties')} style={{ background: '#2a2a3e', border: 'none', color: '#aaaacc', padding: '7px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>🏠 Propiedades</button>
          <span style={{ color: '#d4a853' }}>Buenos días, Luis 👋</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Clientes activos', value: clientes.length, color: '#d4a853', ruta: null },
          { label: 'Follow-ups hoy', value: '3', color: '#ef4444', ruta: '/followups' },
          { label: 'Cierres este mes', value: clientes.filter(c => c.etapa === 'CIERRE').length, color: '#10b981', ruta: null },
          { label: 'Leads nuevos', value: clientes.filter(c => c.etapa === 'LEAD').length, color: '#6366f1', ruta: null },
        ].map((stat) => (
          <div key={stat.label} onClick={() => stat.ruta && router.push(stat.ruta)} style={{ backgroundColor: '#16213e', borderRadius: '12px', padding: '20px', borderLeft: `4px solid ${stat.color}`, cursor: stat.ruta ? 'pointer' : 'default' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#16213e', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', margin: 0 }}>Pipeline de Clientes</h2>
          <button onClick={() => router.push('/clients/new')} style={{ background: '#e8514a', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            + Nuevo cliente
          </button>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          {[['🔴','Caliente','≤3 días'],['🟡','Tibio','4-7 días'],['⚪','Frío','+7 días']].map(([e,l,d]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#6666aa' }}>
              <span>{e}</span><span>{l}</span><span style={{ color: '#3a3a5a' }}>({d})</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {columnasBase.map((etapa) => {
            const color = etapaColor[etapa]
            const delEtapa = clientes.filter(c => c.etapa === etapa)
            return (
              <div key={etapa}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {etapa} <span style={{ color: '#5555aa', fontWeight: 400 }}>({delEtapa.length})</span>
                </div>
                {delEtapa.map((cliente) => {
                  const score = getScore(cliente)
                  return (
                    <div key={cliente.id} onClick={() => router.push(`/clients/${cliente.id}`)} style={{ backgroundColor: '#1a1a2e', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', borderLeft: `3px solid ${color}`, fontSize: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{cliente.nombre}</span>
                      <span title={score.label}>{score.emoji}</span>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}