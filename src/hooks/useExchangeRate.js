import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY ;

export const useExchangeRate = (base = "USD") => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {  
  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
      );
      console.log(response.data);
      setRates(response.data.conversion_rates);
    } catch (err) {
      setError('Failed to fetch exchange rates');
    } finally {
      setLoading(false);
    }
  };
  fetchRates();
}, [base]);

  return {rates,loading,error};
};
