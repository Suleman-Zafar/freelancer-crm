// components/IncomeChart.jsx
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const IncomeChart = ({ income }) => {
  const sorted = [...income].sort((a, b) => new Date(a.date) - new Date(b.date));

  const data = {
    labels: sorted.map((item) => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: "Income ($)",
        data: sorted.map((item) => item.amount),
        backgroundColor: "#4ade80", // Tailwind green-400
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (val) => `$${val}`,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default IncomeChart;
