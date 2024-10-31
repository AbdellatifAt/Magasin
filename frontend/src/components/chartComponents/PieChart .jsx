import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the necessary components from Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ dataClient, title = "" }) => {
  // Ensure dataClient is defined and is an array
  if (!Array.isArray(dataClient) || dataClient.length === 0) {
    return <div>Aucune donnée disponible pour afficher le graphique.</div>;
  }

  const data = {
    labels: dataClient.map((data) => data.label),
    datasets: [
      {
        label: 'Count',
        data: dataClient.map((data) => data.value),
        backgroundColor: [
          "rgba(255, 152, 0, 0.8)", // orange
          "rgba(255, 0, 0, 0.8)", // red
          "rgba(76, 175, 80, 0.8)", // green
          "rgba(33, 150, 243, 0.8)",
          "rgba(63, 81, 181, 0.8)",
          "rgba(255, 87, 34, 0.8)",
          "rgba(156, 39, 176, 0.8)",
          "rgba(250, 192, 135, 0.8)",
          "rgba(43, 63, 229, 0.8)",
          "rgba(255, 193, 7, 0.8)",
          "rgba(233, 30, 99, 0.8)",
        ].slice(0, dataClient.length), // Adjust colors based on the number of data points
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,  // Enable the title
        text: title,    // Use the title prop passed to the component
        font: {
          size: 15,    // Font size of the title
        },
        padding: {
          top: 5,
          bottom: 5,
        },
        align: 'center'
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.chart._metasets[0].total; // Total of chart values
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
