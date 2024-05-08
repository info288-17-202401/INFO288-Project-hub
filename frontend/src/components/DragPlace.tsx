import React, { DragEvent, useState } from 'react';

const DroppableArea: React.FC = () => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
    const data = event.dataTransfer?.getData('text/plain');
    if (data === 'DraggableItem') {
      // Realizar acciones necesarias al soltar el elemento
      console.log('Elemento soltado en el área.');
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        width: '300px',
        height: '300px',
        border: '2px dashed #000',
        backgroundColor: isOver ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
      }}
    >
      Droppable Area
    </div>
  );
};

export default DroppableArea;
