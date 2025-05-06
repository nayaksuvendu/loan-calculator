import React, { useState } from 'react';
import AmortizationTable from './AmortizationTable';
import { useApp } from '../context/AppContext';

export default function LoanCalc() {
  const [amount, setAmount] = useState(100000);
  const [interest, setInterest] = useState(4.5);
  const [terms, setTerms] = useState(5);
  const [emi, setEmi] = useState(null);
  const [amortization, setAmortization] = useState([]);
  const { currency, setCurrency } = useApp();

  const calculateEMI = () => {
    const P = parseFloat(amount);
    const R = parseFloat(interest) / (12 * 100);
    const N = parseInt(terms) * 12;
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue.toFixed(2));

    const schedule = [];
    let balance = P;
    for (let month = 1; month <= N; month++) {
      const interestPayment = balance * R;
      const principalPayment = emiValue - interestPayment;
      balance -= principalPayment;
      schedule.push({ month, principalPayment, interestPayment, balance });
    }
    setAmortization(schedule);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-transparent dark:bg-gray-800 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700 dark:text-white">Loan EMI Calculator</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interest Rate (%)</label>
          <input
            type="number"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Term (Years)</label>
          <input
            type="number"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={calculateEMI}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
        >
          Calculate
        </button>
      </div>

      {emi && (
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-green-700 dark:text-green-400">
            Monthly EMI: {currency} {emi}
          </p>
        </div>
      )}

      {emi && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full md:w-1/4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
          </select>
        </div>
      )}

      {amortization.length > 0 && (
        <div className="mt-8">
          <AmortizationTable schedule={amortization} currency={currency} />
        </div>
      )}
    </div>
  );
}
