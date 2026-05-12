'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const supabase = createBrowserClient(
    'https://gbxedknmmpfwvgkekmng.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdieGVka25tbXBmd3Zna2VrbW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTY1OTksImV4cCI6MjA5NDE3MjU5OX0.GWZB0ZGlNdYHaYczZP0W6trfR2fXR65dEPn4eyZqb6Y'
  )

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Clientes', href: '/clients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { name: 'Kanban', href: '/kanban', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
    { name: 'Propiedades', href: '/properties', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Follow-ups', href: '/followups', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { name: 'Agenda Hoy', href: '/today', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Nuevo Cliente', href: '/clients/new', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
  ]

  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 flex-col z-50">
      <div className="p-8">
        <div className="text-[#d4af37] text-2xl font-bold tracking-tighter uppercase italic">Homvi</div>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                isActive ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
              </svg>
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center text-black text-[10px] font-bold flex-shrink-0">LB</div>
          <div className="overflow-hidden flex-1">
            <p className="text-[10px] text-white font-bold truncate tracking-widest">LUIS BETANCES</p>
            <p className="text-[8px] text-gray-400 uppercase tracking-tighter">Founder</p>
          </div>
        </div>
        <button onClick={cerrarSesion}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] uppercase tracking-widest text-gray-400 hover:text-red-400 hover:bg-red-400/5 border border-white/5 hover:border-red-400/20 transition-all font-bold">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
