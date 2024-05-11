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

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const context = chartRef.current.getContext('2d');

      if (context) {
        const scatterChart = new Chart(context, {
          type: 'scatter',
          data: {
            datasets: [
              {
                label: 'Equipos',
                data: data.map((team) => ({
                  x: team.tamaño_team,
                  y: team.tareas_finalizadas_team,
                  radius: team.tareas_pendientes,
                  borderWidth: 1,
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
                  text: 'Tamaño del Equipo',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Tareas Finalizadas',
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
