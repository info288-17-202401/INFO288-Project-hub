import React, { useRef, useState, DragEvent } from 'react'
import Close from '../../assets/Close'

interface ToDoCardProps {
  id: number
  onDelete: (id: number) => void
}

const ToDoCard: React.FC<ToDoCardProps> = ({ id, onDelete }) => { // Componente que representa una tarea 
  const [isDragging, setIsDragging] = useState(false)
  const dragItem = useRef<HTMLDivElement>(null)
  const [checked, setChecked] = useState(false)

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    setIsDragging(true)
    event.dataTransfer?.setData('text/plain', 'DraggableItem')
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleCheckboxChange = () => {
    setChecked((prevChecked) => !prevChecked)
  }

  const handleDeleteTodo = () => {
    onDelete(id)
  }

  const handleClickToDo = () => {
    alert('To do item clicked!')
  }

  return (
    <div
      className={`container card m-2 ${isDragging ? 'dragging' : ''}`}
      draggable
      ref={dragItem}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <div className="row align-items-center">
        <div className="col-md-1 m-2 p-0">
          <input
            className="form-check-input p-0"
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="col-md d-flex align-items-center">
          <span
            className="text-center col-md"
            onClick={handleClickToDo}
            style={{
              textDecoration: checked ? 'line-through' : 'none',
            }}>
            To do name
          </span>
        </div>
        <div className="col-md-2 p-0">
          <button
            className="border-0 p-0 bg-transparent "
            onClick={handleDeleteTodo}>
            <Close size="36" color="" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToDoCard
