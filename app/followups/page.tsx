'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const followups = [
  { id: '1', cliente: 'María R.', tipo: 'llamada', titulo: 'Llamada de seguimiento', detalle: 'Confirmar visita a Polanco 34', fecha: 'Hoy', hora: '10:00 am', urgencia: 'alta', hecho: false },
  { id: '2', cliente: 'Carlos M.', tipo: 'visita', titulo: 'Visita a propiedad', detalle: 'Anatole France 78, Polanco', fecha: 'Hoy', hora: '12:30 pm', urgencia: 'alta', hecho: false },
  { id: '3', cliente: 'Ana P.', tipo: 'documento', titulo: 'Enviar carta oferta', detalle: 'Condiciones acordadas la semana pasada', fecha: 'Hoy', hora: '3:00 pm', urgencia: 'media', hecho: false },
  { id: '4', cliente: 'José L.', tipo: 'llamada', titulo: 'Llamada inicial', detalle: 'Primer contacto, entender necesidades', fecha: 'Mañana', hora: '9:00 am', urgencia: 'baja', hecho: false },
  { id: '5', cliente: 'Carmen V.', tipo: 'documento', titulo: 'Revisión de contrato', detalle: 'Enviar al notario para revisión', fecha: 'Mañana', hora: '11:00 am', urgencia: 'media', hecho: false },
  { id: '6', cliente: 'Pedro A.', tipo: 'visita', titulo: '2ª visita', detalle: 'Revisitar con esposa', fecha: 'Vie 9 mayo', hora: '4:00 pm', urgencia: 'baja', hecho: false },
]

const tipoIcono: Record<string, string> = { llamada: '📞', visita: '🏠', documento: '📄', otro: '📌' }
const tipoBg: Record<string, string> = { llamada: '#1a2a3a', visita: '#2a1a2a', documento: '#1a2a1a', otro: '#22223a' }
const tipoColor: Record<string, string> = { llamada: '#4a90e8', visita: '#c060e0', documento: '#4ecb71', otro: '#9999cc' }
const urgenciaBadge: Record<string, { bg: string; color: string; label: string }> = {
  alta: { bg: '#2a1a1a', color: '#e8514a', label: 'Urgente' },
  media: { bg: '#2a2a1a', color: '#f0c040', label: 'Esta semana' },
  baja: { bg: '#1a2a1a', color: '#4ecb71', label: 'Sin prisa' },
}

export default function FollowUps() {
  const router = useRouter()
  const [items, setItems] = useState(followups)
  const [filtro, setFiltro] = useState('todos')

  const toggle = (id: string) =>
    setItems((prev) => prev.map((f) => f.id === id ? { ...f, hecho: !f.hecho } : f))

  const filtrados = items.filter((f) => {
    if (filtro === 'hoy') return f.fecha === 'Hoy'
    if (filtro === 'pendientes') return !f.hecho
    return true
  })

  const hechos = items.filter((f) => f.hecho).length
  const total = items.length

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', color: '#e8e8f0', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ background: '#1a1a2e', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #2a2a3e' }}>
        <button onClick={() => router.push('/')} style={{ background: '#2a2a3e', border: 'none', color: '#8888aa', padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>← Dashboard</button>
        <span style={{ fontWeight: 700, fontSize: 15, marginRight: 'auto' }}>H Homvi</span>
        <span style={{ fontSize: 13, color: '#8888aa' }}>{hechos}/{total} completados</span>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>Follow-ups</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            {['todos', 'hoy', 'pendientes'].map((f) => (
              <button key={f} onClick={() => setFiltro(f)} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, cursor: 'pointer', border: `1px solid ${filtro === f ? '#e8514a' : '#2a2a3e'}`, background: filtro === f ? '#2a1a1a' : '#0f0f1a', color: filtro === f ? '#e8514a' : '#6666aa', textTransform: 'capitalize' as const }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a1a2e', borderRadius: 10, padding: '4px 16px', marginBottom: 24, border: '1px solid #2a2a3e' }}>
          <div style={{ height: 6, background: '#2a2a3e', borderRadius: 3, margin: '12px 0' }}>
            <div style={{ height: 6, background: '#4ecb71', borderRadius: 3, width: `${(hechos / total) * 100}%`, transition: 'width 0.3s' }} />
          </div>
          <div style={{ fontSize: 11, color: '#6666aa', marginBottom: 12 }}>{hechos} de {total} follow-ups completados hoy</div>
        </div>

        {['Hoy', 'Mañana', 'Vie 9 mayo'].map((dia) => {
          const delDia = filtrados.filter((f) => f.fecha === dia)
          if (delDia.length === 0) return null
          return (
            <div key={dia} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#5555aa', marginBottom: 12 }}>{dia}</div>
              {delDia.map((f) => (
                <div key={f.id} onClick={() => toggle(f.id)} style={{ background: '#1a1a2e', borderRadius: 10, padding: '14px 16px', marginBottom: 8, border: `1px solid ${f.hecho ? '#1a2a1a' : '#2a2a3e'}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', opacity: f.hecho ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${f.hecho ? '#4ecb71' : '#3a3a5a'}`, background: f.hecho ? '#4ecb71' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, color: '#fff' }}>
                    {f.hecho ? '✓' : ''}
                  </div>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: tipoBg[f.tipo], color: tipoColor[f.tipo], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                    {tipoIcono[f.tipo]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: f.hecho ? '#5555aa' : '#ccccee', marginBottom: 2, textDecoration: f.hecho ? 'line-through' : 'none' }}>{f.titulo}</div>
                    <div style={{ fontSize: 11, color: '#6666aa' }}>{f.cliente} · {f.detalle}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: 4 }}>
                    <div style={{ fontSize: 11, color: '#8888aa' }}>{f.hora}</div>
                    <div style={{ padding: '2px 8px', borderRadius: 10, fontSize: 10, background: urgenciaBadge[f.urgencia].bg, color: urgenciaBadge[f.urgencia].color }}>
                      {urgenciaBadge[f.urgencia].label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
