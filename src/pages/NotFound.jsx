import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '6rem', sm: '8rem' },
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: 'black',
          px: 4,
          borderRadius: 2,
        }}
      >
        404
      </Typography>

      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          transform: 'rotate(-8deg)',
          mb:'80px',
          px: 2,
          py: 1,
          backgroundColor: 'black',
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: '500',
        }}
      >
        Page not found...
      </Paper>

      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{
          mt: 5,
          px: 4,
          py: 1.5,
          backgroundColor: '#1A2238',
          '&:hover': {
            backgroundColor: '#11172b',
          },
        }}
      >
        Go Back
      </Button>
    </Box>
  );
}
