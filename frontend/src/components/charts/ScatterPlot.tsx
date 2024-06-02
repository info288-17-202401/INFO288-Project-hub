import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface Team {
  nombre_team: string;
  tamaño_team: number;
  tareas_finalizadas_team: number;
  tareas_pendientes: number;
  tareas_activas_team: number;
}

interface ScatterPlotProps {
  data: Team[];
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => { // Componente que representa el gráfico de dispersión
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current && data) { // Si hay datos y el elemento canvas está disponible, se crea el gráfico
      const context = chartRef.current.getContext('2d');

      if (context) {
        const scatterChart = new Chart(context, {
          type: 'scatter',
          data: {
            datasets: [
              {
                label: 'Equipos',
                data: data.map((team) => ({
                  x: team.tamaño_team, // Tamaño del equipo
                  y: team.tareas_finalizadas_team, // Tareas finalizadas
                  radius: team.tareas_pendientes, // Tareas pendientes
                  borderWidth: 1, // Ancho del borde
                  borderColor: '#6c757d', // Cambia el color aquí
                })),
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                title: {
                  display: true,
                  text: 'Tamaño del Equipo', // Título del eje X
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Tareas Finalizadas', // Título del eje Y
                },
              },
            },
          },
        });

        return () => {
          scatterChart.destroy();
        };
      }
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ScatterPlot;
