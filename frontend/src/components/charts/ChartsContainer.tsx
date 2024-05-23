import React from 'react'
import ScatterPlot from './ScatterPlot'
import testjson from './testjson.json'
import BarChart from './BarChart'

const ChartsContainer: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md p-2 m-2 align-content-center text-center rounded-2"
          style={{ backgroundColor: '#21252b' }}>
          <h3>Tamaño del Equipo v/s Tareas Finalizadas</h3>
          <ScatterPlot data={testjson} />
        </div>
        <div
          className="col-md p-2 m-2 align-content-center text-center rounded-2"
          style={{ backgroundColor: '#21252b' }}>
          <h3>Tareas Finalizadas por Equipo</h3>
          <BarChart data={testjson} />
        </div>
      </div>
    </div>
  )
}

export default ChartsContainer
