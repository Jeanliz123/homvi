'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'

type Stage = 'LEAD' | 'BUSCANDO' | 'EN OFERTA' | 'CIERRE'

interface Cliente {
  id: string
  nombre: string
  telefono: string
  email: string
  etapa: Stage
  presupuestoMin: string
  presupuestoMax: string
  tipoPropiedad: string[]
  recamaras: string
  plazo: string
  financiamiento: string
  zonas: string[]
  notas: string
}

const etapaColor: Record<Stage, { bg: string; text: string; border: string }> = {
  LEAD: { bg: '#1a1f2a', text: '#4a90e8', border: '#4a90e8' },
  BUSCANDO: { bg: '#2a1a0a', text: '#f0a040', border: '#f0a040' },
  'EN OFERTA': { bg: '#1a2a1a', text: '#4ecb71', border: '#4ecb71' },
  CIERRE: { bg: '#2a1a2a', text: '#c060e0', border: '#c060e0' },
}

const etapas: Stage[] = ['LEAD', 'BUSCANDO', 'EN OFERTA', 'CIERRE']

const plantillas = [
  { id: 'p1', label: 'Primer contacto', icono: '👋', mensaje: (n: string) => `Hola ${n}, te contacto porque creo que puedo ayudarte a encontrar la propiedad ideal. ¿Tienes unos minutos para conversar esta semana?` },
  { id: 'p2', label: 'Post visita', icono: '🏠', mensaje: (n: string) => `Hola ${n}, espero que hayas disfrutado la visita de hoy. ¿Tienes alguna pregunta sobre la propiedad que vimos?` },
  { id: 'p3', label: 'Follow-up', icono: '🔁', mensaje: (n: string) => `Hola ${n}, solo quería saber cómo vas con la decisión. Estoy aquí para ayudarte en lo que necesites.` },
  { id: 'p4', label: 'Nueva propiedad', icono: '✨', mensaje: (n: string) => `${n}, acaba de entrar una propiedad que creo que te va a interesar mucho. ¿Te la muestro esta semana?` },
  { id: 'p5', label: 'Negociación', icono: '🤝', mensaje: (n: string) => `Hola ${n}, he hablado con el vendedor y tenemos margen para negociar. ¿Podemos hablar hoy para coordinar los siguientes pasos?` },
  { id: 'p6', label: 'Cierre próximo', icono: '🎉', mensaje: (n: string) => `${n}, estamos muy cerca del cierre. Solo necesito confirmar algunos detalles finales. ¿Tienes disponibilidad esta semana?` },
]

