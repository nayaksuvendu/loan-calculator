import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  colors,
} from '@mui/material';
import AmortizationTable from './AmortizationTable';
import { useApp } from '../context/AppContext';
import { green } from '@mui/material/colors';

export default function LoanCalc() {
  const [amount, setAmount] = useState(100000);
  const [interest, setInterest] = useState(4.5);
  const [terms, setTerms] = useState(5);
  const [emi, setEmi] = useState(null);
  const [amortization, setAmortization] = useState([]);
  const { currency, setCurrency } = useApp();

  const calculateEMI = () => {
    const P = Number(amount);
    const R = interest / (12 * 100);
    const N = terms * 12;
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue.toFixed(2));

    const schedule = [];
    let balance = P;
    for (let month = 1; month <= N; month++) {
      const interestPayment = balance * R;
      const principalPayment = emiValue - interestPayment;
      balance -= principalPayment;
      schedule.push({
        month,
        principalPayment,
        interestPayment,
        balance: balance < 0 ? 0 : balance,
      });
    }
    setAmortization(schedule);
  };

  const resetForm = () => {
    setAmount(100000);
    setInterest(4.5);
    setTerms(5);
    setEmi(null);
    setAmortization([]);
    setCurrency('USD');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 900, mx: 'auto', my: 5 }}>
      <Typography variant="h5" align="center" gutterBottom
      sx={{ fontWeight: 'bold',mb:5 }}
      >
        Loan EMI Calculator
      </Typography>

      <Grid container spacing={2}>
        <Grid >
          <TextField
            fullWidth
            label="Loan Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth
            label="Interest Rate (%)"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            type="number"
          />
        </Grid>

        <Grid item >
          <TextField
            fullWidth
            label="Term (Years)"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            type="number"
          />
        </Grid>
      </Grid>

      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color="primary" onClick={calculateEMI}>
          Calculate
        </Button>
        <Button variant="outlined" sx={{color:'red',borderColor:'red'}} onClick={resetForm}>
          Reset
        </Button>
      </Box>

      {emi && (
        <>
          <Typography variant="h6" sx={{ mt: 4,'& strong': { color: '#00e676' }}}>
            Monthly EMI: <strong sx={{ colors: green }} >${emi}</strong>
          </Typography>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              label="Currency"
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="AUD">AUD</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 4 }}>
            <AmortizationTable schedule={amortization} currency={currency} />
          </Box>
        </>
      )}
    </Paper>
  );
}
