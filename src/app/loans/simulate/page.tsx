'use client';
import { useState } from 'react';
import { apiClient } from '../../../lib/api';
import LoanSimulator from '../../../components/LoanSimulator';

export default function SimulatePage() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [simulationData, setSimulationData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmLoan = async () => {
    if (!simulationData) return;
    setIsSubmitting(true);
    try {
      await apiClient.post('/Loans', {
        amount: simulationData.amount,
        tea: simulationData.tea,
        term: simulationData.term,
        idempotencyKey: crypto.randomUUID() 
      });
      alert("¡Préstamo confirmado! Se ha guardado correctamente en la base de datos.");
      setSchedule([]);
    } catch (error) {
      console.error(error);
      alert("Error al procesar la solicitud. Revisa la consola.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-12">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900">Simulador de Créditos</h1>
        <p className="text-gray-500 text-lg font-medium">FinTech Solutions - Banco Sol</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <LoanSimulator onSimulationComplete={(data, originalInputs) => {
            setSchedule(data);
            setSimulationData(originalInputs);
          }} />
        </div>

        <div className="lg:col-span-2">
          {schedule.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Plan de Pagos</h2>
                <button 
                  onClick={handleConfirmLoan}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Procesando...' : 'CONFIRMAR SOLICITUD'}
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-blue-900 text-white text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Mes</th>
                      <th className="px-6 py-4">Cuota Total</th>
                      <th className="px-6 py-4">Interés</th>
                      <th className="px-6 py-4">Capital</th>
                      <th className="px-6 py-4 text-right">Saldo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {schedule.map((s, i) => (
                      <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-600">{s.paymentNumber}</td>
                        <td className="px-6 py-4 font-bold text-gray-900">${(s.totalPayment || 0).toFixed(2)}</td>
                        <td className="px-6 py-4 text-red-500">-${(s.interest || 0).toFixed(2)}</td>
                        <td className="px-6 py-4 text-green-700">+${(s.principal || 0).toFixed(2)}</td>
                        <td className="px-6 py-4 text-right font-mono text-blue-900">${(s.remainingBalance || 0).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-100 border-4 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-400">
              <p className="text-xl">Calcula tu préstamo para ver el detalle</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}