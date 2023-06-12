import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart, ChartOptions } from 'chart.js';
import { UserEntity } from '../../../../types/api';
import userService from '../../../../services/user-service';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        suggestedMax: 10,
      },
    },
  };



const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const RegisteredUsersPerMonth = () => {
    const [users, setUsers] = useState<UserEntity[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [usersData] = await Promise.all([
              userService.getAllUsers(),
            ]);

            if (usersData) {
                setUsers(usersData);
            }
          } catch (error) {
            console.error(error);
          }
        };

        fetchData();
    }, []);

    const processUserData = (users: UserEntity[]) => {
        const monthCountMap: { [key: string]: number } = {};

        // Initialize monthCountMap with count 0 for each label
        labels.forEach((label) => {
          const monthIndex = labels.indexOf(label);
          const monthYearKey = monthIndex.toString();
          monthCountMap[monthYearKey] = 0;
        });

        // Iterate over users and count registrations per month
        users.forEach((user) => {
          if (user.createdAt) {
            const registrationDate = new Date(user.createdAt);
            const month = registrationDate.getMonth(); // Month index (0-11)
            const monthYearKey = month.toString();

            if (monthCountMap.hasOwnProperty(monthYearKey)) {
                monthCountMap[monthYearKey]++;
            }
          }
        });

        // Prepare data for chart
        const dataset1Data = labels.map((label) => monthCountMap[labels.indexOf(label).toString()]);

        return { dataset1Data };
      };



    const processedData = processUserData(users);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Registered Users',
          data: processedData.dataset1Data,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

  return <Bar options={options} data={data} />;

}

export default RegisteredUsersPerMonth;
