'use client'
import { useEffect, useState, useRef } from 'react'
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
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState<Property | null>(null)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState<Property | null>(null)
  const [form, setForm] = useState({ title: '', type: '', price: '', location: '', bedrooms: '', bathrooms: '', status: 'DISPONIBLE' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [editImageFile, setEditImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const editFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchProperties() }, [])

  async function fetchProperties() {
    const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false })
    if (!error && data) setProperties(data)
    setLoading(false)
  }

  async function uploadImage(file: File, id: string): Promise<string | null> {
    const ext = file.name.split('.').pop()
    const path = `${id}.${ext}`
    const { error } = await supabase.storage.from('properties').upload(path, file, { upsert: true })
    if (error) return null
    const { data } = supabase.storage.from('properties').getPublicUrl(path)
    return data.publicUrl
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
      let image_url = null
      if (imageFile) {
        setUploading(true)
        image_url = await uploadImage(imageFile, data.id)
        if (image_url) await supabase.from('properties').update({ image_url }).eq('id', data.id)
        setUploading(false)
      }
      setForm({ title: '', type: '', price: '', location: '', bedrooms: '', bathrooms: '', status: 'DISPONIBLE' })
      setImageFile(null)
      setShowForm(false)
      fetchProperties()
    }
    setSaving(false)
  }

  async function updateProperty() {
    if (!editForm) return
    setSaving(true)
    const initial = editForm.title.trim()[0].toUpperCase()
    let image_url = editForm.image_url

    if (editImageFile) {
      setUploading(true)
      image_url = await uploadImage(editImageFile, editForm.id) || image_url
      setUploading(false)
    }

    const { error } = await supabase.from('properties').update({ ...editForm, initial, image_url }).eq('id', editForm.id)
    if (!error) {
      const updated = { ...editForm, initial, image_url }
      setEditing(false)
      setSelected(updated)
      setEditImageFile(null)
      fetchProperties()
    }
    setSaving(false)
  }

  async function deleteProperty(id: string) {
    if (!confirm('¿Eliminar esta propiedad?')) return
    await supabase.storage.from('properties').remove([`${id}.jpg`, `${id}.png`, `${id}.jpeg`, `${id}.webp`])
    await supabase.from('properties').delete().eq('id', id)
    setSelected(null)
    fetchProperties()
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
              <input placeholder="Título *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <input placeholder="Tipo (Casa, Apto, Penthouse...)" value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <input placeholder="Precio (ej: $120,000)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <input placeholder="Ubicación" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none" />
              <div className="flex gap-3">
                <input placeholder="Habitaciones" type="number" value={form.bedrooms} onChange={e => setForm({...form, bedrooms: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none flex-1" />
                <input placeholder="Baños" type="number" value={form.bathrooms} onChange={e => setForm({...form, bathrooms: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none flex-1" />
              </div>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none">
                <option>DISPONIBLE</option>
                <option>RESERVADA</option>
                <option>VENDIDA</option>
              </select>
              <div>
                <div className="text-zinc-400 text-xs mb-2 uppercase font-bold">Foto de la propiedad</div>
                <input ref={fileRef} type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="hidden" />
                <button onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-zinc-700 hover:border-amber-500 rounded-xl py-4 text-zinc-500 hover:text-amber-500 text-sm transition-all">
                  {imageFile ? `✓ ${imageFile.name}` : '+ Subir imagen'}
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowForm(false); setImageFile(null) }} className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-bold text-sm hover:bg-zinc-700 transition-all">Cancelar</button>
              <button onClick={saveProperty} disabled={saving || uploading} className="flex-1 bg-amber-500 text-black py-3 rounded-xl font-black text-sm uppercase hover:bg-white transition-all disabled:opacity-50">
                {uploading ? 'Subiendo...' : saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-6">
        <div className={`grid gap-6 transition-all ${selected ? 'grid-cols-1 md:grid-cols-2 flex-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full'}`}>
          {loading ? (
            <div className="text-zinc-500 text-center py-20 col-span-3">Cargando propiedades...</div>
          ) : properties.length === 0 ? (
            <div className="text-zinc-500 text-center py-20 col-span-3">No hay propiedades aún.</div>
          ) : (
            properties.map((p) => (
              <div key={p.id} onClick={() => { setSelected(p); setEditing(false) }} className={`bg-zinc-900/40 border rounded-2xl hover:border-amber-500 transition-all cursor-pointer overflow-hidden ${selected?.id === p.id ? 'border-amber-500' : 'border-zinc-800'}`}>
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

        {selected && (
          <div className="w-80 bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden h-fit sticky top-8">
            {selected.image_url ? (
              <img src={selected.image_url} alt={selected.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-32 bg-zinc-800 flex items-center justify-center text-5xl">🏠</div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div></div>
                <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-white text-xl">✕</button>
              </div>

              {!editing ? (
                <>
                  <h2 className="text-xl font-black text-white mb-1">{selected.title}</h2>
                  <span className={`text-xs px-2 py-1 rounded ${statusColors[selected.status]}`}>{selected.status}</span>
                  <div className="mt-4 flex flex-col gap-3 text-sm">
                    {selected.type && <div><span className="text-zinc-500">Tipo</span><div className="text-white">{selected.type}</div></div>}
                    {selected.location && <div><span className="text-zinc-500">Ubicación</span><div className="text-white">{selected.location}</div></div>}
                    {selected.price && <div><span className="text-zinc-500">Precio</span><div className="text-amber-500 font-bold text-lg">{selected.price}</div></div>}
                    <div className="flex gap-4">
                      {selected.bedrooms > 0 && <div><span className="text-zinc-500">Hab.</span><div className="text-white font-bold">{selected.bedrooms}</div></div>}
                      {selected.bathrooms > 0 && <div><span className="text-zinc-500">Baños</span><div className="text-white font-bold">{selected.bathrooms}</div></div>}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <button onClick={() => { setEditing(true); setEditForm(selected) }} className="flex-1 bg-amber-500 text-black py-2 rounded-xl font-black text-xs uppercase hover:bg-white transition-all">Editar</button>
                    <button onClick={() => deleteProperty(selected.id)} className="bg-red-900 text-red-300 px-3 py-2 rounded-xl text-xs hover:bg-red-800 transition-all">Eliminar</button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-black text-amber-500 uppercase mb-4">Editar</h2>
                  <div className="flex flex-col gap-3">
                    <input value={editForm?.title} onChange={e => setEditForm({...editForm!, title: e.target.value})} className="bg-zinc-800 text-white px-3 py-2 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none text-sm" placeholder="Título" />
                    <input value={editForm?.type} onChange={e => setEditForm({...editForm!, type: e.target.value})} className="bg-zinc-800 text-white px-3 py-2 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none text-sm" placeholder="Tipo" />
                    <input value={editForm?.price} onChange={e => setEditForm({...editForm!, price: e.target.value})} className="bg-zinc-800 text-white px-3 py-2 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none text-sm" placeholder="Precio" />
                    <input value={editForm?.location} onChange={e => setEditForm({...editForm!, location: e.target.value})} className="bg-zinc-800 text-white px-3 py-2 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none text-sm" placeholder="Ubicación" />
                    <div className="flex gap-2">
                      <input type="number" value={editForm?.bedrooms} onChange={e => setEditForm({...editForm!, bedrooms: parseInt(e.target.value) || 0})} className="bg-zinc-800 text-white px-3 py-2 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none text-sm flex-1" placeholder="Hab." />
                      <input type="number" value={editForm?.bathrooms} onChange={e => setEditForm({...editForm!, bathrooms: parseInt(e.target.value) || 0})} className="bg-zinc-800 text-white px-3 py-2 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none text-sm flex-1" placeholder="Baños" />
                    </div>
                    <select value={editForm?.status} onChange={e => setEditForm({...editForm!, status: e.target.value})} className="bg-zinc-800 text-white px-3 py-2 rounded-xl border border-zinc-700 focus:border-amber-500 outline-none text-sm">
                      <option>DISPONIBLE</option>
                      <option>RESERVADA</option>
                      <option>VENDIDA</option>
                    </select>
                    <input ref={editFileRef} type="file" accept="image/*" onChange={e => setEditImageFile(e.target.files?.[0] || null)} className="hidden" />
                    <button onClick={() => editFileRef.current?.click()} className="w-full border-2 border-dashed border-zinc-700 hover:border-amber-500 rounded-xl py-3 text-zinc-500 hover:text-amber-500 text-xs transition-all">
                      {editImageFile ? `✓ ${editImageFile.name}` : '📷 Cambiar imagen'}
                    </button>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => { setEditing(false); setEditImageFile(null) }} className="flex-1 bg-zinc-800 text-white py-2 rounded-xl font-bold text-xs hover:bg-zinc-700 transition-all">Cancelar</button>
                    <button onClick={updateProperty} disabled={saving || uploading} className="flex-1 bg-amber-500 text-black py-2 rounded-xl font-black text-xs uppercase hover:bg-white transition-all disabled:opacity-50">{uploading ? '...' : saving ? '...' : 'Guardar'}</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
