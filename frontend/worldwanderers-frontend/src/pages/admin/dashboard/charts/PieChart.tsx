import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import userService from '../../../../services/user-service';
import { UserEntity } from '../../../../types/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData] = await Promise.all([userService.getAllUsers()]);

        if (usersData) {
          setUsers(usersData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const countUsersPerCountry = (users: UserEntity[]) => {
    const usersPerCountry: { [key: string]: number } = {};

    users.forEach((user) => {
      const country = user.country;

      if (country) {
        if (usersPerCountry[country]) {
          usersPerCountry[country]++;
        } else {
          usersPerCountry[country] = 1;
        }
      }
    });

    return usersPerCountry;
  };


  const usersPerCountry = countUsersPerCountry(users);

  const labels = Object.keys(usersPerCountry);
  const data = Object.values(usersPerCountry);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '# of Users',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
