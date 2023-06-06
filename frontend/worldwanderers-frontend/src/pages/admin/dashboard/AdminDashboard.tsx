import React from 'react';
import { Container, Grid } from '@mui/material';
import PieChart from './charts/PieChart';
import RegisteredUsersPerMonth from './charts/RegisteredUsersPerMonth';

const AdminDashboard = () => {

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>This is the page for administrators.</p>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <div style={{ margin: '16px', height: '800px' }}>
            <h2>Total Users Registered per Month</h2>
            <RegisteredUsersPerMonth />
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ margin: '16px', height: '600px' }}>
            <h2>Total Users per Country</h2>
            <PieChart />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
