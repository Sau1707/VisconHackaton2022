import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const labels = ["1", "2", "3", "4", "5", "6"];
  
  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
          ticks: {
              color: 'white'
          }
      },
      y: {
        ticks: {
          color: 'white'
        }
      }
  }
  };
  
  export const data = {
    labels,
    datasets: [
      {
        label: "My wins",
        data: [0, 1, 2, 2, 2, 3],
        backgroundColor: "#00FF00",
        borderColor: "#00FF00",
      },
    ],
  };
  
  const ChartJsExample = () => {
    return (
      <div style={{ width: 700, height: 350 }}>
        <Line options={options} data={data} />
      </div>
    );
  };
  
  export default ChartJsExample;