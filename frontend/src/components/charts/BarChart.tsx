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

const BarChart: React.FC<BarChartProps> = ({ data }) => { // Componente que representa los gráficos de barras
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current && data) { // Si hay datos y el elemento canvas está disponible, se crea el gráfico
      const context = chartRef.current.getContext('2d');

      if (context) { 
        const barChart = new Chart(context, {
          type: 'bar',
          data: {
            labels: data.map((team) => team.nombre_team), // Etiquetas para el eje X
            datasets: [
              {
                label: 'Tareas Finalizadas', 
                data: data.map((team) => team.tareas_finalizadas_team), // Datos para el eje Y
                backgroundColor: '#6c757d', // Cambia el color aquí
                borderWidth: 1, // Ancho del borde
              },
            ],
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Equipos', // Título del eje X
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Tareas Finalizadas', // Título del eje Y
                },
                beginAtZero: true,
              },
            },
          },
        });

        return () => {
          barChart.destroy(); // Se destruye el gráfico al desmontar el componente
        };
      }
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
