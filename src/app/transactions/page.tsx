'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/api';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiClient.get('/Transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error("Error al cargar transacciones", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) return <div className="p-10 text-center text-blue-900 font-bold">Cargando historial de movimientos...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Historial de Transacciones</h1>
        <p className="text-gray-500">Registro de todos los movimientos financieros</p>
      </header>

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">ID Transacción</th>
              <th className="px-6 py-4">Descripción</th>
              <th className="px-6 py-4">Monto</th>
              <th className="px-6 py-4 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(t.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-blue-600">{t.id.substring(0, 8)}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{t.description || 'Desembolso de Préstamo'}</td>
                <td className="px-6 py-4 font-bold text-gray-900">
                  ${t.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
                    Completado
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-gray-400 italic">No se encontraron movimientos registrados.</p>
          </div>
        )}
      </div>
    </div>
  );
}