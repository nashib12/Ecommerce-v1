// import React from "react";
// import {
//   Chart as ChartJs,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJs.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// function RevenueSection() {
//   const monthlyData = [
//     { month: "January", totalEarnings: 1200, totalOrders: 45, totalRefunds: 5 },
//     {
//       month: "February",
//       totalEarnings: 1500,
//       totalOrders: 50,
//       totalRefunds: 3,
//     },
//     { month: "March", totalEarnings: 1800, totalOrders: 60, totalRefunds: 6 },
//     { month: "April", totalEarnings: 2000, totalOrders: 70, totalRefunds: 4 },
//     { month: "May", totalEarnings: 1700, totalOrders: 65, totalRefunds: 7 },
//     { month: "June", totalEarnings: 2200, totalOrders: 80, totalRefunds: 5 },
//     { month: "July", totalEarnings: 2500, totalOrders: 90, totalRefunds: 6 },
//     { month: "August", totalEarnings: 2400, totalOrders: 85, totalRefunds: 4 },
//     {
//       month: "September",
//       totalEarnings: 2100,
//       totalOrders: 75,
//       totalRefunds: 5,
//     },
//     { month: "October", totalEarnings: 2300, totalOrders: 82, totalRefunds: 3 },
//     {
//       month: "November",
//       totalEarnings: 2600,
//       totalOrders: 95,
//       totalRefunds: 6,
//     },
//     {
//       month: "December",
//       totalEarnings: 3000,
//       totalOrders: 110,
//       totalRefunds: 8,
//     },
//   ];

//   const labels = monthlyData.map(item => item.month);
//   const totalEarnings = monthlyData.map(item => item.totalEarnings);
//   const totalOrders = monthlyData.map(item => item.totalOrders);
//   const totalRefunds = monthlyData.map(item => item.totalRefunds);
//   const dataSet = { labels, datasets: [
//     { label: "Total Earning", data: totalEarnings, backgroundColor: "rgba(125, 125, 125, 0.5)"},
//     { label: "Total Orders", data: totalOrders, backgroundColor: "rgba(75, 75, 75, 0.5)"},
//     { label: "Total Refunds", data: totalRefunds, backgroundColor: "rgba(225, 225, 225, 0.5)"}
//   ]} ;

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     indexAxis: "y",
//     plugins: {
//         legend: {
//             position: "bottom",
//         }, 
//         tooltip: {
//             callbacks: {
//                 label: function (context) {
//                     return `${context.dataset.label} : ${context.raw}`;
//                 }
//             }
//         }
//     }
//   }
//   return (
//     <section
//       id="revenue-section"
//       className="max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12"
//     >
//         <Bar data={dataSet} options={options} />
//     </section>
//   );
// }

// export default RevenueSection;

import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function RevenueSection() {
  const monthlyData = [
    { month: "Jan", totalEarnings: 1200, totalOrders: 45, totalRefunds: 5 },
    { month: "Feb", totalEarnings: 1500, totalOrders: 50, totalRefunds: 3 },
    { month: "Mar", totalEarnings: 1800, totalOrders: 60, totalRefunds: 6 },
    { month: "Apr", totalEarnings: 2000, totalOrders: 70, totalRefunds: 4 },
    { month: "May", totalEarnings: 1700, totalOrders: 65, totalRefunds: 7 },
    { month: "Jun", totalEarnings: 2200, totalOrders: 80, totalRefunds: 5 },
    { month: "Jul", totalEarnings: 2500, totalOrders: 90, totalRefunds: 6 },
    { month: "Aug", totalEarnings: 2400, totalOrders: 85, totalRefunds: 4 },
    { month: "Sep", totalEarnings: 2100, totalOrders: 75, totalRefunds: 5 },
    { month: "Oct", totalEarnings: 2300, totalOrders: 82, totalRefunds: 3 },
    { month: "Nov", totalEarnings: 2600, totalOrders: 95, totalRefunds: 6 },
    { month: "Dec", totalEarnings: 3000, totalOrders: 110, totalRefunds: 8 },
  ];

  const monthlyLabel = monthlyData.map(item => item.month);

  const data = {
    labels: monthlyLabel,
    datasets: [
      {
        type: "bar",
        label: "Earnings",
        data: monthlyData.map(i => i.totalEarnings),
        backgroundColor: "rgba(79, 70, 229, 0.6)",
        borderRadius: 8,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Orders",
        data: monthlyData.map(i => i.totalOrders),
        borderColor: "#10B981",
        backgroundColor: "#10B981",
        tension: 0.4,
        pointRadius: 4,
        yAxisID: "y1",
      },
      {
        type: "line",
        label: "Refunds",
        data: monthlyData.map(i => i.totalRefunds),
        borderColor: "#EF4444",
        backgroundColor: "#EF4444",
        tension: 0.4,
        pointRadius: 4,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`,
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Earnings",
        },
        grid: {
          color: "rgba(200,200,200,0.2)",
        },
      },
      y1: {
        type: "linear",
        position: "right",
        title: {
          display: false,
          text: "Orders / Refunds",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12">
      <div className="bg-white rounded-2xl shadow-sm p-6 h-[500px]">
        <h2 className="text-lg font-semibold mb-4">
          Revenue Overview
        </h2>
        <Chart type="bar" data={data} options={options} />
      </div>
    </section>
  );
}

export default RevenueSection;