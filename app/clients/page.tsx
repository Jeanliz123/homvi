'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Client = {
  id: string
  name: string
  email: string
  phone: string
  status: string
  type: string
  price: string
  initial: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', status: 'LEAD', type: '', price: '' })

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    if (!error && data) setClients(data)
    setLoading(false)
  }

  async function saveClient() {
    if (!form.name.trim()) return
    setSaving(true)
    const initial = form.name.trim()[0].toUpperCase()
    const { error } = await supabase.from('clients').insert([{ ...form, initial }])
    if (!error) {
      setForm({ name: '', email: '', phone: '', status: 'LEAD', type: '', price: '' })
      setShowForm(false)
      fetchClients()
    }
    setSaving(false)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
        <div>
          <h1 className="text-4xl font-black italic text-amber-500 tracking-tighter uppercase">MIS CLIENTES</h1>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">{clients.length} REGISTROS</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase hover:bg-amber-500 transition-all">
            Importar Excel
          </button>
          <button onClick={() => setShowForm(true)} className="bg-amber-500 text-black px-6 py-3 rounded-xl font-black text-xs uppercase hover:bg-white transition-all">
            + Nuevo Cliente
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-xl font-black text-amber-500 uppercase mb-6">Nuevo Cliente</h2>
            <div className="flex flex-col gap-4">
              <input placeholder="Nombre *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <input placeholder="Teléfono" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <input placeholder="Tipo de propiedad (Casa, Apto...)" value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <input placeholder="Precio (ej: $80,000)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none">
                <option>LEAD</option>
                <option>BUSCANDO</option>
                <option>EN OFERTA</option>
                <option>CIERRE</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-bold text-sm hover:bg-zinc-700 transition-all">Cancelar</button>
              <button onClick={saveClient} disabled={saving} className="flex-1 bg-amber-500 text-black py-3 rounded-xl font-black text-sm uppercase hover:bg-white transition-all disabled:opacity-50">
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-zinc-500 text-center py-20">Cargando clientes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c) => (
            <div key={c.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:border-amber-500 transition-all cursor-pointer">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold mr-3">{c.initial}</div>
                <div>
                  <div className="font-bold text-white">{c.name}</div>
                  <div className="text-zinc-500 text-xs">{c.email}</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">{c.status}</span>
                <span className="text-amber-500 font-bold text-sm">{c.price}</span>
              </div>
              {c.type && <div className="text-zinc-500 text-xs mt-2">{c.type}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