function initiales(nombre: string) {
  return nombre.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

function generarMensajeAuto(cliente: Cliente): string {
  const nombre = cliente.nombre.split(' ')[0]
  const zona = cliente.zonas?.[0] || 'la zona'
  const msgs: Record<Stage, string[]> = {
    LEAD: [
      `Hola ${nombre}, te contacto de parte de Homvi. ¿Tienes unos minutos para conversar sobre lo que buscas?`,
      `Buenos días ${nombre}, me gustaría conocer qué tipo de propiedad estás buscando. ¿Te viene bien una llamada esta semana?`,
    ],
    BUSCANDO: [
      `Hola ${nombre}, tengo propiedades nuevas en ${zona} que creo que te van a interesar. ¿Cuándo podríamos coordinar una visita?`,
      `${nombre}, acaba de entrar una propiedad que coincide con lo que buscas. ¿Te la muestro esta semana?`,
    ],
    'EN OFERTA': [
      `Hola ${nombre}, quería darte seguimiento a la oferta. ¿Has tenido oportunidad de revisarla?`,
      `${nombre}, ¿cómo vas con la decisión? Estoy aquí para resolver cualquier duda.`,
    ],
    CIERRE: [
      `${nombre}, ya estamos muy cerca del cierre. ¿Tienes disponibilidad esta semana para coordinar la firma?`,
      `Hola ${nombre}, felicitaciones, estamos en la recta final. Te contacto para coordinar los últimos pasos.`,
    ],
  }
  const opciones = msgs[cliente.etapa]
  return opciones[Math.floor(Math.random() * opciones.length)]
}

export default function ClienteDetalle({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [mostrarCopilot, setMostrarCopilot] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [tabActivo, setTabActivo] = useState<'auto' | 'plantillas'>('auto')

  useEffect(() => {
    const guardados = localStorage.getItem('homvi_clientes')
    if (guardados) {
      const clientes: Cliente[] = JSON.parse(guardados)
      const encontrado = clientes.find((c) => c.id === id)
      if (encontrado) setCliente(encontrado)
    }
  }, [id])

  const cambiarEtapa = (nuevaEtapa: Stage) => {
    if (!cliente) return
    const guardados = localStorage.getItem('homvi_clientes')
    if (!guardados) return
    const clientes: Cliente[] = JSON.parse(guardados)
    const actualizados = clientes.map((c) => c.id === cliente.id ? { ...c, etapa: nuevaEtapa } : c)
    localStorage.setItem('homvi_clientes', JSON.stringify(actualizados))
    setCliente({ ...cliente, etapa: nuevaEtapa })
  }

  const seleccionarMensaje = (texto: string) => {
    setMensaje(texto)
    setMostrarCopilot(true)
    setCopiado(false)
  }

  const copiar = () => {
    navigator.clipboard.writeText(mensaje)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const abrirWhatsApp = () => {
    if (!cliente?.telefono || !mensaje) return
    const numero = cliente.telefono.replace(/\D/g, '')
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank')
  }

  if (!cliente) return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8888aa', fontFamily: 'system-ui' }}>
      Cargando...
    </div>
  )

  const etapa = etapaColor[cliente.etapa]

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', color: '#e8e8f0', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ background: '#1a1a2e', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #2a2a3e' }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: '#2a2a3e', border: 'none', color: '#8888aa', padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>← Pipeline</button>
        <span style={{ fontWeight: 700, fontSize: 15, marginRight: 'auto' }}>H Homvi</span>
        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: '.5px', textTransform: 'uppercase', background: etapa.bg, color: etapa.text, border: `1px solid ${etapa.border}` }}>
          {cliente.etapa}
        </span>
      </div>

      <div style={{ background: '#1a1a2e', padding: '20px', display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid #2a2a3e' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #e8514a, #f06a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: '#fff', flexShrink: 0 }}>
          {initiales(cliente.nombre)}
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{cliente.nombre}</h1>
          <p style={{ fontSize: 13, color: '#8888aa' }}>{cliente.telefono}{cliente.telefono && cliente.email && ' · '}{cliente.email}</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={() => { seleccionarMensaje(generarMensajeAuto(cliente)); setTabActivo('auto') }} style={{ background: '#2a1a3a', border: '1px solid #6030a0', color: '#c060e0', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            ✨ Generar mensaje
          </button>
          <button onClick={() => { setMostrarCopilot(true); setTabActivo('plantillas'); setMensaje('') }} style={{ background: '#1a2a3a', border: '1px solid #4a90e8', color: '#4a90e8', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            📋 Plantillas
          </button>
          {cliente.telefono && (
            <button onClick={() => window.open(`https://wa.me/${cliente.telefono.replace(/\D/g,'')}`, '_blank')} style={{ background: '#1a2a1a', border: '1px solid #4ecb71', color: '#4ecb71', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              WhatsApp
            </button>
          )}
        </div>
      </div>

      {mostrarCopilot && (
        <div style={{ background: '#12112a', border: '1px solid #3a2a5a', margin: '16px', borderRadius: 10, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 0 }}>
              <button onClick={() => setTabActivo('auto')} style={{ padding: '6px 14px', fontSize: 12, cursor: 'pointer', background: tabActivo === 'auto' ? '#2a1a3a' : 'transparent', color: tabActivo === 'auto' ? '#c060e0' : '#6666aa', border: '1px solid #3a2a5a', borderRadius: '6px 0 0 6px', borderRight: 'none' }}>
                ✨ Auto
              </button>
              <button onClick={() => setTabActivo('plantillas')} style={{ padding: '6px 14px', fontSize: 12, cursor: 'pointer', background: tabActivo === 'plantillas' ? '#1a2a3a' : 'transparent', color: tabActivo === 'plantillas' ? '#4a90e8' : '#6666aa', border: '1px solid #3a2a5a', borderRadius: '0 6px 6px 0' }}>
                📋 Plantillas
              </button>
            </div>
            <button onClick={() => setMostrarCopilot(false)} style={{ background: 'none', border: 'none', color: '#6666aa', cursor: 'pointer', fontSize: 16 }}>✕</button>
          </div>

          {tabActivo === 'plantillas' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: mensaje ? 12 : 0 }}>
              {plantillas.map((p) => (
                <button key={p.id} onClick={() => seleccionarMensaje(p.mensaje(cliente.nombre.split(' ')[0]))} style={{ background: '#0f0f1a', border: '1px solid #2a2a3e', borderRadius: 8, padding: '10px 12px', color: '#ccccee', fontSize: 12, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{p.icono}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          )}

          {mensaje && (
            <>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={3}
                style={{ width: '100%', background: '#0f0f1a', border: '1px solid #2a2a3e', borderRadius: 8, padding: '10px 12px', color: '#e8e8f0', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'system-ui', boxSizing: 'border-box' }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {tabActivo === 'auto' && (
                  <button onClick={() => seleccionarMensaje(generarMensajeAuto(cliente))} style={{ background: '#2a1a3a', border: '1px solid #6030a0', color: '#c060e0', padding: '8px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>
                    Otro mensaje
                  </button>
                )}
                <button onClick={copiar} style={{ background: copiado ? '#1a2a1a' : '#1a2a3a', border: `1px solid ${copiado ? '#4ecb71' : '#4a90e8'}`, color: copiado ? '#4ecb71' : '#4a90e8', padding: '8px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>
                  {copiado ? '✓ Copiado' : 'Copiar'}
                </button>
                {cliente.telefono && (
                  <button onClick={abrirWhatsApp} style={{ background: '#1a2a1a', border: '1px solid #4ecb71', color: '#4ecb71', padding: '8px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer', marginLeft: 'auto' }}>
                    Enviar por WhatsApp →
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ padding: 16, borderRight: '1px solid #2a2a3e' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#5555aa', marginBottom: 12 }}>Perfil de busqueda</div>
          <div style={{ background: '#1a1a2e', borderRadius: 10, padding: 14, marginBottom: 12, border: '1px solid #2a2a3e' }}>
            {cliente.presupuestoMin && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #2a2a3e' }}><span style={{ fontSize: 12, color: '#6666aa' }}>Presupuesto</span><span style={{ fontSize: 13, color: '#4ecb71', fontWeight: 700 }}>${cliente.presupuestoMin} - ${cliente.presupuestoMax}</span></div>}
            {cliente.tipoPropiedad?.length > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #2a2a3e' }}><span style={{ fontSize: 12, color: '#6666aa' }}>Tipo</span><span style={{ fontSize: 13, color: '#ccccee' }}>{cliente.tipoPropiedad.join(' · ')}</span></div>}
            {cliente.recamaras && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #2a2a3e' }}><span style={{ fontSize: 12, color: '#6666aa' }}>Recamaras</span><span style={{ fontSize: 13, color: '#ccccee' }}>{cliente.recamaras}</span></div>}
            {cliente.plazo && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #2a2a3e' }}><span style={{ fontSize: 12, color: '#6666aa' }}>Plazo</span><span style={{ fontSize: 13, color: '#ccccee' }}>{cliente.plazo}</span></div>}
            {cliente.financiamiento && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span style={{ fontSize: 12, color: '#6666aa' }}>Financiamiento</span><span style={{ fontSize: 13, color: '#ccccee' }}>{cliente.financiamiento}</span></div>}
          </div>
          {cliente.zonas?.length > 0 && <>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#5555aa', marginBottom: 12, marginTop: 4 }}>Zonas de interes</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {cliente.zonas.map((zona) => <span key={zona} style={{ background: '#22223a', padding: '4px 9px', borderRadius: 5, fontSize: 11, color: '#9999cc', border: '1px solid #33335a' }}>{zona}</span>)}
            </div>
          </>}
          {cliente.notas && <>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#5555aa', marginBottom: 12 }}>Notas</div>
            <div style={{ background: '#1a1a2e', borderRadius: 8, padding: '10px 12px', border: '1px solid #2a2a3e', fontSize: 12, color: '#8888aa', lineHeight: 1.6, fontStyle: 'italic' }}>{cliente.notas}</div>
          </>}
        </div>

        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#5555aa', marginBottom: 12 }}>Cambiar etapa</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {etapas.map((e) => (
              <button key={e} onClick={() => cambiarEtapa(e)} style={{ padding: '12px 16px', borderRadius: 8, border: `1px solid ${cliente.etapa === e ? etapaColor[e].border : '#2a2a3e'}`, background: cliente.etapa === e ? etapaColor[e].bg : '#1a1a2e', color: etapaColor[e].text, fontSize: 13, fontWeight: cliente.etapa === e ? 700 : 400, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: cliente.etapa === e ? etapaColor[e].text : '#3a3a5a', flexShrink: 0 }} />
                {e}
                {cliente.etapa === e && <span style={{ marginLeft: 'auto', fontSize: 11 }}>actual</span>}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#5555aa', marginBottom: 12 }}>Acciones rapidas</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={() => router.push('/followups')} style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #2a2a3e', background: '#1a1a2e', color: '#ccccee', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>Ver follow-ups</button>
            <button onClick={() => router.push('/properties')} style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #2a2a3e', background: '#1a1a2e', color: '#ccccee', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>Ver propiedades</button>
          </div>
        </div>
      </div>
    </div>
  )
}