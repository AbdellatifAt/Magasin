import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

const MixedChart = ({ dataClient, title = "" }) => {

  // Check if dataClient is defined and is an object with the expected properties
  if (!dataClient || typeof dataClient !== 'object') {
    return <div>Aucune donnée disponible pour afficher le graphique.</div>;
  }

  // Destructure dataClient with a proper initialization for data3
  const { labels = [], data1 = [], data2 = [], data3 = [] } = dataClient;

  // Check if all necessary properties contain data
  if (!Array.isArray(labels) || !Array.isArray(data1) || !Array.isArray(data2) || !Array.isArray(data3) ||
      labels.length === 0 || data1.length === 0 || data2.length === 0 || data3.length === 0 ||
      labels.length !== data1.length || labels.length !== data2.length || labels.length !== data3.length) {
    return <div>Aucune donnée disponible pour afficher le graphique.</div>;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        type: 'bar',
        label: 'Cellule plein',
        data: data3,
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        borderColor: "rgba(255, 0, 0, 0.8)",
        borderWidth: 1,
      },
      {
        type: 'bar',
        label: 'Cellule partiellement plein',
        data: data2,
        backgroundColor:    "rgba(255, 152, 0, 0.8)",// Different color for clarity
        borderColor:    "rgba(255, 152, 0, 0.8)",
        borderWidth: 1,
      },
      {
        type: 'bar',
        label: 'Cellule vide',
        data: data1,
        fill: false,
        backgroundColor: "rgba(76, 175, 80, 0.8)", // Green color
        borderColor: "rgba(76, 175, 80, 0.8)", // Green color
        tension: 0.1,
      },
      
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 15,
        },
        padding: {
          top: 5,
          bottom: 5,
        },
        align: 'center',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MixedChart;
