import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface Team {
  nombre_team: string;
  tamaño_team: number;
  tareas_finalizadas_team: number;
  tareas_pendientes: number;
  tareas_activas_team: number;
}

interface BarChartProps {
  data: Team[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const context = chartRef.current.getContext('2d');

      if (context) {
        const barChart = new Chart(context, {
          type: 'bar',
          data: {
            labels: data.map((team) => team.nombre_team),
            datasets: [
              {
                label: 'Tareas Finalizadas',
                data: data.map((team) => team.tareas_finalizadas_team),
                backgroundColor: '#6c757d', // Cambia el color aquí
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Equipos',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Tareas Finalizadas',
                },
                beginAtZero: true,
              },
            },
          },
        });

        return () => {
          barChart.destroy();
        };
      }
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
