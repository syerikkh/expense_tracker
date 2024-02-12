import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, DoughnutController, ArcElement, Title, Tooltip, Legend } from 'chart.js'

Chart.register(DoughnutController, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

export const MyChart = ({ categories }) => {
    const data = {
        labels: categories,
        datasets: [{
            label: categories,
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
    };

    return <Doughnut {...config} />;
};