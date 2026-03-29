'use client';
import { useState } from 'react';
import { apiClient } from '../lib/api';

export default function LoanSimulator({ onSimulationComplete }: { onSimulationComplete: (data: any, originalInputs: any) => void }) {
  const [formData, setFormData] = useState({ amount: 1000, tea: 15, term: 12 });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post('/Loans/simulate', formData);
      onSimulationComplete(response.data, formData);
    } catch (error) {
      console.error(error);
      alert("Error: Revisa que el Backend esté corriendo y el CORS esté configurado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Simulador de Préstamo</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Monto del Préstamo (USD)</label>
        <input 
          type="number" 
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">TEA (%)</label>
          <input 
            type="number" 
            value={formData.tea}
            onChange={(e) => setFormData({...formData, tea: Number(e.target.value)})}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Plazo (Meses)</label>
          <input 
            type="number" 
            value={formData.term}
            onChange={(e) => setFormData({...formData, term: Number(e.target.value)})}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-bold"
        disabled={loading}
      >
        {loading ? 'Calculando...' : 'SIMULAR CRONOGRAMA'}
      </button>
    </form>
  );
}