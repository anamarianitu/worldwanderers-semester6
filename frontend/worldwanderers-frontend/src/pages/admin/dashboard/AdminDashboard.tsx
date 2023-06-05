import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart } from 'chart.js';
import { Container, Grid } from '@mui/material';
import PieChart from './charts/PieChart';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const getRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 1000));
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: getRandomData(),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: getRandomData(),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const AdminDashboard = () => {

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>This is the page for administrators.</p>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <div style={{ margin: '16px', height: '800px' }}>
            <h2>Total Users Registered per Month</h2>
            <Bar options={options} data={data} />
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ margin: '16px', height: '600px' }}>
            <h2>Total Users per Country</h2>
            <PieChart></PieChart>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
