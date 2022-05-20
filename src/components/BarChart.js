import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function BarChart({data, options}) {

    const chartData = ({
        labels: data.map((data) => data.distance),
        datasets: [{
            label: "Population Density",
            data: data.map((data) => data.population),
            backgroundColor: "#feb331",
        }],
    })

    return (
        <div style={{ width: "1000px", padding: "50px", background: "", border: "solid 2px #feb331"}}>
            <Bar data={chartData} options={options}></Bar>
        </div>
    );
}

export default BarChart;