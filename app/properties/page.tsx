'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

type Property = {
  id: string
  title: string
  type: string
  price: string
  location: string
  bedrooms: number
  bathrooms: number
  status: string
  initial: string
  image_url: string
}

const statusColors: Record<string, string> = {
  DISPONIBLE: 'bg-green-900 text-green-300',
  RESERVADA: 'bg-amber-900 text-amber-300',
  VENDIDA: 'bg-zinc-700 text-zinc-400',
}

export default function PropertiesPage() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', type: '', price: '', location: '', bedrooms: '', bathrooms: '', status: 'DISPONIBLE' })

  useEffect(() => { fetchProperties() }, [])

  async function fetchProperties() {
    const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false })
    if (!error && data) setProperties(data)
    setLoading(false)
  }

  async function saveProperty() {
    if (!form.title.trim()) return
    setSaving(true)
    const initial = form.title.trim()[0].toUpperCase()
    const { data, error } = await supabase.from('properties').insert([{
      ...form, initial,
      bedrooms: parseInt(form.bedrooms) || 0,
      bathrooms: parseInt(form.bathrooms) || 0,
    }]).select().single()
    if (!error && data) {
      setForm({ title: '', type: '', price: '', location: '', bedrooms: '', bathrooms: '', status: 'DISPONIBLE' })
      setShowForm(false)
      fetchProperties()
    }
    setSaving(false)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
        <div>
          <h1 className="text-4xl font-black italic text-amber-500 tracking-tighter uppercase">PROPIEDADES</h1>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">{properties.length} REGISTROS</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-amber-500 text-black px-6 py-3 rounded-xl font-black text-xs uppercase hover:bg-white transition-all">
          + Nueva Propiedad
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-xl font-black text-amber-500 uppercase mb-6">Nueva Propiedad</h2>
            <div className="flex flex-col gap-4">
              <input placeholder="Titulo *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <input placeholder="Tipo (Casa, Apto, Penthouse...)" value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <input placeholder="Precio (ej: $120,000)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <input placeholder="Ubicacion" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <div className="flex gap-3">
                <input placeholder="Habitaciones" type="number" value={form.bedrooms} onChange={e => setForm({...form, bedrooms: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none flex-1" />
                <input placeholder="Banos" type="number" value={form.bathrooms} onChange={e => setForm({...form, bathrooms: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none flex-1" />
              </div>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none">
                <option>DISPONIBLE</option>
                <option>RESERVADA</option>
                <option>VENDIDA</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-bold text-sm hover:bg-zinc-700 transition-all">Cancelar</button>
              <button onClick={saveProperty} disabled={saving} className="flex-1 bg-amber-500 text-black py-3 rounded-xl font-black text-sm uppercase hover:bg-white transition-all disabled:opacity-50">
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-zinc-500 text-center py-20 col-span-3">Cargando propiedades...</div>
        ) : properties.length === 0 ? (
          <div className="text-zinc-500 text-center py-20 col-span-3">No hay propiedades aun.</div>
        ) : (
          properties.map((p) => (
            <div key={p.id} onClick={() => router.push(`/properties/${p.id}`)} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-amber-500 transition-all cursor-pointer overflow-hidden">
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-zinc-800 flex items-center justify-center text-zinc-600 text-4xl">🏠</div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-white">{p.title}</div>
                    <div className="text-zinc-500 text-xs">{p.type}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${statusColors[p.status] || 'bg-zinc-700 text-zinc-300'}`}>{p.status}</span>
                </div>
                {p.location && <div className="text-zinc-400 text-xs mb-3">📍 {p.location}</div>}
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 text-zinc-500 text-xs">
                    {p.bedrooms > 0 && <span>🛏 {p.bedrooms}</span>}
                    {p.bathrooms > 0 && <span>🚿 {p.bathrooms}</span>}
                  </div>
                  <span className="text-amber-500 font-bold">{p.price}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
