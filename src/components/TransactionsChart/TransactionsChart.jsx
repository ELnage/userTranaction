import React from 'react'
import { Line, Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function TransactionsChart({selectedCustomer ,chartType}) {
  const chartData = {
    labels: selectedCustomer?.map((customer) => customer.date),
    datasets: [
      {
        label: "Transaction Amount",
        data: selectedCustomer?.map((customer) => customer.amount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction Chart',
        font : {
          size: "18px"
        }
      },
    },
  };
  return <>
    <div className="row justify-content-center ">
      <div className="col-md-8">
        <div>
          <div className='  rounded-4 shadow bg-white p-4'>
        {chartType === "line" ? 
        <Line data={chartData} options={chartOptions}/> : <Bar data={chartData} options={chartOptions}/>}
        </div>
            </div>
      </div>
    </div>
    </>
}
