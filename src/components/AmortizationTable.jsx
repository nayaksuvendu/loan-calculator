import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import React from 'react'

export default function AmortizationTable({ schedule, currency }) {
    console.log(schedule);
  return (
    <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Month</TableCell>
          <TableCell>Principal</TableCell>
          <TableCell>Interest</TableCell>
          <TableCell>Remaining Balance</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {schedule?.map((item, idx) => (            
          <TableRow key={idx}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.principalPayment.toFixed(2)} {currency}</TableCell>
            <TableCell>{item.interestPayment.toFixed(2)} {currency}</TableCell>
            <TableCell>{item.balance.toFixed(2)} {currency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
  )
}

