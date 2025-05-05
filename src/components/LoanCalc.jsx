import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import AmortizationTable from './AmortizationTable';
import { useApp } from '../context/AppContext';


export default function LoanCalc() {
  const [amount, setAmount] = useState(100000);
  const [interest, setInterest] = useState(4.5);
  const [terms, setTerms] = useState(5);
  const [emi, setEmi] = useState(null);
  const [amortization, setAmortization] = useState([]);
  const {currency,setCurrency} = useApp();


  const calculateEMI = () => {
    const P = amount;
    const R = interest / (12 * 100);
    const N = terms * 12;
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue.toFixed(2));

    // Calculate Amortization Schedule
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
    <div>
      <TextField  onChange={(e) => setAmount(e.target.value)} label="Loan Amount" />
      <TextField onChange={(e) => setInterest(e.target.value)} label="Interest Rate (%)" />
      <TextField onChange={(e) => setTerms(e.target.value)} label="Term (Years)" />
      <Button onClick={calculateEMI}>Calculate</Button>
      {emi && <Typography variant="h6" mt={3}>Monthly EMI: ${emi}</Typography>}
      {emi &&<Select value={currency} sx={{ mt: 2 }} onChange={(e) => setCurrency(e.target.value)}>
      <MenuItem value="USD">USD</MenuItem>
      <MenuItem value="EUR">EUR</MenuItem>
      <MenuItem value="INR">INR</MenuItem>
      <MenuItem value="AUD">AUD</MenuItem>
      <MenuItem value="CAD">CAD</MenuItem>
    </Select>}
     {amortization.length > 0 && <AmortizationTable schedule={amortization} currency={currency} />}      
    </div>
  );
};



