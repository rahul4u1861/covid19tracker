import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';

export const Charts = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
        ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(209, 28, 37, 0.5)',
                    fill: true
                }]
            }}
        />): null
    );

    const barChart = (
        confirmed
        ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(14, 164, 223, 0.5)',
                        'rgba(11, 190, 50, 0.5)',
                        'rgba(209, 28, 37, 0.5)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }} 
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current state in ${country}`}
                }}
            />
        ) : null
    )

    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}