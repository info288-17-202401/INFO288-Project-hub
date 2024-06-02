import React, { DragEvent, useState } from 'react'
import Add from '../../assets/Add'
import ToDoCard from './ToDoCard'

interface Todo {
  id: number
  completed: boolean
}

const ToDo: React.FC = () => { // Componente para la lista de tareas (To-Do)
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('Agrega tareas!')
  const [isEditing, setIsEditing] = useState(false)
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsOver(true)
  }

  const handleDragLeave = () => { // Maneja el evento de arrastrar y soltar
    setIsOver(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => { // Maneja el evento de soltar
    event.preventDefault()
    setIsOver(false)
    const data = event.dataTransfer?.getData('text/plain')
    if (data === 'DraggableItem') {
      // Realizar acciones necesarias al soltar el elemento
      console.log('Elemento soltado en el área.')
    }
  }
  const handleAddTodo = () => { // Agrega una nueva tarea a la lista
    const newTodoItem: Todo = {
      id: Date.now(),
      completed: false,
    }

    setTodos([...todos, newTodoItem])
  }

  const handleDeleteTodo = (id: number) => { // Elimina una tarea de la lista
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const handleTextClick = () => { // Maneja el evento de hacer clic en el texto
    setIsEditing(true)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Actualiza el estado del texto
    setText(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { // Maneja el evento de presionar una tecla
    if (event.key === 'Enter') {
      setIsEditing(false)
    }
  }

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className='border'
        style={{
          height: '40vh',
          border: '2px #000',
          borderRadius: '7px',
          backgroundColor: isOver ? 'rgba(0, 0, 0, 0.1)' : '#ffffff',
          overflowY: 'auto',
          overflowX: 'hidden',
          color: isOver ? '#ffffff' : '#000000',
        }}>
        <div className="row justify-content-center text-center ">
          <div className="col-md m-2 p-2">
            <div onClick={handleTextClick} className="mb-2 p-2 ">
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={text}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              ) : (
                <div>{text}</div>
              )}
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }} className="p-0">
              {todos.map((todo) => (
                <li className="container " key={todo.id}>
                  <ToDoCard id={todo.id} onDelete={handleDeleteTodo} />
                </li>
              ))}
            </ul>
            <button className="btn p-2 m-2 " onClick={handleAddTodo}>
              <Add size="36" color={isOver ? '#ffffff' : '#323232'} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToDo
