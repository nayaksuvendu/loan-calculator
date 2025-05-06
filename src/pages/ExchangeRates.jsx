import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { useExchangeRate } from '../hooks/useExchangeRate';
import Header from '../components/Header';

const ExchangeRates = () => {
  const { rates, loading, error } = useExchangeRate('USD');
  const rateEntries = Object.entries(rates);

  return (
    <Header>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Live Exchange Rates
        </Typography>

        {loading && (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={24} />
            <Typography variant="body1">Fetching data...</Typography>
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead sx={{ }}>
                <TableRow >
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}><strong>Currency</strong></TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}><strong>Rate</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rateEntries.map(([currency, rate]) => (
                  <TableRow key={currency} hover>
                    <TableCell>{currency}</TableCell>
                    <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold', color:'green' }}>{rate.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Header>
  );
};

export default ExchangeRates;
