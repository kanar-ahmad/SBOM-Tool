import { 
    Chart as ChartJS, 
    ArcElement, 
    BarElement,
    Filler,
    Tooltip, 
    Legend,
    Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from 'react'


ChartJS.register(
    ArcElement,
    BarElement,
    Filler,
    Title,
    Tooltip,
    Legend
);



const DoughnutChart = ({}) => {
    const data = {
        labels: ['N/A', 'low', 'medium', 'high', 'critical'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(170, 185, 200, 0.17)',
                    'rgba(255, 251, 74, 0.17)',
                    'rgba(255, 137, 44, 0.17)',
                    'rgba(255, 46, 120, 0.17)',
                    'rgba(255, 29, 45, 0.17)',
                ],
                borderColor: [
                    'rgba(170, 185, 200, 1)',
                    'rgba(255, 251, 74, 1)',
                    'rgba(255, 137, 44, 1)',
                    'rgba(255, 46, 120, 1)',
                    'rgba(255, 29, 45, 1)',
                ],
                hoverBackgroundColor: [
                    'rgba(170, 185, 200, 0.35)',
                    'rgba(255, 251, 74, 0.35)',
                    'rgba(255, 137, 44, 0.35)',
                    'rgba(255, 46, 120, 0.35)',
                    'rgba(255, 29, 45, 0.35)',
                ],
            },
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'left'
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: 10,
                titleMarginBottom: 10,
                caretSize: 0,
                cornerRadius: 15,
                multiKeyBackground: 'rgba(0,0,0,0)',
                displayColors: true,
                boxPadding: 10,
                borderColor: 'rgba(210, 230, 250, 0.2)',
                borderWidth: 1,
                usePointStyle: true
            }
        },
        // animations: {
        //     tension: {
        //         duration: 1000,
        //         easing: 'linear',
        //         from: 1,
        //         to: 0,
        //         loop: true
        //     }
        // },
        animation: {
            animateScale: false
        },
        // hoverBorderColor: [
        //     'rgba(170, 185, 200, 1)',
        //     'rgba(255, 251, 74, 1)',
        //     'rgba(255, 137, 44, 1)',
        //     'rgba(255, 46, 120, 1)',
        //     'rgba(255, 29, 45, 1)',
        // ],
        borderWidth: 1,
        hoverBorderWidth: 3,
        // borderJoinStyle: 'round',
        // borderAlign: 'inner',
        // borderRadius: 4,
        // hoverBorderRadius: 10,
        // hitRadius: 20,
        circumference: 360,
        // clip: false,
        offset: 0,
        // spacing: 9,
        hoverOffset: [10, 10, 10, 10, 10],
        // weight: [1, 4, 1, 1, 1],
        cutout: '65%',
        radius: '80%',
    }

    return <Doughnut data={data} options={options}/>
}



export { DoughnutChart }

