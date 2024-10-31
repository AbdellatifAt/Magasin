import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = ({ dataClient , title = "" }) => {
    if (!Array.isArray(dataClient) || dataClient.length === 0) {
        return <div>Aucune donnée disponible pour afficher le graphique.</div>;
    }

  const data = {
    labels: dataClient.map((data) => data.label),
    datasets: [
      {
        label: "Count",
        data: dataClient.map((data) => data.value),
        backgroundColor: [
          "rgba(76, 175, 80, 0.8)",
          
        ],
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart uses the full space
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true, // Enables the title
        text: title,
        font: {
          size: 15, // Font size of the title
        },
        padding: {
          top: 5,
          bottom: 10
        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-full w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
