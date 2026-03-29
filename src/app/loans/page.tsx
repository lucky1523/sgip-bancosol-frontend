'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/api';
import Link from 'next/link';

export default function LoansListPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await apiClient.get('/Loans');
        setLoans(response.data);
      } catch (error) {
        console.error("Error al cargar préstamos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando portafolio...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Mis Préstamos</h1>
        <Link href="/loans/simulate" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          + Nueva Solicitud
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">ID de Préstamo</th>
              <th className="px-6 py-4">Monto</th>
              <th className="px-6 py-4">Plazo</th>
              <th className="px-6 py-4">TEA</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 font-mono text-sm text-gray-600">{loan.id.substring(0, 8)}...</td>
                <td className="px-6 py-4 font-bold text-gray-900">${loan.amount.toLocaleString()}</td>
                <td className="px-6 py-4">{loan.term} meses</td>
                <td className="px-6 py-4">{loan.tea}%</td>
                <td className="px-6 py-4">
                  <Link href={`/loans/${loan.id}`} className="text-blue-600 hover:underline font-medium">
                    Ver Detalle →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loans.length === 0 && (
          <div className="p-10 text-center text-gray-400">No hay préstamos registrados aún.</div>
        )}
      </div>
    </div>
  );
}