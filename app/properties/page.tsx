'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const propiedades = [
  { id: '1', titulo: 'Anatole France 78', zona: 'Polanco', tipo: 'Departamento', precio: 3850000, recamaras: 3, m2: 120, status: 'disponible', descripcion: 'Piso 2, terraza privada, 2 cajones de estacionamiento' },
  { id: '2', titulo: 'Ámsterdam 45', zona: 'Condesa', tipo: 'Departamento', precio: 4200000, recamaras: 2, m2: 95, status: 'disponible', descripcion: 'Planta baja, jardín propio, pet friendly' },
  { id: '3', titulo: 'Hegel 220', zona: 'Polanco', tipo: 'Casa', precio: 8500000, recamaras: 4, m2: 280, status: 'en negociacion', descripcion: 'Casa completa, roof garden, cuarto de servicio' },
  { id: '4', titulo: 'Tamaulipas 12', zona: 'Condesa', tipo: 'Departamento', precio: 2900000, recamaras: 1, m2: 65, status: 'disponible', descripcion: 'Estudio amplio, edificio nuevo, gym' },
  { id: '5', titulo: 'Sierra Nevada 88', zona: 'Lomas', tipo: 'Casa', precio: 12000000, recamaras: 5, m2: 450, status: 'vendida', descripcion: 'Casa con alberca, jardín, 4 cajones' },
  { id: '6', titulo: 'Ozuluama 34', zona: 'Roma Norte', tipo: 'Departamento', precio: 3100000, recamaras: 2, m2: 85, status: 'disponible', descripcion: 'Piso 3, balcón, muy iluminado' },
]

const statusColor: Record<string, { bg: string; color: string; label: string }> = {
  disponible: { bg: '#1a2a1a', color: '#4ecb71', label: 'Disponible' },
  'en negociacion': { bg: '#2a2a1a', color: '#f0c040', label: 'En negociación' },
  vendida: { bg: '#2a1a1a', color: '#e8514a', label: 'Vendida' },
}

const tipoColor: Record<string, string> = { Casa: '#c060e0', Departamento: '#4a90e8', Terreno: '#f0a040' }

function formatMXN(n: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)
}

export default function Properties() {
  const router = useRouter()
  const [filtroZona, setFiltroZona] = useState('todas')
  const [filtroStatus, setFiltroStatus] = useState('todos')

  const zonas = ['todas', ...Array.from(new Set(propiedades.map((p) => p.zona)))]

  const filtradas = propiedades.filter((p) => {
    const zonaOk = filtroZona === 'todas' || p.zona === filtroZona
    const statusOk = filtroStatus === 'todos' || p.status === filtroStatus
    return zonaOk && statusOk
  })

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', color: '#e8e8f0', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ background: '#1a1a2e', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #2a2a3e' }}>
        <button onClick={() => router.push('/')} style={{ background: '#2a2a3e', border: 'none', color: '#8888aa', padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>← Dashboard</button>
        <span style={{ fontWeight: 700, fontSize: 15, marginRight: 'auto' }}>H Homvi</span>
        <button onClick={() => router.push('/properties/new')} style={{ background: '#e8514a', border: 'none', color: '#fff', padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Nueva propiedad</button>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>Propiedades</h1>
          <span style={{ fontSize: 13, color: '#6666aa' }}>{filtradas.length} propiedades</span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const }}>
          {zonas.map((z) => (
            <button key={z} onClick={() => setFiltroZona(z)} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, cursor: 'pointer', border: `1px solid ${filtroZona === z ? '#4a90e8' : '#2a2a3e'}`, background: filtroZona === z ? '#1a2a3a' : '#0f0f1a', color: filtroZona === z ? '#4a90e8' : '#6666aa', textTransform: 'capitalize' as const }}>
              {z}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' as const }}>
          {['todos', 'disponible', 'en negociacion', 'vendida'].map((s) => (
            <button key={s} onClick={() => setFiltroStatus(s)} style={{ padding: '5px 12px', borderRadius: 20, fontSize: 11, cursor: 'pointer', border: `1px solid ${filtroStatus === s ? '#e8514a' : '#2a2a3e'}`, background: filtroStatus === s ? '#2a1a1a' : '#0f0f1a', color: filtroStatus === s ? '#e8514a' : '#6666aa', textTransform: 'capitalize' as const }}>
              {s === 'todos' ? 'Todos' : statusColor[s]?.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
          {filtradas.map((p) => (
            <div key={p.id} onClick={() => router.push(`/properties/${p.id}`)} style={{ background: '#1a1a2e', borderRadius: 12, padding: '16px 20px', border: '1px solid #2a2a3e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}>

              <div style={{ width: 56, height: 56, borderRadius: 10, background: `${tipoColor[p.tipo]}22`, border: `1px solid ${tipoColor[p.tipo]}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                {p.tipo === 'Casa' ? '🏠' : p.tipo === 'Departamento' ? '🏢' : '🌳'}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{p.titulo}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 10, background: statusColor[p.status].bg, color: statusColor[p.status].color }}>
                    {statusColor[p.status].label}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#6666aa', marginBottom: 4 }}>{p.zona} · {p.descripcion}</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 11, color: '#8888aa' }}>🛏 {p.recamaras} rec.</span>
                  <span style={{ fontSize: 11, color: '#8888aa' }}>📐 {p.m2} m²</span>
                  <span style={{ fontSize: 11, color: '#4a90e8' }}>{p.tipo}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#4ecb71' }}>{formatMXN(p.precio)}</div>
                <div style={{ fontSize: 11, color: '#6666aa', marginTop: 4 }}>{formatMXN(Math.round(p.precio / p.m2))}/m²</div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
