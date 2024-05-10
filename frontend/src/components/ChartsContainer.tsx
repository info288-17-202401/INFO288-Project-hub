import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto'; // Importa la versión de módulo de Chart.js

interface ChartProps {
  data: Chart.ChartData;
  options: Chart.ChartOptions;
}

const ChartsContainer: React.FC<ChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  let chartInstance: Chart | null = null;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data,
        options,
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default ChartsContainer;
