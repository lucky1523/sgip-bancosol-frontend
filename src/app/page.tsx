import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center bg-gray-50">
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl border border-gray-100 max-w-4xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
          Sistema de Gestión de Inversiones y Préstamos
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Plataforma financiera diseñada para brindar simulaciones precisas, control de portafolio y trazabilidad completa de transacciones en tiempo real.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/loans/simulate" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1"
          >
            Iniciar Nueva Simulación
          </Link>
          <Link 
            href="/loans" 
            className="w-full sm:w-auto bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full shadow-lg transition-all"
          >
            Acceder a Mi Portafolio
          </Link>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-left">
        <div className="p-6">
          <h3 className="text-blue-900 font-bold text-lg mb-2">Simulación Precisa</h3>
          <p className="text-gray-500 text-sm">Cálculo de cronogramas de pago con amortización francesa y tasas efectivas anuales.</p>
        </div>
        <div className="p-6">
          <h3 className="text-blue-900 font-bold text-lg mb-2">Trazabilidad Total</h3>
          <p className="text-gray-500 text-sm">Registro inmutable de cada transacción y desembolso asociado a los créditos.</p>
        </div>
        <div className="p-6">
          <h3 className="text-blue-900 font-bold text-lg mb-2">Arquitectura Escalable</h3>
          <p className="text-gray-500 text-sm">Construido con .NET Core, Next.js y PostgreSQL para máximo rendimiento.</p>
        </div>
      </div>
    </div>
  );
}