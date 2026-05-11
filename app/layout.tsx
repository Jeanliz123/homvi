import Sidebar from './components/Sidebar' // Importamos el componente

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black">
        <div className="flex">
          <Sidebar /> {/* El sidebar siempre fijo a la izquierda */}
          <main className="flex-1 ml-64 min-h-screen bg-[#050505]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
