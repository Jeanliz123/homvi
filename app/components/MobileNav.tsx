'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const pathname = usePathname()
  
  const menuItems = [
    { name: 'Inicio', href: '/landing', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2' },
    { name: 'Catálogo', href: '/properties', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16' },
    { name: 'Hoy', href: '/today', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7' },
    { name: 'Nuevo', href: '/clients/new', icon: 'M12 4v16m8-8H4' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-lg border-t border-white/10 z-[100] px-6 py-3">
      <div className="flex justify-between items-center">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
              <svg 
                className={`w-6 h-6 ${isActive ? 'text-[#d4af37]' : 'text-gray-500'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
              </svg>
              <span className={`text-[8px] uppercase tracking-tighter ${isActive ? 'text-[#d4af37] font-bold' : 'text-gray-500'}`}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
