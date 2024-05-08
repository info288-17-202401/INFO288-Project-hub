import React, { useRef, useState, DragEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DraggableItem: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const dragItem = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    event.dataTransfer?.setData('text/plain', 'DraggableItem');
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={dragItem}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`card bg-light m-2 ${isDragging ? 'dragging' : ''}`}
    >
      <div className="card-body">Arrástrame</div>
    </div>
  );
};

export default DraggableItem;
