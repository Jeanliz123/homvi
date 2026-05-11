'use client'

import './globals.css'
import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav' // <-- Importante: Asegúrate de que el archivo exista en app/components/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-black antialiased text-white">
        <div className="flex min-h-screen">
          {/* Sidebar: Solo se ve en Desktop */}
          <Sidebar /> 
          
          {/* 
              ml-0 lg:ml-64 -> Maneja el espacio lateral para la Sidebar.
              pb-20 lg:pb-0 -> Maneja el espacio inferior para la MobileNav en celulares.
          */}
          <main className="flex-1 ml-0 lg:ml-64 bg-[#050505] min-h-screen w-full pb-20 lg:pb-0">
            {children}
          </main>

          {/* MobileNav: Solo se ve en Celulares */}
          <MobileNav />
        </div>
      </body>
    </html>
  )
}
