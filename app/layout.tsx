'use client' // <--- ESTA LÍNEA ES LA CLAVE

import './globals.css'
import Sidebar from './components/Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-black antialiased">
        <div className="flex min-h-screen">
          {/* El Sidebar ahora funcionará porque el Layout es 'use client' */}
          <Sidebar /> 
          
          {/* ml-64 asegura que el contenido no empiece debajo del sidebar */}
          <main className="flex-1 ml-64 bg-[#050505] min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
