import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Enregistrer les composants Chart.js nécessaires
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DoughnutChart = ({ dataClient }) => {
  // Assurez-vous que dataClient est défini avant d'utiliser les données
  const data = {
    labels: dataClient.map((data) => data.label),
    datasets: [
      {
        label: "Count",
        data: dataClient.map((data) => data.value),
        backgroundColor: [
          "rgba(255, 152, 0, 0.8)",
          "rgba(76, 175, 80, 0.8)",
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 135, 0.8)",
          "rgba(156, 39, 176, 0.8)",
          "rgba(33, 150, 243, 0.8)",
          "rgba(255, 87, 34, 0.8)",
          "rgba(63, 81, 181, 0.8)",
          "rgba(255, 193, 7, 0.8)",
          "rgba(233, 30, 99, 0.8)",
        ],
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        borderRadius: 5, // Applique une bordure arrondie
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Doughnut Chart Example</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
