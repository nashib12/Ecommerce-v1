import React from 'react'
import { Chart as ChartJs, Legend, Tooltip, ArcElement} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJs.register(Legend, Tooltip, ArcElement, ChartDataLabels);

function PieChart() {
    const data ={ 
        labels: ["Direct", "Social", "Email", "Other", "Referrals"],
        datasets: [
            {
                label: "Store Visit",
                data: ["55", "65", "32", "18", "24"],
                backgroundColor: ["#0AB39C", "#F7B84B", "#405189", "#F06548", "#299CDB"],
                birderWidth: 3
            }
        ]
    };

    const options= {
        responsive: true,
        cutout: 60,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true
                }
            }
        },
        datalabels : {
            color: "#fff",
            font: {
                weight: "bold",
                size: 14,
            }, formatter: (value, context) => {
                const total = context.dataset.data.reduce((a,b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return percentage + "%";
            }
        }
    }
  return (
    <Doughnut data={data} options={options} />
  )
}

export default PieChart