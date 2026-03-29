'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '../../../lib/api';

export default function LoanDetailPage() {
  const { id } = useParams();
  const [loan, setLoan] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await apiClient.get(`/Loans/${id}`);
        setLoan(response.data);
      } catch (error) {
        alert("Error al cargar el detalle del préstamo.");
      }
    };
    fetchDetail();
  }, [id]);

  if (!loan) return <div className="p-10 text-center">Cargando detalle...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Detalle de Préstamo</h1>
        <p className="text-gray-500">ID: {loan.id}</p>
      </div>

      {/* Resumen Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-blue-200 text-sm uppercase">Monto Original</p>
          <p className="text-3xl font-bold">${loan.amount.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <p className="text-gray-400 text-sm uppercase">Plazo / Tasa</p>
          <p className="text-2xl font-bold text-gray-800">{loan.term} Meses / {loan.tea}% TEA</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <p className="text-gray-400 text-sm uppercase">Estado</p>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold uppercase">Activo</span>
        </div>
      </div>

      {/* Cronograma de Pagos */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Cronograma de Pagos Guardado</h2>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-white text-xs">
            <tr>
              <th className="px-6 py-4">N°</th>
              <th className="px-6 py-4">Cuota</th>
              <th className="px-6 py-4">Interés</th>
              <th className="px-6 py-4">Capital</th>
              <th className="px-6 py-4">Saldo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loan.payments?.map((p: any) => (
              <tr key={p.paymentNumber}>
                <td className="px-6 py-4 font-bold">{p.paymentNumber}</td>
                <td className="px-6 py-4">${(p.totalPayment || 0).toFixed(2)}</td>
                <td className="px-6 py-4 text-red-500">-${(p.interest || 0).toFixed(2)}</td>
                <td className="px-6 py-4 text-green-600">${(p.principal || 0).toFixed(2)}</td>
                <td className="px-6 py-4 font-mono">${(p.remainingBalance || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}