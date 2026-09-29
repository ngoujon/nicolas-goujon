import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const Maintenance = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <ConstructionIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Site en maintenance
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Notre site est actuellement en maintenance. Merci de votre patience.
            Nous serons de retour très bientôt !
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Maintenance; 