'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NuevoCliente() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: '', telefono: '', email: '', etapa: 'LEAD',
    presupuestoMin: '', presupuestoMax: '',
    tipoPropiedad: [] as string[], recamaras: '',
    plazo: '', financiamiento: '', zonas: [] as string[], notas: '',
  })

  const update = (field: string, value: string | string[]) =>
    setForm((f) => ({ ...f, [field]: value }))

  const toggleItem = (field: 'tipoPropiedad' | 'zonas', value: string) =>
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value) ? f[field].filter((i) => i !== value) : [...f[field], value],
    }))

  const guardar = () => {
    if (!form.nombre.trim()) return alert('El nombre es obligatorio')
    const guardados = localStorage.getItem('homvi_clientes')
    const clientes = guardados ? JSON.parse(guardados) : []
    const nuevo = { ...form, id: Date.now().toString() }
    clientes.push(nuevo)
    localStorage.setItem('homvi_clientes', JSON.stringify(clientes))
    router.push('/')
  }

  const etapas = ['LEAD', 'BUSCANDO', 'EN OFERTA', 'CIERRE']
  const etapaColor: Record<string, string> = { LEAD: '#4a90e8', BUSCANDO: '#f0a040', 'EN OFERTA': '#4ecb71', CIERRE: '#c060e0' }
  const tipos = ['Casa', 'Departamento', 'Terreno', 'Local comercial']
  const zonasOpciones = ['Polanco', 'Condesa', 'Roma Norte', 'Lomas', 'Santa Fe', 'Coyoacan', 'Narvarte', 'Del Valle']
  const recamarasOpciones = ['1', '2', '3', '4+']
  const plazos = ['1 mes', '2-3 meses', '3-6 meses', '6+ meses']
  const financiamientos = ['Contado', 'Credito Hipotecario', 'Infonavit', 'Fovissste']

  const inputStyle = { width: '100%', background: '#0f0f1a', border: '1px solid #2a2a3e', borderRadius: 8, padding: '10px 12px', color: '#e8e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const }
  const chip = (active: boolean, color = '#4a90e8') => ({ padding: '6px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer', border: `1px solid ${active ? color : '#2a2a3e'}`, background: active ? color + '22' : '#0f0f1a', color: active ? color : '#6666aa' })
  const section = { marginBottom: 24 }
  const sectionTitle = { fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#5555aa', marginBottom: 12 }
  const sectionBox = { background: '#1a1a2e', borderRadius: 10, padding: 16, border: '1px solid #2a2a3e' }

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', color: '#e8e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#1a1a2e', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #2a2a3e' }}>
        <button onClick={() => router.back()} style={{ background: '#2a2a3e', border: 'none', color: '#8888aa', padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>Pipeline</button>
        <span style={{ fontWeight: 700, fontSize: 15, marginRight: 'auto' }}>H Homvi</span>
        <span style={{ fontSize: 14, color: '#8888aa' }}>Nuevo cliente</span>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#fff' }}>Agregar cliente</h1>
        <div style={section}>
          <div style={sectionTitle}>Datos de contacto</div>
          <div style={sectionBox}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <input placeholder="Nombre completo" value={form.nombre} onChange={(e) => update('nombre', e.target.value)} style={inputStyle} />
              <input placeholder="Telefono" value={form.telefono} onChange={(e) => update('telefono', e.target.value)} style={inputStyle} />
            </div>
            <input placeholder="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} style={inputStyle} />
          </div>
        </div>
        <div style={section}>
          <div style={sectionTitle}>Etapa en el pipeline</div>
          <div style={sectionBox}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {etapas.map((e) => <button key={e} onClick={() => update('etapa', e)} style={chip(form.etapa === e, etapaColor[e])}>{e}</button>)}
            </div>
          </div>
        </div>
        <div style={section}>
          <div style={sectionTitle}>Presupuesto</div>
          <div style={sectionBox}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: '#6666aa', marginBottom: 6 }}>Minimo</div>
                <input placeholder="$0" value={form.presupuestoMin} onChange={(e) => update('presupuestoMin', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#6666aa', marginBottom: 6 }}>Maximo</div>
                <input placeholder="$0" value={form.presupuestoMax} onChange={(e) => update('presupuestoMax', e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>
        </div>
        <div style={section}>
          <div style={sectionTitle}>Tipo de propiedad</div>
          <div style={sectionBox}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {tipos.map((t) => <button key={t} onClick={() => toggleItem('tipoPropiedad', t)} style={chip(form.tipoPropiedad.includes(t))}>{t}</button>)}
            </div>
          </div>
        </div>
        <div style={section}>
          <div style={sectionTitle}>Recamaras</div>
          <div style={sectionBox}>
            <div style={{ display: 'flex', gap: 8 }}>
              {recamarasOpciones.map((r) => <button key={r} onClick={() => update('recamaras', r)} style={chip(form.recamaras === r)}>{r}</button>)}
            </div>
          </div>
        </div>
        <div style={section}>
          <div style={sectionTitle}>Plazo de compra</div>
          <div style={sectionBox}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {plazos.map((p) => <button key={p} onClick={() => update('plazo', p)} style={chip(form.plazo === p)}>{p}</button>)}
            </div>
          </div>
        </div>
        <div style={section}>
          <div style={sectionTitle}>Financiamiento</div>
          <div style={sectionBox}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {financiamientos.map((f) => <button key={f} onClick={() => update('financiamiento', f)} style={chip(form.financiamiento === f)}>{f}</button>)}
            </div>
          </div>
        </div>
        <div style={section}>
          <div style={sectionTitle}>Zonas de interes</div>
          <div style={sectionBox}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {zonasOpciones.map((z) => <button key={z} onClick={() => toggleItem('zonas', z)} style={chip(form.zonas.includes(z))}>{z}</button>)}
            </div>
          </div>
        </div>
        <div style={section}>
          <div style={sectionTitle}>Notas</div>
          <div style={sectionBox}>
            <textarea placeholder="Preferencias, observaciones, contexto..." value={form.notas} onChange={(e) => update('notas', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' as const, fontFamily: 'system-ui, sans-serif' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingBottom: 40 }}>
          <button onClick={() => router.back()} style={{ flex: 1, padding: 12, background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: 8, color: '#8888aa', fontSize: 14, cursor: 'pointer' }}>Cancelar</button>
          <button onClick={guardar} style={{ flex: 2, padding: 12, background: '#e8514a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Guardar cliente</button>
        </div>
      </div>
    </div>
  )
}
