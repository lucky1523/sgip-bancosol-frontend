import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        <nav className="bg-blue-900 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                {}
                <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-200 transition-colors">
                  BANCO SOL | FinTech
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {}
                    <Link href="/" className="hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Inicio
                    </Link>
                    <Link href="/loans/simulate" className="hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Simulador
                    </Link>
                    <Link href="/loans" className="hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Mis Préstamos
                    </Link>
                    <Link href="/transactions" className="hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Transacciones
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-white border-t p-4 text-center text-gray-400 text-sm">
          © 2026 FinTech Solutions - Prueba Técnica Banco Sol
        </footer>
      </body>
    </html>
  );
}