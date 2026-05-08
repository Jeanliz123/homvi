'use client'
import { useRouter } from 'next/navigation'

export default function Landing() {
  const router = useRouter()

  return (
    <div style={{ background: '#080810', color: '#e8e4dc', fontFamily: 'Georgia, serif', minHeight: '100vh' }}>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px', borderBottom: '1px solid #1a1a2a', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: 6, color: '#c9b98a', textTransform: 'uppercase' }}>Homvi</div>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Producto', 'Precios', 'Contacto'].map((l) => (
            <span key={l} style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6666aa', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
        <button onClick={() => router.push('/dashboard')} style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#080810', background: '#c9b98a', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
          Comenzar
        </button>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', borderBottom: '1px solid #1a1a2a' }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#c9b98a', marginBottom: 20 }}>CRM Inmobiliario Premium</div>
          <h1 style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.15, color: '#f0ece4', marginBottom: 24 }}>
            Tu cartera de clientes,{' '}
            <em style={{ fontStyle: 'italic', color: '#c9b98a' }}>bajo control total.</em>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#8888aa', marginBottom: 36, maxWidth: 380, fontFamily: 'system-ui' }}>
            Homvi es el CRM diseñado para agentes inmobiliarios que operan con estándares de lujo. Pipeline visual, seguimiento preciso, cierre inteligente.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => router.push('/dashboard')} style={{ background: '#c9b98a', color: '#080810', padding: '14px 28px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
              Empieza gratis
            </button>
            <button style={{ background: 'transparent', color: '#c9b98a', padding: '14px 28px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', border: '1px solid #c9b98a33', cursor: 'pointer' }}>
              Ver demo
            </button>
          </div>
        </div>

        <div style={{ background: '#0f0f1a', border: '1px solid #2a2a3e', padding: 16 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#2a2a3e' }} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 10 }}>
            {[['12','Clientes','#c9b98a'],['3','Follow-ups','#e8514a'],['2','Cierres','#4ecb71'],['5','Leads','#4a90e8']].map(([v,l,c]) => (
              <div key={l} style={{ background: '#16213e', padding: 8, borderLeft: `2px solid ${c}` }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: c }}>{v}</div>
                <div style={{ fontSize: 8, color: '#6666aa', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#16213e', padding: 10 }}>
            <div style={{ fontSize: 7, color: '#5555aa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Pipeline de clientes</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
              {[['Lead','#4a90e8',['María R.','Carlos M.']],['Buscando','#f0a040',['Ana P.','José L.']],['En Oferta','#4ecb71',['Roberto S.']],['Cierre','#c060e0',['Carmen V.','Pedro A.']]].map(([stage, color, clients]) => (
                <div key={stage as string}>
                  <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: color as string, marginBottom: 6 }}>{stage as string}</div>
                  {(clients as string[]).map(c => (
                    <div key={c} style={{ background: '#1a1a2e', padding: '5px 7px', fontSize: 8, color: '#ccccee', marginBottom: 3, borderLeft: `2px solid ${color}` }}>{c}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#1a1a2a' }}>
        {[['2,400+','Agentes activos'],['$18B','En propiedades gestionadas'],['34%','Más cierres en 90 días']].map(([n,l]) => (
          <div key={l} style={{ background: '#080810', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 300, color: '#c9b98a', lineHeight: 1, marginBottom: 8 }}>{n}</div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6666aa', fontFamily: 'system-ui' }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px', borderBottom: '1px solid #1a1a2a' }}>
        <h2 style={{ fontSize: 36, fontWeight: 300, color: '#f0ece4', textAlign: 'center', marginBottom: 8 }}>Todo lo que necesita un agente de alto nivel</h2>
        <p style={{ fontSize: 13, color: '#6666aa', textAlign: 'center', letterSpacing: 1, marginBottom: 48, fontFamily: 'system-ui' }}>Diseñado para los que operan con excelencia</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#1a1a2a' }}>
          {[['01','Pipeline Visual','Visualiza el estado de cada cliente en tiempo real. De lead a cierre, sin fricción.'],['02','Follow-ups Precisos','Nunca pierdas un seguimiento. Recordatorios, historial y priorización automática.'],['03','Catálogo de Propiedades','Conecta clientes con propiedades. Filtra por zona, precio y características al instante.']].map(([n,t,d]) => (
            <div key={n} style={{ background: '#080810', padding: 32 }}>
              <div style={{ fontSize: 32, color: '#c9b98a22', marginBottom: 16 }}>{n}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#e8e4dc', marginBottom: 8, letterSpacing: 1, fontFamily: 'system-ui' }}>{t}</div>
              <div style={{ fontSize: 12, color: '#6666aa', lineHeight: 1.7, fontFamily: 'system-ui' }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px', textAlign: 'center', borderBottom: '1px solid #1a1a2a' }}>
        <h2 style={{ fontSize: 44, fontWeight: 300, color: '#f0ece4', marginBottom: 16 }}>
          Empieza a cerrar más. <em style={{ fontStyle: 'italic', color: '#c9b98a' }}>Hoy.</em>
        </h2>
        <p style={{ fontSize: 13, color: '#6666aa', marginBottom: 36, letterSpacing: 1, fontFamily: 'system-ui' }}>Sin tarjeta de crédito. Configura en 5 minutos.</p>
        <div style={{ display: 'flex', maxWidth: 440, margin: '0 auto' }}>
          <input placeholder="tu@email.com" style={{ flex: 1, background: '#0f0f1a', border: '1px solid #2a2a3e', borderRight: 'none', padding: '14px 16px', color: '#e8e4dc', fontSize: 13, outline: 'none', fontFamily: 'system-ui' }} />
          <button onClick={() => router.push('/dashboard')} style={{ background: '#c9b98a', color: '#080810', padding: '14px 24px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'system-ui' }}>
            Comenzar gratis
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 300, letterSpacing: 4, color: '#c9b98a', textTransform: 'uppercase' }}>Homvi</div>
        <div style={{ fontSize: 11, color: '#3a3a5a', letterSpacing: 1, fontFamily: 'system-ui' }}>© 2026 Homvi. Todos los derechos reservados.</div>
      </div>

    </div>
  )
}
