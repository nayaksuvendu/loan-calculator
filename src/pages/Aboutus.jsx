import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Header from '../components/Header';

const AboutUs = () => {
  return (
    <Header>
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        About Us
      </Typography>

      {/* Mission Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1">
          Our mission is to empower users to make informed financial decisions by providing a user-friendly loan calculator.
          We strive to simplify the loan estimation process and help individuals better manage their finances.
        </Typography>
      </Paper>

      {/* Features Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Features
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="Instant loan EMI calculations" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Amortization schedule for better understanding of payments" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Multi-currency support" />
          </ListItem>
          <ListItem>
            <ListItemText primary="User-friendly interface" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Educational resources to enhance financial literacy" />
          </ListItem>
        </List>
      </Paper>

      {/* Contact Section */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Get In Touch
        </Typography>
        <Typography variant="body1">
          For any inquiries or feedback, please contact us at{' '}
          <Link href="mailto:support@loancalculator.com">
            support@loancalculator.com
          </Link>
          . We are here to help you on your financial journey!
        </Typography>
      </Paper>
    </Container>
    </Header>
  );
};

export default AboutUs;
