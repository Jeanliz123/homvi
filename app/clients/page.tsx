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

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
      if (!error && data) setClients(data)
      setLoading(false)
    }
    fetchClients()
  }, [])

  return (
    <div className="p-8 ml-0">
      <div className="flex justify-between items-center mb-10 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
        <div>
          <h1 className="text-4xl font-black italic text-amber-500 tracking-tighter uppercase">MIS CLIENTES</h1>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">{clients.length} REGISTROS</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase hover:bg-amber-500 transition-all">
            Importar Excel
          </button>
          <button className="bg-amber-500 text-black px-6 py-3 rounded-xl font-black text-xs uppercase hover:bg-white transition-all">
            + Nuevo Cliente
          </button>
        </div>
      </div>

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
