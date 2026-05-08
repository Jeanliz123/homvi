'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Cliente {
  id: string
  nombre: string
  etapa: string
  telefono: string
  createdAt?: number
}

interface FollowUp {
  id: string
  cliente: string
  tipo: string
  titulo: string
  hora: string
  urgencia: string
}

const followupsHoy: FollowUp[] = [
  { id: '1', cliente: 'María R.', tipo: '📞', titulo: 'Llamada de seguimiento', hora: '10:00 am', urgencia: 'alta' },
  { id: '2', cliente: 'Carlos M.', tipo: '🏠', titulo: 'Visita a propiedad', hora: '12:30 pm', urgencia: 'alta' },
  { id: '3', cliente: 'Ana P.', tipo: '📄', titulo: 'Enviar carta oferta', hora: '3:00 pm', urgencia: 'media' },
]

function getScore(createdAt?: number): string {
  if (!createdAt) return '🔴'
  const dias = Math.floor((Date.now() - createdAt) / (1000 * 60 * 60 * 24))
  if (dias <= 3) return '🔴'
  if (dias <= 7) return '🟡'
  return '⚪'
}

export default function TodayView() {
  const router = useRouter()
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [hechos, setHechos] = useState<string[]>([])

  const now = new Date()
  const hora = now.getHours()
  const saludo = hora < 12 ? 'Buenos días' : hora < 18 ? 'Buenas tardes' : 'Buenas noches'
  const fecha = now.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })

  useEffect(() => {
    const guardados = localStorage.getItem('homvi_clientes')
    if (guardados) setClientes(JSON.parse(guardados))
  }, [])

  const toggleHecho = (id: string) =>
    setHechos((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])

  const calientes = clientes.filter((c) => {
    if (!c.createdAt) return true
    return Math.floor((Date.now() - c.createdAt) / (1000 * 60 * 60 * 24)) <= 3
  })

  const enRiesgo = clientes.filter((c) => {
    if (!c.createdAt) return false
    return Math.floor((Date.now() - c.createdAt) / (1000 * 60 * 60 * 24)) > 7
  })

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', color: '#e8e8f0', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ background: '#1a1a2e', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #2a2a3e' }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: '#2a2a3e', border: 'none', color: '#8888aa', padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>← Dashboard</button>
        <span style={{ fontWeight: 700, fontSize: 15, marginRight: 'auto' }}>H Homvi</span>
        <span style={{ fontSize: 12, color: '#6666aa', textTransform: 'capitalize' }}>{fecha}</span>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#c9b98a', marginBottom: 8 }}>Today View</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{saludo}, Luis 👋</h1>
          <p style={{ fontSize: 14, color: '#6666aa', marginTop: 6 }}>
            Tienes <span style={{ color: '#e8514a', fontWeight: 600 }}>{followupsHoy.length - hechos.length} tareas pendientes</span> y <span style={{ color: '#4ecb71', fontWeight: 600 }}>{calientes.length} leads calientes</span> hoy.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { label: 'Clientes totales', value: clientes.length, color: '#c9b98a' },
            { label: 'Leads calientes', value: calientes.length, color: '#e8514a' },
            { label: 'En riesgo', value: enRiesgo.length, color: '#f0c040' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#1a1a2e', borderRadius: 10, padding: 16, border: '1px solid #2a2a3e', textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#6666aa', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#5555aa', marginBottom: 12 }}>Tareas de hoy</div>
          {followupsHoy.map((f) => (
            <div key={f.id} onClick={() => toggleHecho(f.id)} style={{ background: '#1a1a2e', borderRadius: 10, padding: '14px 16px', marginBottom: 8, border: `1px solid ${hechos.includes(f.id) ? '#1a2a1a' : '#2a2a3e'}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', opacity: hechos.includes(f.id) ? 0.5 : 1 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${hechos.includes(f.id) ? '#4ecb71' : '#3a3a5a'}`, background: hechos.includes(f.id) ? '#4ecb71' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', flexShrink: 0 }}>
                {hechos.includes(f.id) ? '✓' : ''}
              </div>
              <span style={{ fontSize: 18 }}>{f.tipo}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: hechos.includes(f.id) ? '#5555aa' : '#ccccee', textDecoration: hechos.includes(f.id) ? 'line-through' : 'none' }}>{f.titulo}</div>
                <div style={{ fontSize: 11, color: '#6666aa' }}>{f.cliente}</div>
              </div>
              <div style={{ fontSize: 11, color: f.urgencia === 'alta' ? '#e8514a' : '#f0c040', fontWeight: 600 }}>{f.hora}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#5555aa', marginBottom: 12 }}>Leads calientes 🔴</div>
          {calientes.length === 0 ? (
            <div style={{ fontSize: 13, color: '#6666aa', fontStyle: 'italic' }}>No hay leads calientes hoy.</div>
          ) : (
            calientes.map((c) => (
              <div key={c.id} onClick={() => router.push(`/clients/${c.id}`)} style={{ background: '#1a1a2e', borderRadius: 10, padding: '12px 16px', marginBottom: 8, border: '1px solid #2a2a3e', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #e8514a, #f06a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                  {c.nombre.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#ccccee' }}>{c.nombre}</div>
                  <div style={{ fontSize: 11, color: '#6666aa' }}>{c.etapa}</div>
                </div>
                <span>{getScore(c.createdAt)}</span>
              </div>
            ))
          )}
        </div>

        {enRiesgo.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#5555aa', marginBottom: 12 }}>En riesgo de perderse ⚪</div>
            {enRiesgo.map((c) => (
              <div key={c.id} onClick={() => router.push(`/clients/${c.id}`)} style={{ background: '#1a1a2e', borderRadius: 10, padding: '12px 16px', marginBottom: 8, border: '1px solid #2a1a1a', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2a2a3e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#6666aa', flexShrink: 0 }}>
                  {c.nombre.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#ccccee' }}>{c.nombre}</div>
                  <div style={{ fontSize: 11, color: '#6666aa' }}>{c.etapa} · Sin contacto +7 días</div>
                </div>
                <span style={{ fontSize: 11, color: '#e8514a', fontWeight: 600 }}>Contactar →</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => router.push('/clients/new')} style={{ flex: 1, padding: 14, background: '#e8514a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Nuevo cliente</button>
          <button onClick={() => router.push('/followups')} style={{ flex: 1, padding: 14, background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: 8, color: '#ccccee', fontSize: 13, cursor: 'pointer' }}>Ver todos los follow-ups</button>
        </div>

      </div>
    </div>
  )
}